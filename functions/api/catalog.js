const R2_PUBLIC_URL =
    "https://pub-8bf3e386e2b047c9906af484d69173d6.r2.dev";

function makeTitle(folder) {
    return folder
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
}

export async function onRequestGet(context) {
    const { env } = context;

    const listed = await env.JIBONFLIX_BUCKET.list();

    const animeMap = {};

    for (const object of listed.objects) {
        const parts = object.key.split("/");

        // Root-level files যেমন test.mkv বাদ
        if (parts.length < 2 || !parts[0] || !parts[1]) {
            continue;
        }

        const folder = parts[0];
        const filename = parts[parts.length - 1];

        // Folder placeholder বাদ
        if (!filename.includes(".")) {
            continue;
        }

        // Video ছাড়া অন্য file বাদ
        if (!/\.(mkv|mp4|webm|mov|m4v)$/i.test(filename)) {
            continue;
        }

        const episodeMatch = filename.match(/episode[-_ ]?(\d+)/i);

        if (!episodeMatch) {
            continue;
        }

        const episodeNumber = Number(episodeMatch[1]);

        if (!animeMap[folder]) {
            animeMap[folder] = {
                id: folder,
                title: makeTitle(folder),
                year: null,
                genre: [],
                description: "",
                status: "NEW",
                poster: null,
                episodes: []
            };
        }

        animeMap[folder].episodes.push({
            number: episodeNumber,
            filename,
            size: object.size,
            uploaded: object.uploaded,
            video: `${R2_PUBLIC_URL}/${object.key
                .split("/")
                .map(encodeURIComponent)
                .join("/")}`
        });
    }

    // Load optional info.json metadata from each anime folder
    for (const folder of Object.keys(animeMap)) {
        try {
            const infoObject = await env.JIBONFLIX_BUCKET.get(`${folder}/info.json`);

            if (infoObject) {
                const text = await infoObject.text();
                const info = JSON.parse(text);

                if (info.title) animeMap[folder].title = info.title;
                if (info.year !== undefined) animeMap[folder].year = info.year;
                if (Array.isArray(info.genre)) animeMap[folder].genre = info.genre;
                if (info.description) animeMap[folder].description = info.description;
                if (info.status) animeMap[folder].status = info.status;

                if (info.poster) {
                    animeMap[folder].poster =
                        `${R2_PUBLIC_URL}/${folder}/${encodeURIComponent(info.poster)}`;
                }
            }
        } catch (error) {
            // Keep default metadata if info.json is missing or invalid.
        }
    }

    const anime = Object.values(animeMap)
        .map(item => {
            item.episodes.sort((a, b) => a.number - b.number);

            return {
                ...item,
                episodeCount: item.episodes.length
            };
        })
        .sort((a, b) => a.title.localeCompare(b.title));

    return new Response(
        JSON.stringify({
            success: true,
            anime
        }),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store"
            }
        }
    );
}
