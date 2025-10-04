export async function search() {
  document.addEventListener("DOMContentLoaded", async () => {
    const input = document.querySelector("#site-search");
    const form = document.querySelector(".search-form");
    const suggestionBox = document.getElementById("searchSuggestions");

    const categoryMap = {
      fruits: "Фрукты и ягоды",
      vegetables: "Овощи",
      exotic: "Экзотика"
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim().toLowerCase();
      const allCards = document.querySelectorAll(".product");
      let firstMatch = null;

      allCards.forEach(card => {
        const title = card.querySelector(".product-title").textContent.toLowerCase();
        card.classList.remove("highlight");

        if (query && title.includes(query)) {
          card.classList.add("highlight");
          if (!firstMatch) firstMatch = card;
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          allCards.forEach(card => card.classList.remove("highlight"));
        }, 3000);
      }
    });

    input.addEventListener("input", async () => {
      const query = input.value.trim().toLowerCase();
      const products = document.querySelectorAll(".product");
      suggestionBox.innerHTML = "";
      suggestionBox.classList.remove("visually-hidden");

      products.forEach(card => card.classList.remove("highlight"));

      if (!query) {
        suggestionBox.classList.add("visually-hidden");
        return;
      }

      const matches = {
        fruits: [],
        vegetables: [],
        exotic: [],
        categories: []
      };

      // Найдём подходящие категории
      Object.entries(categoryMap).forEach(([key, name]) => {
        if (name.toLowerCase().includes(query)) {
          matches.categories.push({ key, name });
        }
      });

      const queryWords = query.split(/\s+/);
      products.forEach(card => {
        const titleEl = card.querySelector(".product-title");
        const title = titleEl.textContent.toLowerCase();
        const section = card.closest(".section-div");
        const category = section?.classList.contains("fruits")
          ? "fruits"
          : section?.classList.contains("vegetables")
          ? "vegetables"
          : "exotic";

        const isMatch = queryWords.every(word => title.includes(word));
        if (isMatch) {
          matches[category].push({ title: titleEl.textContent, element: card });
        }
      });

      let totalMatches = 0;

      // Категории
      if (matches.categories.length > 0) {
        const catLabel = document.createElement("div");
        catLabel.textContent = "Категории";
        catLabel.className = "category-label";
        suggestionBox.appendChild(catLabel);

        matches.categories.forEach(({ key, name }) => {
          const item = document.createElement("div");
          item.textContent = name;
          item.className = "suggestion-item";
          item.addEventListener("click", () => {
            const section = document.querySelector(`.section-div.${key}`);
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
              input.value = name;
            }
            suggestionBox.classList.add("visually-hidden");
          });
          suggestionBox.appendChild(item);
          totalMatches++;
        });
      }

      // Товары
      Object.entries(matches).forEach(([category, items]) => {
        if (category === "categories" || items.length === 0) return;

        const categoryLabel = document.createElement("div");
        categoryLabel.textContent = categoryMap[category];
        categoryLabel.className = "category-label";
        suggestionBox.appendChild(categoryLabel);

        items.forEach(({ title, element }) => {
          element.classList.add("highlight");
          const item = document.createElement("div");
          item.textContent = title;
          item.className = "suggestion-item";
          item.addEventListener("click", () => {
            document.querySelectorAll(".product").forEach(p => p.classList.remove("highlight"));
            element.classList.add("highlight");
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            input.value = title;
            suggestionBox.classList.add("visually-hidden");
            setTimeout(() => element.classList.remove("highlight"), 3000);
          });
          suggestionBox.appendChild(item);
          totalMatches++;
        });
      });

      suggestionBox.classList.toggle("visually-hidden", totalMatches === 0);
    });

    // Скрытие подсказок при клике вне
    document.addEventListener("click", (e) => {
      if (
        !form.contains(e.target) &&
        !suggestionBox.contains(e.target)
      ) {
        suggestionBox.classList.add("visually-hidden");
      }
    });
  });
}