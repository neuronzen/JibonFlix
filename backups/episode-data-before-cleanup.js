const episodes = {
    1: {
        title: "Jibon Adventure — Episode 01",
        number: "01",
        quality: "1080p",
        size: "101 MB",
        video: "assets/test.mkv"
    },
    2: {
        title: "Jibon Adventure — Episode 02",
        number: "02",
        quality: "1080p",
        size: "—",
        video: ""
    },
    3: {
        title: "Jibon Adventure — Episode 03",
        number: "03",
        quality: "1080p",
        size: "—",
        video: ""
    },
    4: {
        title: "Jibon Adventure — Episode 04",
        number: "04",
        quality: "1080p",
        size: "—",
        video: ""
    }
};

const animeEpisodes = {
    "jibon-adventure": episodes,

    "dream-world": {
        1: {
            title: "Dream World — Episode 01",
            number: "01",
            quality: "1080p",
            size: "—",
            video: ""
        },
        2: {
            title: "Dream World — Episode 02",
            number: "02",
            quality: "1080p",
            size: "—",
            video: ""
        },
        3: {
            title: "Dream World — Episode 03",
            number: "03",
            quality: "1080p",
            size: "—",
            video: ""
        },
        4: {
            title: "Dream World — Episode 04",
            number: "04",
            quality: "1080p",
            size: "—",
            video: ""
        }
    },

    "last-horizon": {
        1: {
            title: "Last Horizon — Episode 01",
            number: "01",
            quality: "720p",
            size: "—",
            video: ""
        },
        2: {
            title: "Last Horizon — Episode 02",
            number: "02",
            quality: "720p",
            size: "—",
            video: ""
        },
        3: {
            title: "Last Horizon — Episode 03",
            number: "03",
            quality: "720p",
            size: "—",
            video: ""
        },
        4: {
            title: "Last Horizon — Episode 04",
            number: "04",
            quality: "720p",
            size: "—",
            video: ""
        }
    },

    "night-fall": {
        1: {
            title: "Night Fall — Episode 01",
            number: "01",
            quality: "1080p",
            size: "—",
            video: ""
        },
        2: {
            title: "Night Fall — Episode 02",
            number: "02",
            quality: "1080p",
            size: "—",
            video: ""
        },
        3: {
            title: "Night Fall — Episode 03",
            number: "03",
            quality: "1080p",
            size: "—",
            video: ""
        },
        4: {
            title: "Night Fall — Episode 04",
            number: "04",
            quality: "1080p",
            size: "—",
            video: ""
        }
    }
};

const animeTitles = {
    "jibon-adventure": "Jibon Adventure",
    "dream-world": "Dream World",
    "last-horizon": "Last Horizon",
    "night-fall": "Night Fall"
};

const params = new URLSearchParams(window.location.search);

const animeKey =
    params.get("anime") || "jibon-adventure";

const episodeNumber =
    Number(params.get("ep")) || 1;

const currentAnimeTitle =
    animeTitles[animeKey] || "Jibon Adventure";

/* ANIME NAME ON EPISODE PAGE */

const breadcrumbAnime =
    document.getElementById("breadcrumbAnime");

if (breadcrumbAnime) {
    breadcrumbAnime.textContent = currentAnimeTitle;
    breadcrumbAnime.href =
        `anime.html?anime=${encodeURIComponent(animeKey)}`;
}

const episodeAnimeTitle =
    document.getElementById("episodeAnimeTitle");

if (episodeAnimeTitle) {
    episodeAnimeTitle.textContent =
        currentAnimeTitle.toUpperCase();
}


const selectedEpisodes =
    animeEpisodes[animeKey] || animeEpisodes["jibon-adventure"];

const episode =
    selectedEpisodes[episodeNumber] || selectedEpisodes[1];

const episodeNumbers =
    Object.keys(selectedEpisodes).map(Number);

/* VIDEO */

const videoSource =
    document.querySelector(".real-player source");

const video =
    document.querySelector(".real-player");

const playerBox =
    document.querySelector(".video-player-box");

if (videoSource && video) {

    if (episode.video) {

        videoSource.src = episode.video;

        video.style.display = "";

        video.setAttribute("controls", "");

        video.load();

    } else {

        videoSource.removeAttribute("src");

        video.removeAttribute("controls");

        video.style.display = "none";

        if (playerBox) {

            const oldMessage =
                playerBox.querySelector(".video-unavailable");

            if (oldMessage) {
                oldMessage.remove();
            }

            const message =
                document.createElement("div");

            message.className =
                "video-unavailable";

            message.style.cssText = `
                position:absolute;
                inset:0;
                display:flex;
                align-items:center;
                justify-content:center;
                color:#aaa;
                font-size:14px;
                text-align:center;
                padding:20px;
                background:#000;
            `;

            message.textContent =
                `${currentAnimeTitle} — Episode ${episode.number} video is not available yet.`;

            playerBox.appendChild(message);
        }
    }
}

/* TITLE */

const title =
    document.querySelector(".watch-info h1");

if (title) {
    title.textContent = episode.title;
}

/* META */

const episodeMeta =
    document.querySelector(".watch-info p");

if (episodeMeta) {
    episodeMeta.textContent =
        `${episode.quality} • ${episode.size}`;
}

/* BREADCRUMB */

document.querySelectorAll("*").forEach(element => {

    if (element.children.length === 0) {

        const text =
            element.textContent.trim();

        if (
            text === "Episode 01" ||
            text === "Episode 1"
        ) {
            element.textContent =
                `Episode ${episode.number}`;
        }
    }
});

/* PREVIOUS */

const previousButton =
    document.querySelector(".previous-episode");

if (previousButton) {

    const previousEpisode =
        episodeNumber - 1;

    if (!selectedEpisodes[previousEpisode]) {

        previousButton.classList.add("disabled");
        previousButton.href = "#";

    } else {

        previousButton.classList.remove("disabled");

        previousButton.href =
            `episode.html?anime=${encodeURIComponent(animeKey)}&ep=${previousEpisode}`;
    }
}

/* NEXT */

const nextButton =
    document.querySelector(".next-episode");

if (nextButton) {

    const nextEpisode =
        episodeNumber + 1;

    if (!selectedEpisodes[nextEpisode]) {

        nextButton.classList.add("disabled");
        nextButton.href = "#";

    } else {

        nextButton.classList.remove("disabled");

        nextButton.href =
            `episode.html?anime=${encodeURIComponent(animeKey)}&ep=${nextEpisode}`;
    }
}

/* MORE EPISODES */

const moreEpisodesGrid =
    document.querySelector(
        ".watch-episodes .episode-grid"
    );

if (moreEpisodesGrid) {

    moreEpisodesGrid.innerHTML =
        episodeNumbers.map(number => {

            const ep =
                selectedEpisodes[number];

            return `
                <a
                    class="episode-card ${number === episodeNumber ? "active" : ""}"
                    href="episode.html?anime=${encodeURIComponent(animeKey)}&ep=${number}"
                >
                    <span>${ep.number}</span>

                    <div>
                        <strong>${ep.title}</strong>
                        <small>${ep.quality} • ${ep.size}</small>
                    </div>

                    <b>▶</b>
                </a>
            `;

        }).join("");
}

/* PAGE TITLE */

document.title =
    `${episode.title} | JibonFlix`;

console.log(
    "JIBONFLIX:",
    animeKey,
    "Episode:",
    episodeNumber
);

/* DOWNLOAD */

const downloadButton =
    document.getElementById("downloadButton");

if (downloadButton) {

    if (episode.video) {

        downloadButton.href = episode.video;

        downloadButton.download =
            `JibonFlix-${currentAnimeTitle.replace(/\\s+/g, "-")}-Episode-${episode.number}.mkv`;

        downloadButton.classList.remove("disabled");

        downloadButton.style.pointerEvents = "";
        downloadButton.style.opacity = "";

    } else {

        downloadButton.href = "#";

        downloadButton.removeAttribute("download");

        downloadButton.classList.add("disabled");

        downloadButton.style.pointerEvents = "none";
        downloadButton.style.opacity = "0.45";
    }
}

/* SHARE */

function shareEpisode() {

    const shareUrl =
        window.location.href;

    const shareTitle =
        episode.title;

    if (navigator.share) {

        navigator.share({
            title: shareTitle,
            text: `Watch ${shareTitle} on JibonFlix`,
            url: shareUrl
        }).catch(() => {});

    } else if (navigator.clipboard) {

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                showToast("Link copied");
            });

    } else {

        showToast(
            "Copy the link from the address bar"
        );
    }
}
