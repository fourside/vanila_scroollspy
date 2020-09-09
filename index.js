(function() {
  document.addEventListener("DOMContentLoaded", init);
})();

function init() {
  const openMenuOptions = {
    root: null,
    rootMargin: "16px",
    threshold: 0, 
  };
  const menuOpenObserver = new IntersectionObserver(openMenu, openMenuOptions);
  ["#western", "#eastern"].forEach((id) => {
    const target = document.querySelector(id);
    menuOpenObserver.observe(target);
  });

  const activeMenuOptions = {
    root: null,
    rootMargin: "16px",
    threshold: 0.5, 
  };
  const activateMenuObserver = new IntersectionObserver(activateMenu, activeMenuOptions);
  document.querySelectorAll("section section").forEach((target) => {
    activateMenuObserver.observe(target);
  });
}

/**
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
 */
function openMenu(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".side .open").forEach((target) => target.classList.remove("open"));
      const id = entry.target.getAttribute("id");
      const target = document.querySelector(`a[href='#${id}']`);
      target.parentElement.nextSibling.nextSibling.classList.add("open");
    }
  });
}

/**
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
 */
function activateMenu(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".active").forEach((target) => target.classList.remove("active"));
      const id = entry.target.getAttribute("id");
      const target = document.querySelector(`a[href='#${id}']`);
      target.parentElement.classList.add("active");
    }
  });
}