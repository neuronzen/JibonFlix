const animeData = {
    "hells-paradise": {
        title: "Hell's Paradise",
        year: "2023",
        episodes: "13 Episodes",
        quality: "1080p",
        description: "A group of condemned criminals is sent to a mysterious island in search of the elixir of immortality, where survival becomes the ultimate challenge.",
        genres: ["Action", "Adventure", "Fantasy"],
        poster: "poster-five"
    }
};

const params = new URLSearchParams(window.location.search);
const animeKey = params.get("anime") || "hells-paradise";

const anime = animeData[animeKey] || animeData["hells-paradise"];

const hero = document.querySelector(".anime-hero");

if (hero) {
    const cover = hero.querySelector(".anime-cover");
    const label = hero.querySelector(".section-label");
    const title = hero.querySelector("h1");
    const meta = hero.querySelector(".anime-meta");
    const description = hero.querySelector(".anime-description p");
    const genres = hero.querySelector(".genres");

    if (cover) {
        cover.className = `anime-cover ${anime.poster}`;

        const posterTitle = cover.querySelector(".poster-title");

        if (posterTitle) {
            const words = anime.title.toUpperCase().split(" ");

            if (words.length >= 2) {
                posterTitle.innerHTML =
                    `${words.slice(0, -1).join("<br>")}<br>${words[words.length - 1]}`;
            } else {
                posterTitle.textContent = anime.title.toUpperCase();
            }
        }
    }

    if (label) {
        label.textContent = `ANIME • ${anime.year}`;
    }

    if (title) {
        title.textContent = anime.title;
    }

    if (meta) {
        meta.innerHTML = `
            <span>${anime.year}</span>
            <span>•</span>
            <span>${anime.episodes}</span>
            <span>•</span>
            <span>${anime.quality}</span>
        `;
    }

    if (description) {
        description.textContent = anime.description;
    }

    if (genres) {
        genres.innerHTML = anime.genres
            .map(genre => `<span>${genre}</span>`)
            .join("");
    }
}

document.title = `${anime.title} — JibonFlix`;


/* ANIME EPISODE LINKING */

const watchButton = document.querySelector(".watch-button");
const episodeGrid = document.querySelector(".episode-grid");

if (watchButton) {
    watchButton.href = `episode.html?anime=${encodeURIComponent(animeKey)}&ep=1`;
}

if (episodeGrid) {
    const episodeCount = 4;

    episodeGrid.querySelectorAll(".episode-card").forEach((card, index) => {
        const number = index + 1;
        card.href = `episode.html?anime=${encodeURIComponent(animeKey)}&ep=${number}`;

        const numberElement = card.querySelector("span");
        const titleElement = card.querySelector("strong");
        const metaElement = card.querySelector("small");

        if (numberElement) {
            numberElement.textContent = String(number).padStart(2, "0");
        }

        if (titleElement) {
            titleElement.textContent = `Episode ${String(number).padStart(2, "0")}`;
        }

        if (metaElement) {
            metaElement.textContent = `${anime.quality} • —`;
        }
    });
}
