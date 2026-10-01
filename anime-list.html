<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Anime — JibonFlix</title>

    <meta
        name="description"
        content="Browse anime on JibonFlix"
    >

    <link rel="stylesheet" href="style.css">
</head>

<body>

<header class="navbar">

    <a href="index.html" class="logo">
        <span class="logo-icon">J</span>
        <span>Jibon<span>Flix</span></span>
    </a>

    <nav>
        <a href="index.html">Home</a>
        <a href="anime-list.html">Anime</a>
    </nav>

</header>


<main>

<section class="section anime-list-section">

    <div class="section-header">
        <div>
            <span class="section-label">JIBONFLIX</span>
            <h1>Anime Collection</h1>
        </div>

        <span class="anime-count" id="animeCount"></span>
    </div>


    <div class="anime-grid" id="animeList"></div>

</section>

</main>


<footer>

    <div class="footer-logo">JibonFlix</div>

    <div class="developer-credit">
        <span>Created & Developed by</span>
        <strong>Jubayer Ahmmed Jibon</strong>
    </div>

    <div class="copyright">
        © 2026 JibonFlix. All rights reserved.
    </div>

</footer>


<script src="anime-data.js"></script>

<script>

const animeList = document.getElementById("animeList");
const animeCount = document.getElementById("animeCount");

const animeStatuses = {
    "hells-paradise": "NEW"
};

if (animeList && typeof animeData !== "undefined") {

    const entries = Object.entries(animeData);

    animeCount.textContent =
        `${entries.length} Anime`;

    animeList.innerHTML = entries.map(([key, anime]) => {

        const titleWords =
            anime.title.toUpperCase().split(" ");

        let posterTitle;

        if (titleWords.length >= 2) {
            posterTitle =
                `${titleWords.slice(0, -1).join("<br>")}<br>${titleWords[titleWords.length - 1]}`;
        } else {
            posterTitle = anime.title.toUpperCase();
        }

        const status =
            animeStatuses[key] || "HD";

        const genre =
            anime.genres && anime.genres.length
                ? anime.genres[0]
                : "Anime";

        return `
            <a
                href="anime.html?anime=${encodeURIComponent(key)}"
                class="anime-card"
            >

                <div class="poster ${anime.poster}">

                    <span class="status">
                        ${status}
                    </span>

                    <div class="poster-title">
                        ${posterTitle}
                    </div>

                </div>


                <div class="card-info">

                    <h3>${anime.title}</h3>

                    <p>
                        ${anime.episodes}
                        •
                        ${genre}
                    </p>

                    <small class="anime-quality">
                        ${anime.quality}
                    </small>

                </div>

            </a>
        `;

    }).join("");
}

</script>

</body>
</html>
