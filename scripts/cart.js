document.querySelector(".custom-cart-button").addEventListener("click", () => {
  const message = "Здравствуйте! Я хочу собрать свою собственную корзинку 🍓🧺";
  const telegramUsername = "FRUITLAVKA24";

  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});