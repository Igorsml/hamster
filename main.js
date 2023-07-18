var swiperMobile = new Swiper(".swiper-container.swiper-full-mobile", {
  slidesPerView: "auto",
  spaceBetween: 5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  //   autoplay: {
  //     delay: 100000,
  //   },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});

// set alt from src
const imgs = document.querySelectorAll("#img");

Array.from(imgs).forEach((img) => {
  if (!img.hasAttribute("alt")) {
    img.setAttribute("alt", "hamster wheel");
  }
});

// lazy load imgs
window.onload = () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.body
    .querySelectorAll("img[data-src]")
    .forEach((img) => observer.observe(img));
};

// dark theme
const themeButton = document.body.querySelector("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//burger
const burgerButton = document.body.querySelector(".header__burger-button");
const header = document.querySelector(".header");

burgerButton.addEventListener("click", (event) => {
  document.querySelector(".header").classList.toggle("open");
});

document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("header__burger-button") &&
    !event.target.classList.contains(".header__phone-body") &&
    !event.target.closest("span")
  ) {
    header.classList.remove("open");
  }
});
