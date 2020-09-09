(function() {
  document.addEventListener("DOMContentLoaded", init);
})();

const elementMap = new Map();

function init() {
  const openMenuOptions = {
    root: null,
    rootMargin: "16px",
    threshold: 0, 
  };
  const menuOpenObserver = new IntersectionObserver(openMenu, openMenuOptions);
  ["#western", "#eastern"].forEach((id) => {
    const menuAnchor = document.querySelector(`a[href='${id}']`);
    elementMap.set(id.replace("#", ""), menuAnchor.parentElement.nextSibling.nextSibling);
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
    const id = target.getAttribute("id");
    const menuAnchor = document.querySelector(`a[href='#${id}']`);
    elementMap.set(id, menuAnchor.parentElement);
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
      Array.from(elementMap.values()).forEach(element => element.classList.remove("open"));
      const id = entry.target.getAttribute("id");
      const target = elementMap.get(id);
      target.classList.add("open");
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
      Array.from(elementMap.values()).forEach(element => element.classList.remove("active"));
      const id = entry.target.getAttribute("id");
      const target = elementMap.get(id);
      target.classList.add("active");
    }
  });
}