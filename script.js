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

const pageViews = document.querySelectorAll("[data-view]");
const reservationForm = document.querySelector(".reservation-form");
const pageLinks = document.querySelectorAll('.nav-link[href^="#"]');

function showCurrentView() {
  const requestedView = window.location.hash.slice(1) || "uvod";
  const activeView = Array.from(pageViews).find((view) => view.id === requestedView)
    || Array.from(pageViews).find((view) => view.id === "uvod");

  pageViews.forEach((view) => {
    view.hidden = view !== activeView;
  });

  pageLinks.forEach((link) => {
    if (link.hash === `#${activeView.id}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (activeView.id === "potvrdenie") {
    document.querySelector("#confirmation-title")?.focus();
  }
}

window.addEventListener("hashchange", showCurrentView);
showCurrentView();

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.hash = "potvrdenie";
  });
}