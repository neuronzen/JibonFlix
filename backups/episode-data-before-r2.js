/* =========================================
   JIBONFLIX — EPISODE DATA
========================================= */

const animeData = {
    "jibon-adventure": {
        title: "Jibon Adventure",
        quality: "1080p",

        episodes: {
            1: {
                quality: "1080p",
                size: "101 MB",
                video: "assets/test.mkv"
            },
            2: {
                quality: "1080p",
                size: "—",
                video: ""
            },
            3: {
                quality: "1080p",
                size: "—",
                video: ""
            },
            4: {
                quality: "1080p",
                size: "—",
                video: ""
            }
        }
    },

    "dream-world": {
        title: "Dream World",
        quality: "1080p",

        episodes: {
            1: { quality: "1080p", size: "—", video: "" },
            2: { quality: "1080p", size: "—", video: "" },
            3: { quality: "1080p", size: "—", video: "" },
            4: { quality: "1080p", size: "—", video: "" }
        }
    },

    "last-horizon": {
        title: "Last Horizon",
        quality: "720p",

        episodes: {
            1: { quality: "720p", size: "—", video: "" },
            2: { quality: "720p", size: "—", video: "" },
            3: { quality: "720p", size: "—", video: "" },
            4: { quality: "720p", size: "—", video: "" }
        }
    },

    "night-fall": {
        title: "Night Fall",
        quality: "1080p",

        episodes: {
            1: { quality: "1080p", size: "—", video: "" },
            2: { quality: "1080p", size: "—", video: "" },
            3: { quality: "1080p", size: "—", video: "" },
            4: { quality: "1080p", size: "—", video: "" }
        }
    }
};


/* =========================================
   URL / CURRENT ANIME
========================================= */

const params = new URLSearchParams(window.location.search);

const animeKey =
    params.get("anime") || "jibon-adventure";

const episodeNumber =
    Number(params.get("ep")) || 1;

const anime =
    animeData[animeKey] || animeData["jibon-adventure"];

const currentAnimeTitle =
    anime.title;

const selectedEpisodes =
    anime.episodes;

const episode =
    selectedEpisodes[episodeNumber] ||
    selectedEpisodes[1];

const episodeNumbers =
    Object.keys(selectedEpisodes).map(Number);


/* =========================================
   EPISODE TITLE
========================================= */

episode.title =
    `${currentAnimeTitle} — Episode ${String(
        episodeNumber
    ).padStart(2, "0")}`;

episode.number =
    String(episodeNumber).padStart(2, "0");


/* =========================================
   ANIME NAME
========================================= */

const breadcrumbAnime =
    document.getElementById("breadcrumbAnime");

if (breadcrumbAnime) {
    breadcrumbAnime.textContent =
        currentAnimeTitle;

    breadcrumbAnime.href =
        `anime.html?anime=${encodeURIComponent(animeKey)}`;
}

const episodeAnimeTitle =
    document.getElementById("episodeAnimeTitle");

if (episodeAnimeTitle) {
    episodeAnimeTitle.textContent =
        currentAnimeTitle.toUpperCase();
}


/* =========================================
   VIDEO PLAYER
========================================= */

const videoSource =
    document.querySelector(".real-player source");

const video =
    document.querySelector(".real-player");

const playerBox =
    document.querySelector(".video-player-box");

if (videoSource && video) {

    if (episode.video) {

        videoSource.src =
            episode.video;

        video.style.display =
            "";

        video.setAttribute(
            "controls",
            ""
        );

        video.load();

    } else {

        videoSource.removeAttribute(
            "src"
        );

        video.removeAttribute(
            "controls"
        );

        video.style.display =
            "none";

        if (playerBox) {

            const oldMessage =
                playerBox.querySelector(
                    ".video-unavailable"
                );

            if (oldMessage) {
                oldMessage.remove();
            }

            const message =
                document.createElement(
                    "div"
                );

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

            playerBox.appendChild(
                message
            );
        }
    }
}


/* =========================================
   EPISODE INFO
========================================= */

const title =
    document.querySelector(
        ".watch-info h1"
    );

if (title) {
    title.textContent =
        episode.title;
}

const episodeMeta =
    document.querySelector(
        ".watch-info p"
    );

if (episodeMeta) {
    episodeMeta.textContent =
        `${episode.quality} • ${episode.size}`;
}


/* =========================================
   BREADCRUMB EPISODE
========================================= */

document.querySelectorAll("*").forEach(
    element => {

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
    }
);


/* =========================================
   PREVIOUS EPISODE
========================================= */

const previousButton =
    document.querySelector(
        ".previous-episode"
    );

if (previousButton) {

    const previousEpisode =
        episodeNumber - 1;

    if (!selectedEpisodes[previousEpisode]) {

        previousButton.classList.add(
            "disabled"
        );

        previousButton.href =
            "#";

    } else {

        previousButton.classList.remove(
            "disabled"
        );

        previousButton.href =
            `episode.html?anime=${encodeURIComponent(animeKey)}&ep=${previousEpisode}`;
    }
}


/* =========================================
   NEXT EPISODE
========================================= */

const nextButton =
    document.querySelector(
        ".next-episode"
    );

if (nextButton) {

    const nextEpisode =
        episodeNumber + 1;

    if (!selectedEpisodes[nextEpisode]) {

        nextButton.classList.add(
            "disabled"
        );

        nextButton.href =
            "#";

    } else {

        nextButton.classList.remove(
            "disabled"
        );

        nextButton.href =
            `episode.html?anime=${encodeURIComponent(animeKey)}&ep=${nextEpisode}`;
    }
}


/* =========================================
   MORE EPISODES
========================================= */

const moreEpisodesGrid =
    document.querySelector(
        ".watch-episodes .episode-grid"
    );

if (moreEpisodesGrid) {

    moreEpisodesGrid.innerHTML =
        episodeNumbers.map(number => {

            const ep =
                selectedEpisodes[number];

            const formattedNumber =
                String(number).padStart(
                    2,
                    "0"
                );

            const available =
                Boolean(ep.video);

            return `
                <a
                    class="episode-card ${number === episodeNumber ? "active" : ""}"
                    href="episode.html?anime=${encodeURIComponent(animeKey)}&ep=${number}"
                >
                    <span>${formattedNumber}</span>

                    <div>
                        <strong>
                            Episode ${formattedNumber}
                        </strong>

                        <small>
                            ${ep.quality} • ${ep.size}
                        </small>
                    </div>

                    <b>
                        ${available ? "▶" : "—"}
                    </b>
                </a>
            `;

        }).join("");
}


/* =========================================
   PAGE TITLE
========================================= */

document.title =
    `${episode.title} | JibonFlix`;


/* =========================================
   DOWNLOAD
========================================= */

const downloadButton =
    document.getElementById(
        "downloadButton"
    );

if (downloadButton) {

    if (episode.video) {

        downloadButton.href =
            episode.video;

        downloadButton.download =
            `JibonFlix-${currentAnimeTitle.replace(/\s+/g, "-")}-Episode-${episode.number}.mkv`;

        downloadButton.classList.remove(
            "disabled"
        );

        downloadButton.style.pointerEvents =
            "";

        downloadButton.style.opacity =
            "";

    } else {

        downloadButton.href =
            "#";

        downloadButton.removeAttribute(
            "download"
        );

        downloadButton.classList.add(
            "disabled"
        );

        downloadButton.style.pointerEvents =
            "none";

        downloadButton.style.opacity =
            "0.45";
    }
}


/* =========================================
   SHARE
========================================= */

function shareEpisode() {

    const shareUrl =
        window.location.href;

    const shareTitle =
        episode.title;

    if (navigator.share) {

        navigator.share({
            title: shareTitle,
            text:
                `Watch ${shareTitle} on JibonFlix`,
            url: shareUrl
        }).catch(() => {});

    } else if (navigator.clipboard) {

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                showToast(
                    "Link copied"
                );
            });

    } else {

        showToast(
            "Copy the link from the address bar"
        );
    }
}


/* =========================================
   DEBUG
========================================= */

console.log(
    "JIBONFLIX:",
    animeKey,
    "Episode:",
    episodeNumber,
    "Video:",
    episode.video || "Unavailable"
);
