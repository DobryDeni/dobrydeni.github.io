let searchIndex = [];

// Загружаем JSON-индекс
fetch("../assets/js/search-index.json")
    .then(r => r.json())
    .then(data => { searchIndex = data; })
    .catch(err => console.error("Ошибка загрузки индекса:", err));

function performSearch() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    if (!query) {
        resultsDiv.innerHTML = "<p>Введите запрос.</p>";
        return;
    }
    if (searchIndex.length === 0) {
        resultsDiv.innerHTML = "<p>Индекс ещё загружается, попробуйте снова...</p>";
        return;
    }

    const words = query.split(/\s+/).filter(w => w.length > 1);
    const matches = searchIndex.filter(item => {
        const text = (item.title + " " + item.description + " " + item.tags).toLowerCase();
        return words.every(w => text.includes(w));
    });

    if (matches.length === 0) {
        resultsDiv.innerHTML = "<p>Ничего не найдено по запросу: <strong>" + query + "</strong></p>";
        return;
    }

    resultsDiv.innerHTML = "<p>Найдено: <strong>" + matches.length + "</strong></p>";
    matches.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-result";
        div.innerHTML = `
            <h3><a href="${item.url}">${item.title}</a></h3>
            <p>${item.description}</p>
            <span class="path">${item.url}</span>
        `;
        resultsDiv.appendChild(div);
    });
}
