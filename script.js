const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-nav");

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNavigation.classList.toggle("is-open", !isExpanded);
    menuToggle.setAttribute("aria-label", isExpanded ? "Otvoriť navigáciu" : "Zavrieť navigáciu");
  });

  mainNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Otvoriť navigáciu");
      mainNavigation.classList.remove("is-open");
    }
  });
}