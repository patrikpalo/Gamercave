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
const reservationLink = document.querySelector('.nav-link[href="#rezervacia"]');

function showCurrentView() {
  const requestedView = window.location.hash.slice(1) || "uvod";
  const activeView = Array.from(pageViews).find((view) => view.id === requestedView)
    || Array.from(pageViews).find((view) => view.id === "uvod");

  pageViews.forEach((view) => {
    view.hidden = view !== activeView;
  });

  if (reservationLink) {
    if (activeView.id === "rezervacia") {
      reservationLink.setAttribute("aria-current", "page");
    } else {
      reservationLink.removeAttribute("aria-current");
    }
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