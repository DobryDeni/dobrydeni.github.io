
// Подсветка активной ссылки в меню
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    document.querySelectorAll("nav a").forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath === currentPath)) {
            link.style.color = "#e74c3c";
            link.style.textDecoration = "underline";
        }
    });

    // Автозапуск поиска, если в URL есть ?q=...
    if (document.getElementById("searchInput")) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        if (query) {
            document.getElementById("searchInput").value = query;
            performSearch();
        }
        document.getElementById("searchInput").addEventListener("keypress", e => {
            if (e.key === "Enter") performSearch();
        });
    }
});
