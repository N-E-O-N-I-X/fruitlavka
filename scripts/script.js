document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu");
  const contactsBtn = document.querySelector(".contacts");
  const contactsPopup = document.querySelector(".contacts-popup");
  const aboutBtn = document.querySelector(".about");
  const aboutPopup = document.querySelector(".about-popup");

  let justOpened = false;

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
    justOpened = true;
    setTimeout(() => justOpened = false, 300);
  });

  aboutBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    aboutPopup.classList.toggle("visible");
    contactsPopup.classList.remove("visible");
    justOpened = true;

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
});
