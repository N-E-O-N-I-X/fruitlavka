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
    exotic: document.querySelector(".exotics.section-div")
  };

  products.forEach(product => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".product-title").textContent = product.title;
    clone.querySelector(".product-cost").textContent = product.price;
    const img = clone.querySelector(".product-image");
    img.src = product.image || "";
    img.alt = product.title;

    const container = categoryMap[product.category];
    if (container) {
      container.appendChild(clone);
    }
  });
});
