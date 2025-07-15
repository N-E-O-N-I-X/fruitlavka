document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu");

  burgerButton.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});

