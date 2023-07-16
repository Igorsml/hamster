// const swiper = new Swiper(".swiper-container", {
//   slidesPerView: "auto",
//   spaceBetween: 20,
//   cssMode: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     type: "fraction",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

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

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.body.querySelector("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
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
    !event.target.classList.contains(".header__mobile-body") &&
    !event.target.closest("span")
  ) {
    header.classList.remove("open");
  }
});
