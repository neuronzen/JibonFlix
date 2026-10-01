function showMessage() {
    showToast("More anime will be added soon");
}

function playDemo() {
    showToast("Video player will be connected in the next step");
}

function focusSearch() {
    const search = document.getElementById("animeSearch");
    const area = document.querySelector(".search-area");

    if (!search || !area) return;

    area.classList.add("active");
    search.focus();
}

function filterAnime(query) {
    const cards = document.querySelectorAll(".anime-card");
    const suggestions = document.getElementById("searchSuggestions");

    const text = query.toLowerCase().trim();

    cards.forEach(card => {
        card.style.display = "";
    });

    if (!text) {
        suggestions.innerHTML = "";
        suggestions.classList.remove("show");
        return;
    }

    const matches = [];

    cards.forEach(card => {
        const title = card.querySelector("h3");

        if (!title) return;

        const name = title.textContent.trim();

        if (name.toLowerCase().includes(text)) {
            matches.push({
                name: name,
                card: card
            });
        }

        card.style.display = name.toLowerCase().includes(text) ? "" : "none";
    });

    if (matches.length) {
        suggestions.innerHTML = matches.map(item => `
            <div class="search-suggestion" data-name="${item.name}">
                <span class="suggestion-icon">▶</span>
                <span>${item.name}</span>
            </div>
        `).join("");

        suggestions.classList.add("show");

        suggestions.querySelectorAll(".search-suggestion").forEach(item => {
            item.addEventListener("click", () => {
                const name = item.dataset.name;

                const card = [...cards].find(card => {
                    const title = card.querySelector("h3");
                    return title && title.textContent.trim() === name;
                });

                if (card) {
                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

                suggestions.classList.remove("show");
            });
        });

    } else {
        suggestions.innerHTML = `
            <div class="search-no-result">
                No anime found
            </div>
        `;

        suggestions.classList.add("show");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("animeSearch");

    if (search) {
        search.addEventListener("input", () => {
            filterAnime(search.value);
        });

        search.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                filterAnime(search.value);
            }

            if (event.key === "Escape") {
                search.value = "";
                filterAnime("");
                search.blur();
            }
        });
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}
