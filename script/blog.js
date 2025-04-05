
document.addEventListener("DOMContentLoaded", () => {
    const articlesContainer = document.getElementById("articles-container");
    const loadingSpinner = document.getElementById("loading-spinner");

    async function fetchArticles() {
        try {
            const response = await fetch('/api/fetch-articles');
            const data = await response.json();

            if (data.mainArticles) {
                renderArticles(data.mainArticles);
            }
        } catch (error) {
            console.error("Ошибка загрузки статей:", error);
        } finally {
            loadingSpinner.style.display = "none"; 
        }
    }

    function renderArticles(articles) {
        articlesContainer.innerHTML = ""; 
        articles.forEach(article => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("blog__article-card");

            articleCard.innerHTML = `
                <a target="_blank" href="https://harmex.ru/blog/${article.slug}" class="blog__article-link">
                    <img src="${article.image}" alt="Превью статьи" class="blog__article-image">
                </a>
                <div class="blog__article-content">
                    <a target="_blank" href="https://harmex.ru/blog/${article.slug}" class="blog__article-title">${article.title}</a>
                    <p class="blog__article-description">${article.description}</p>
                </div>
                <div class="blog__article-info">
                        <div class="blog__article-info-date"> 
                            <img src="./img/blog/calendar.png" alt="Calendar" class="blog__article-info-icon">
                            <p class="blog__article-info-text">${new Date(article.date).toLocaleDateString()}</p>
                        </div>

                        <div class="blog__article-info-views">
                            <img src="./img/blog/eye-line.png" alt="Calendar" class="blog__article-info-icon">
                            <p class="blog__article-info-text">${article.views}</p>
                        </div>
                </div>
            `;

            articlesContainer.appendChild(articleCard);
        });
    }

    fetchArticles();
});
