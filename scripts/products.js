const products = [
  { title: "Черешня премиум Узбекская 2кг", price: "3900₽/шт", category: "fruits", image: "./images/products/cherry.jpg" },
  { title: "Клубника Турция 4кг", price: "3200₽/шт", category: "fruits", image: "./images/products/strawberry1.jpg" },
  { title: "Клубника Краснодар 2.8кг", price: "2600₽/шт", category: "fruits", image: "./images/products/strawberry2.jpg" },
  { title: "Клубника Крым 2.8кг", price: "2600₽/шт", category: "fruits", image: "./images/products/strawberry3.jpg" },
  { title: "Арбузы Иран 10кг", price: "1800₽/шт", category: "fruits", image: "./images/products/watermelon.jpg" },
  { title: "Ананас самолетный премиум", price: "2000₽/шт", category: "fruits", image: "./images/products/pineaple1.jpg" },
  { title: "Ананас сладкий", price: "1200₽/шт", category: "fruits", image: "./images/products/pineaple2.jpg" },
  { title: "Голубика 250г", price: "1100₽/шт", category: "fruits", image: "./images/products/blueberry.jpg" },
  { title: "Малина 500г", price: "2200₽/шт", category: "fruits", image: "./images/products/raspberry.jpg" },
  { title: "Ежевика 500г", price: "2200₽/шт", category: "fruits", image: "./images/products/blackberry.jpg" },
  { title: "Апельсины Турция 6.5кг", price: "2200₽/шт", category: "fruits", image: "./images/products/orange.jpg" },
  { title: "Персики 4кг", price: "4000₽/шт", category: "fruits", image: "./images/products/peach.jpg" },
  { title: "Нектарины 4кг", price: "4000₽/шт", category: "fruits", image: "./images/products/nectarine.jpg" },
  { title: "Абрикосы 2кг", price: "3900₽/шт", category: "fruits", image: "./images/products/apricot.jpg" },
  { title: "Помидоры узбекские супер-сладкие 2.5кг", price: "3200₽/шт", category: "vegetables", image: "./images/products/tomato.jpg" },
  { title: "Огурцы бакинские хрустящие 1кг", price: "800₽/шт", category: "vegetables", image: "./images/products/cucamber.jpg" },
  { title: "Овощной бокс 5кг", price: "4800₽/шт", category: "vegetables", image: "./images/products/vegetablebox.jpg" },
  { title: "Авокадо Перу 4кг", price: "3500₽/шт", category: "vegetables", image: "./images/products/avocado.jpg" },
  { title: "Питахайя Вьетнам красная 1кг", price: "1550₽/шт", category: "exotic", image: "./images/products/pitahaya1.jpg" },
  { title: "Питахайя Вьетнам белая 1кг", price: "1550₽/шт", category: "exotic", image: "./images/products/pitahaya2.jpg" },
  { title: "Питахайя Вьетнам желтая 1кг", price: "1550₽/шт", category: "exotic", image: "./images/products/pitahaya3.jpg" },
  { title: "Маракуйя Вьетнам 1кг", price: "2400₽/шт", category: "exotic", image: "./images/products/passionfruit.jpg" },
  { title: "Лонган 500г", price: "950₽/шт", category: "exotic", image: "./images/products/longan.jpg" },
  { title: "Манго жёлтое Тайланд", price: "600₽/шт", category: "exotic", image: "./images/products/mango1.jpg" },
  { title: "Манго Перу крупное премиум", price: "1100₽/шт", category: "exotic", image: "./images/products/mango2.jpg" },
  { title: "Мангустин 1кг", price: "2550₽/шт", category: "exotic", image: "./images/products/mangosteen.jpg" },
  { title: "Папайя Тайланд 1кг", price: "1700₽/шт", category: "exotic", image: "./images/products/papaya.jpg" },
];

document.addEventListener("DOMContentLoaded", () => {
  const template = document.getElementById("product-template");
  const categoryMap = {
    fruits: document.querySelector(".fruits.section-div"),
    vegetables: document.querySelector(".vegetables.section-div"),
    exotic: document.querySelector(".exotic.section-div"),
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");

  const CART_TIMESTAMP_KEY = 'cartTimestamp';
const ONE_DAY_MS = 3 * 24 * 60 * 60 * 1000;

const savedTime = localStorage.getItem(CART_TIMESTAMP_KEY);

if (savedTime) {
  const now = Date.now();
  const timeDiff = now - parseInt(savedTime, 10);

  if (timeDiff > ONE_DAY_MS) {
    localStorage.removeItem('cart');
    localStorage.removeItem(CART_TIMESTAMP_KEY);
    console.log("Корзина очищена — прошло больше суток");
  }
}

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTimestamp', Date.now().toString());
  }

    function updateCartIndicator() {
    const indicator = document.querySelector(".cart-indicator");
    if (indicator) {
      indicator.classList.toggle("active", Object.keys(cart).length > 0);
    }
  } 


  function renderProductControls(productCard, title, step) {
    const description = productCard.querySelector(".product-description");
    description.querySelector(".add-product")?.remove();
    description.querySelector(".cart-control")?.remove();

    const controlDiv = document.createElement("div");
    controlDiv.className = "cart-control";

    const minus = document.createElement("button");
    minus.textContent = "–";
    const plus = document.createElement("button");
    plus.textContent = "+";
    const amount = document.createElement("span");
    amount.textContent = `${cart[title].toFixed(2)} шт`;

    controlDiv.append(minus, amount, plus);
    description.appendChild(controlDiv);

    minus.addEventListener("click", () => {
      cart[title] -= step;
      if (cart[title] <= 0) {
        delete cart[title];
        renderAddButton(productCard, title, step);
      } else {
        renderProductControls(productCard, title, step);
      }
      updateCartIndicator();
      renderCartItems();
      saveCart();
    });

    plus.addEventListener("click", () => {
      cart[title] += step;
      renderProductControls(productCard, title, step);
      updateCartIndicator();
      renderCartItems();
      saveCart();
    });
  }

  function renderAddButton(productCard, title, step) {
    const description = productCard.querySelector(".product-description");
    description.querySelector(".add-product")?.remove();
    description.querySelector(".cart-control")?.remove();

    const btn = document.createElement("button");
    btn.className = "add-product";
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => {
      cart[title] = (cart[title] || 0) + step;
      renderProductControls(productCard, title, step);
      updateCartIndicator();
      renderCartItems();
      saveCart();
    });

    description.appendChild(btn);
  }


  products.forEach(product => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".product");
    const title = product.title;
    const step = 1;


    card.id = "product-" + title.toLowerCase().replace(/\s+/g, "-");

    card.querySelector(".product-title").textContent = title;
    card.querySelector(".product-cost").textContent = product.price;
    const img = card.querySelector(".product-image");
    img.src = product.image;
    img.alt = title;

    if (cart[title]) {
      renderProductControls(card, title, step);
    } else {
      renderAddButton(card, title, step);
    }

    categoryMap[product.category]?.appendChild(clone);
  });

  const cartPopup = document.querySelector(".cart-popup");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const closeCart = document.querySelector(".close-cart");

  document.querySelector(".cart").addEventListener("click", () => {
    renderCartItems();
    cartPopup.classList.remove("hidden");
  });

  closeCart.addEventListener("click", () => {
    cartPopup.classList.add("hidden");
  });

  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = "<p>Корзина пуста</p>";
      cartTotal.textContent = "0 ₽";
      return;
    }

    for (const title in cart) {
      const product = products.find(p => p.title === title);
      if (!product) continue;

      const item = document.createElement("div");
      item.className = "cart-item";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = title;

      const info = document.createElement("div");
      info.className = "cart-item-info";
      info.innerHTML = `<strong>${title}</strong><br><small>${product.price}</small>`;

      const controls = document.createElement("div");
      controls.className = "cart-item-controls";

      const minus = document.createElement("button");
      minus.textContent = "–";

      const qty = document.createElement("span");
      const match = product.price.match(/(^|\s)(\d{2,6})/);
      const priceNum = match ? parseFloat(match[2]) : 0;
      const amount = cart[title];
      const itemTotal = Math.round(amount * priceNum);

      qty.textContent = `${amount.toFixed(2)} шт × ${formatPrice(priceNum)}₽ = ${formatPrice(itemTotal)}₽`;

      const plus = document.createElement("button");
      plus.textContent = "+";

      minus.addEventListener("click", () => {
        cart[title] -= 1;
        if (cart[title] <= 0) {
          delete cart[title];
        }
        renderCartItems();
        updateCard(title);
        updateCartIndicator();
        saveCart();
      });

      plus.addEventListener("click", () => {
        cart[title] += 1;
        renderCartItems();
        updateCard(title);
        updateCartIndicator();
        saveCart();
      });

      controls.append(minus, qty, plus);
      item.append(image, info, controls);
      cartItemsContainer.appendChild(item);

      total += itemTotal;
    }

    cartTotal.textContent = `${formatPrice(Math.round(total))} ₽`;
  }

  function updateCard(title) {
    const card = Array.from(document.querySelectorAll(".product")).find(p =>
      p.querySelector(".product-title").textContent === title
    );
    if (!card) return;
    if (cart[title]) {
      renderProductControls(card, title, 1);
    } else {
      renderAddButton(card, title, 1);
    }
  }

  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  updateCartIndicator();
  renderCartItems();

  document.querySelector(".send-to-telegram").addEventListener("click", () => {
  const items = [];
  let total = 0;

  for (const title in cart) {
    const product = products.find(p => p.title === title);
    if (!product) continue;

    const match = product.price.match(/(^|\s)(\d{2,6})/);
    const priceNum = match ? parseFloat(match[2]) : 0;
    const amount = cart[title];
    const itemTotal = Math.round(priceNum * amount);
    total += itemTotal;

    items.push(`${title}\n${amount.toFixed(2)} шт × ${priceNum} ₽ = ${itemTotal} ₽`);
  }

  const message = `🛒 Заказ с сайта:\n\n${items.join('\n\n')}\n\n💰 Итого: ${formatPrice(total)} ₽`;
  const telegramUsername = "FRUITLAVKA24";

  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
});

document.addEventListener("click", (event) => {
  const popup = document.querySelector(".cart-popup");
  const cartBtn = document.querySelector(".cart");

  const isInsideCart = popup.contains(event.target);
  const isCartButton = cartBtn.contains(event.target);

  const isCartControl = event.target.closest(".cart-control");
  const isAddButton = event.target.closest(".add-product");
  const isCartItemControls = event.target.closest(".cart-item-controls");

  if (!isInsideCart && !isCartButton && !isCartControl && !isAddButton && !isCartItemControls) {
    popup.classList.add("hidden");
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const catalogBtn = document.querySelector(".catalog");
  const catalogPopup = document.getElementById("catalogPopup");

  const categories = {
    fruits: "Фрукты и ягоды",
    vegetables: "Овощи",
    exotic: "Экзотика"
  };

  const groupedProducts = {
    fruits: [],
    vegetables: [],
    exotic: []
  };

  products.forEach(product => {
    if (groupedProducts[product.category]) {
      groupedProducts[product.category].push(product);
    }
  });

  for (const [key, name] of Object.entries(categories)) {
    const catTitle = document.createElement("div");
    catTitle.className = "category-title";
    catTitle.textContent = name;

    const productList = document.createElement("div");
    productList.className = "product-list";

    groupedProducts[key].forEach(prod => {
      const item = document.createElement("div");
      item.className = "product-item";

      const img = document.createElement("img");
      img.src = prod.image || ""; // если пусто — не будет изображения
      img.alt = prod.title;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = prod.title;

      item.appendChild(img);
      item.appendChild(nameSpan);
      item.addEventListener("click", () => {
        const anchorId = "product-" + prod.title.toLowerCase().replace(/\s+/g, "-");
        const target = document.getElementById(anchorId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        catalogPopup.classList.add("visually-hidden"); // Скрыть каталог
      });

      productList.appendChild(item);
    });

    catTitle.addEventListener("click", () => {
      productList.classList.toggle("visible");
    });

    catalogPopup.appendChild(catTitle);
    catalogPopup.appendChild(productList);
  }

  // Появление/скрытие
  let insidePopup = false;

  catalogBtn.addEventListener("mouseenter", () => {
    catalogPopup.classList.remove("visually-hidden");
  });

  catalogPopup.addEventListener("mouseenter", () => {
    insidePopup = true;
  });

  catalogBtn.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!insidePopup) catalogPopup.classList.add("visually-hidden");
    }, 200);
  });

  catalogPopup.addEventListener("mouseleave", () => {
    insidePopup = false;
    catalogPopup.classList.add("visually-hidden");
  });
});