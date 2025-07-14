const products = [
  { title: "Черешня премиум Узбекская", price: "3900 руб/ящик", category: "fruits", image: "images/products/cherry.jpg" },
  { title: "Клубника Турция", price: "3200 руб/ящик (4 кг)", category: "fruits", image: "" },
  { title: "Клубника Краснодар", price: "4500 руб/ящик (5.5 кг)", category: "fruits", image: "" },
  { title: "Клубника Краснодар", price: "2600 руб/ящик (2.8 кг)", category: "fruits", image: "" },
  { title: "Клубника Крым", price: "4500 руб/ящик (5.5 кг)", category: "fruits", image: "" },
  { title: "Клубника Крым", price: "2600 руб/ящик (2.8 кг)", category: "fruits", image: "" },
  { title: "Арбузы Иран", price: "180 руб/кг", category: "fruits", image: "" },
  { title: "Ананас самолетный премиум", price: "2000 руб/шт", category: "fruits", image: "" },
  { title: "Ананас сладкий", price: "6000 руб/коробка (6 шт)", category: "fruits", image: "" },
  { title: "Ананас сладкий", price: "1200 руб/шт", category: "fruits", image: "" },
  { title: "Голубика", price: "1100 руб/250 г", category: "fruits", image: "" },
  { title: "Голубика", price: "2200 руб/500 г", category: "fruits", image: "" },
  { title: "Голубика", price: "4400 руб/1 кг", category: "fruits", image: "" },
  { title: "Малина", price: "2200 руб/500 г", category: "fruits", image: "" },
  { title: "Ежевика", price: "2200 руб/500 г", category: "fruits", image: "" },
  { title: "Апельсины Турция", price: "2200 руб/6.5 кг", category: "fruits", image: "" },
  { title: "Апельсины Турция", price: "3700 руб/13 кг", category: "fruits", image: "" },
  { title: "Персики", price: "4000 руб/ящик (4 кг)", category: "fruits", image: "" },
  { title: "Нектарины", price: "4000 руб/ящик (4 кг)", category: "fruits", image: "" },
  { title: "Абрикосы", price: "3900 руб/2 кг", category: "fruits", image: "" },
  { title: "Помидоры узбекские супер-сладкие", price: "5800 руб/4.6–5 кг", category: "vegetables", image: "" },
  { title: "Помидоры узбекские супер-сладкие", price: "3200 руб/2.3–2.5 кг", category: "vegetables", image: "" },
  { title: "Огурцы бакинские хрустящие", price: "800 руб/кг", category: "vegetables", image: "" },
  { title: "Овощной бокс", price: "4800 руб (5 кг)", category: "vegetables", image: "" },
  { title: "Авокадо Перу", price: "3500 руб/4 кг", category: "vegetables", image: "" },
  { title: "Питахайя Вьетнам (белая, красная, жёлтая)", price: "1550 руб/кг", category: "exotic", image: "" },
  { title: "Маракуйя Вьетнам", price: "2400 руб/кг", category: "exotic", image: "" },
  { title: "Лонган", price: "950 руб/500 г", category: "exotic", image: "" },
  { title: "Манго жёлтое Тайланд", price: "600 руб/шт", category: "exotic", image: "" },
  { title: "Манго Перу крупное премиум", price: "1100 руб/шт", category: "exotic", image: "" },
  { title: "Манго Перу крупное премиум", price: "6600 руб/10 шт", category: "exotic", image: "" },
  { title: "Мангустин", price: "2550 руб/кг", category: "exotic", image: "" },
  { title: "Папайя Тайланд", price: "1700 руб/кг", category: "exotic", image: "" },
];

document.addEventListener("DOMContentLoaded", () => {
  const template = document.getElementById("product-template");

  const categoryMap = {
    fruits: document.querySelector(".fruits.section-div"),
    vegetables: document.querySelector(".vegetables.section-div"),
    exotic: document.querySelector(".exotics.section-div")
  };

  products.forEach(product => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".product-title").textContent = product.title;
    clone.querySelector(".product-cost").textContent = product.price;
    const img = clone.querySelector(".product-image");
    img.src = product.image || ""; // оставим пусто
    img.alt = product.title;

    const container = categoryMap[product.category];
    if (container) {
      container.appendChild(clone);
    }
  });
});
