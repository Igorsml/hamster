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
