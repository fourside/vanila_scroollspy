"use strict";

(function() {
  document.addEventListener("DOMContentLoaded", init);
})();


function init() {
  const menuElementCache = new Map();
  const openMenuOptions = {
    root: null,
    rootMargin: "16px",
    threshold: 0, 
  };
  const menuOpenObserver = observerFactory(openMenuOptions, openMenu, menuElementCache);
  document.querySelectorAll(".main > section").forEach((target) => {
    const id = target.getAttribute("id");
    const menuAnchor = document.querySelector(`a[href='#${id}']`);
    menuElementCache.set(id, menuAnchor.parentElement.nextSibling.nextSibling);
    menuOpenObserver.observe(target);
  });

  const activeMenuOptions = {
    root: null,
    rootMargin: "16px",
    threshold: 0.5, 
  };
  const activateMenuObserver = observerFactory(activeMenuOptions, activateMenu, menuElementCache);
  document.querySelectorAll("section section").forEach((target) => {
    const id = target.getAttribute("id");
    const menuAnchor = document.querySelector(`a[href='#${id}']`);
    menuElementCache.set(id, menuAnchor.parentElement);
    activateMenuObserver.observe(target);
  });
}

/**
 * @param {Element} intersectingElement
 * @param {Map<string, Element>} cache 
 */
function openMenu(intersectingElement, cache) {
  Array.from(cache.values()).forEach(element => element.classList.remove("open"));
  const id = intersectingElement.getAttribute("id");
  const target = cache.get(id);
  target.classList.add("open");
}

/**
 * @param {Element} intersectingElement
 * @param {Map<string, Element>} cache 
 */
function activateMenu(intersectingElement, cache) {
  Array.from(cache.values()).forEach(element => element.classList.remove("active"));
  const id = intersectingElement.getAttribute("id");
  const target = cache.get(id);
  target.classList.add("active");
}

/**
 * 
 * @param {Object} options 
 * @param {Function} callback 
 * @param {Map<string, Element} cache 
 */
function observerFactory(options, callback, cache) {
  return new IntersectionObserver((entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target, cache);
      }
    })
  }), options);
}
