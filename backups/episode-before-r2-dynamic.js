<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Episode 01 — JibonFlix</title>
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

<section class="watch-section">

    <div class="breadcrumb">
        <a href="index.html">Home</a>
        <span>›</span>
        <a href="anime.html" id="breadcrumbAnime">Jibon Adventure</a>
        <span>›</span>
        <strong>Episode 01</strong>
    </div>


    <div class="video-container">

        <!-- Real video will be connected here later -->

        <div class="video-player-box">

            <div class="video-watermark">
                JibonFlix
            </div>

            <video
                class="real-player"
                controls
                playsinline
                preload="metadata"
            >
                <source src="assets/test.mkv" type="video/x-matroska">
                Your browser does not support HTML5 video.
            </video>

        </div>

    </div>


    <div class="watch-info">

        <div>
            <span class="section-label" id="episodeAnimeTitle">JIBON ADVENTURE</span>

            <h1>Episode 01</h1>

            <p class="episode-meta">
                1080p • 101 MB
            </p>
        </div>


        <div class="watch-actions">

            <a
                class="action-button"
                id="downloadButton"
                href="#"
            >
                ↓ Download
            </a>

            <button onclick="shareEpisode()">
                🔗 Share
            </button>

        </div>

    </div>


    <div class="episode-navigation">

        <a href="#" class="nav-episode previous-episode disabled">
            ← Previous
        </a>

        <a href="anime.html" class="nav-episode">
            Episode List
        </a>

        <a href="episode.html?ep=2" class="nav-episode next-episode">
            Next →
        </a>

    </div>


    <section class="section watch-episodes">

        <div class="section-header">
            <div>
                <span class="section-label" id="episodeAnimeTitle">JIBON ADVENTURE</span>
                <h2>More Episodes</h2>
            </div>
        </div>


        <div class="episode-grid">

            <a class="episode-card active" href="episode.html?ep=1">
                <span>01</span>
                <div>
                    <strong>Episode 01</strong>
                    <small>1080p • 175 MB</small>
                </div>
                <b>▶</b>
            </a>

            <a class="episode-card" href="episode.html?ep=2">
                <span>02</span>
                <div>
                    <strong>Episode 02</strong>
                    <small>1080p • 182 MB</small>
                </div>
                <b>▶</b>
            </a>

            <a class="episode-card" href="episode.html?ep=3">
                <span>03</span>
                <div>
                    <strong>Episode 03</strong>
                    <small>1080p • 190 MB</small>
                </div>
                <b>▶</b>
            </a>

        </div>

    </section>

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


<div id="toast"></div>

<script src="app.js"></script>

</body>
<script src="episode-data.js"></script>

</html>
