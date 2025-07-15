const products = [
  { title: "Черешня премиум Узбекская", price: "3900 руб/ящик", category: "fruits", image: "./images/products/cherry.jpg" },
  { title: "Клубника Турция", price: "3200 руб/ящик (4 кг)", category: "fruits", image: "./images/products/strawberry1.jpg" },
  { title: "Клубника Краснодар", price: "2600 руб/ящик (2.8 кг)", category: "fruits", image: "./images/products/strawberry2.jpg" },
  { title: "Клубника Крым", price: "2600 руб/ящик (2.8 кг)", category: "fruits", image: "./images/products/strawberry3.jpg" },
  { title: "Арбузы Иран", price: "180 руб/кг", category: "fruits", image: "./images/products/watermelon.jpg" },
  { title: "Ананас самолетный премиум", price: "2000 руб/шт", category: "fruits", image: "./images/products/pineaple1.jpg" },
  { title: "Ананас сладкий", price: "1200 руб/шт", category: "fruits", image: "./images/products/pineaple2.jpg" },
  { title: "Голубика", price: "4400 руб/1 кг", category: "fruits", image: "./images/products/blueberry.jpg" },
  { title: "Малина", price: "2200 руб/500 г", category: "fruits", image: "./images/products/raspberry.jpg" },
  { title: "Ежевика", price: "2200 руб/500 г", category: "fruits", image: "./images/products/blackberry.jpg" },
  { title: "Апельсины Турция", price: "2200 руб/6.5 кг", category: "fruits", image: "./images/products/orange.jpg" },
  { title: "Персики", price: "4000 руб/ящик (4 кг)", category: "fruits", image: "./images/products/peach.jpg" },
  { title: "Нектарины", price: "4000 руб/ящик (4 кг)", category: "fruits", image: "./images/products/nectarine.jpg" },
  { title: "Абрикосы", price: "3900 руб/2 кг", category: "fruits", image: "./images/products/apricot.jpg" },
  { title: "Помидоры узбекские супер-сладкие", price: "3200 руб/2.5 кг", category: "vegetables", image: "./images/products/tomato.jpg" },
  { title: "Огурцы бакинские хрустящие", price: "800 руб/кг", category: "vegetables", image: "./images/products/cucamber.jpg" },
  { title: "Овощной бокс", price: "4800 руб (5 кг)", category: "vegetables", image: "./images/products/vegetablebox.jpg" },
  { title: "Авокадо Перу", price: "3500 руб/4 кг", category: "vegetables", image: "./images/products/avocado.jpg" },
  { title: "Питахайя Вьетнам (белая, красная, жёлтая)", price: "1550 руб/кг", category: "exotic", image: "./images/products/pitahaya.jpg" },
  { title: "Маракуйя Вьетнам", price: "2400 руб/кг", category: "exotic", image: "./images/products/passionfruit.jpg" },
  { title: "Лонган", price: "950 руб/500 г", category: "exotic", image: "./images/products/longan.jpg" },
  { title: "Манго жёлтое Тайланд", price: "600 руб/шт", category: "exotic", image: "./images/products/mango1.jpg" },
  { title: "Манго Перу крупное премиум", price: "1100 руб/шт", category: "exotic", image: "./images/products/mango2.jpg" },
  { title: "Мангустин", price: "2550 руб/кг", category: "exotic", image: "./images/products/mangosteen.jpg" },
  { title: "Папайя Тайланд", price: "1700 руб/кг", category: "exotic", image: "./images/products/papaya.jpg" },
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
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

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