const R2_PUBLIC_URL =
    "https://pub-8bf3e386e2b047c9906af484d69173d6.r2.dev";

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
                title: folder
                    .replace(/[-_]+/g, " ")
                    .replace(/\b\w/g, char => char.toUpperCase()),
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
