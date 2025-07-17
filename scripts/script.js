document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu");
  const contactsBtn = document.querySelector(".contacts");
  const contactsPopup = document.querySelector(".contacts-popup");
  const aboutBtn = document.querySelector(".about");
  const aboutPopup = document.querySelector(".about-popup");

  burgerButton.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.querySelectorAll(".menu .action-header-buttons").forEach(btn => {
    if (!btn.classList.contains("contacts") && !btn.classList.contains("about")) {
      btn.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    }
  });

  contactsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    contactsPopup.classList.toggle("visible");
    aboutPopup.classList.remove("visible");
    setTimeout(() => menu.classList.remove("open"), 50);
  });

  let justOpened = false;

aboutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  aboutPopup.classList.toggle("visible");
  contactsPopup.classList.remove("visible");
  justOpened = true;
  if (window.innerWidth < 1225) {
    setTimeout(() => menu.classList.remove("open"), 50);
  }
  setTimeout(() => justOpened = false, 300);
});

document.addEventListener("click", (e) => {
  if (justOpened) return;

  if (!contactsPopup.contains(e.target) && !contactsBtn.contains(e.target)) {
    contactsPopup.classList.remove("visible");
  }
  if (!aboutPopup.contains(e.target) && !aboutBtn.contains(e.target)) {
    aboutPopup.classList.remove("visible");
  }
});



  setTimeout(() => {
    document.addEventListener("click", (e) => {
      if (!contactsPopup.contains(e.target) && !contactsBtn.contains(e.target)) {
        contactsPopup.classList.remove("visible");
      }
      if (!aboutPopup.contains(e.target) && !aboutBtn.contains(e.target)) {
        aboutPopup.classList.remove("visible");
      }
    });
  }, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    banner.style.display = "block";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  });
});



document.querySelector(".search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.querySelector("#site-search").value.trim().toLowerCase();
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

  const input = document.querySelector("#site-search");
  const suggestionBox = document.getElementById("searchSuggestions");
  const categoryMap = {
    fruits: "Фрукты и ягоды",
    vegetables: "Овощи",
    exotic: "Экзотика"
  };

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const products = document.querySelectorAll(".product");
    suggestionBox.textContent = "";
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

    Object.entries(categoryMap).forEach(([key, name]) => {
      if (name.toLowerCase().includes(query)) {
        matches.categories.push({ key, name });
      }
    });

    const queryWords = query.split(/\s+/);
    products.forEach(card => {
      const titleText = card.querySelector(".product-title").textContent;
      const title = titleText.toLowerCase();
      const section = card.closest(".section-div");
      const category = section.classList.contains("fruits") ? "fruits" :
                       section.classList.contains("vegetables") ? "vegetables" : "exotic";

      const isMatch = queryWords.every(word => title.includes(word));
      if (isMatch) {
        matches[category].push({ title: titleText, element: card });
      }
    });

    let totalMatches = 0;

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
          products.forEach(p => p.classList.remove("highlight")); 
          element.classList.add("highlight"); 
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          input.value = title;
          suggestionBox.classList.add("visually-hidden");

          setTimeout(() => {
            element.classList.remove("highlight");
          }, 3000);
        });
        suggestionBox.appendChild(item);
        totalMatches++;
      });
    }

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
          products.forEach(p => p.classList.remove("highlight")); 
          element.classList.add("highlight"); 
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          input.value = title;
          suggestionBox.classList.add("visually-hidden");

          setTimeout(() => {
            element.classList.remove("highlight");
          }, 3000);
        });
        suggestionBox.appendChild(item);
        totalMatches++;
      });
    });

    suggestionBox.classList.toggle("visually-hidden", totalMatches === 0);
});

document.addEventListener("click", (event) => {
  const input = document.querySelector("#site-search");
  const suggestionBox = document.getElementById("searchSuggestions");

  if (!input.contains(event.target) && !suggestionBox.contains(event.target)) {
    suggestionBox.classList.add("visually-hidden");
  }
});
