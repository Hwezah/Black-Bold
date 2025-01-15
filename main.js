const header = document.querySelector(".site-header");
const navMain = document.querySelector(".nav-main");
const allSections = document.querySelectorAll("section");

//Smooth Scrolling!

navMain.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Sticky Navigation: Intersection Observer API

const stickyNav = function (entries) {
  // entries = element in question..in this case(header)
  const [entry] = entries;
  if (entry.isIntersecting) {
    navMain.classList.remove("sticky");
  } else navMain.classList.add("sticky");
}; // function is called eachtime the observed element(eg.header) intersects the root element/viewport(based on the options given).

// Options by which the IntersectionObserver API will observe an Element in this case 'header'.
const obsOptions = {
  root: null, // This option specifies the element that is used as the viewport(basis) for checking the visibility of the target element.
  threshold: 0, //This option specifies at what percentage the API will triger the target element(header) to come into view(relative to the root(viewport)).
  rootMargin: "-120.4px", //helps to create room before the threshold kicks in.
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

// Smooth scrolling-in of sections!
// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   if (entry.isIntersecting) entry.target.classList.remove("section--hidden");
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

//CustomCursor
// This code enables javascript to sense and follow the mouse movements
const CustomCursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  CustomCursor.style.top = `${e.clientY}px`;
  CustomCursor.style.left = `${e.clientX}px`;
});

// LazyLoading images!

// const imgTargets = document.querySelectorAll("img[data-src]");

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-load");
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: "200px",
// });

// imgTargets.forEach((img) => imgObserver.observe(img));

//Testimonials / Services

// const servicesSlide = document.querySelectorAll(".services-slide");
// const servicesBtnLeft = document.querySelector(".servicesSlider__btn--left");
// const testimonialBtnRight = document.querySelector(
//   ".testimonialSlider__btn--right"
// );
// const testimonialBtnLeft = document.querySelector(
//   ".testimonialSlider__btn--left"
// );
// const servicesBtnRight = document.querySelector(".servicesSlider__btn--right");
// const servicesDotContainer = document.querySelector(".services-dots");
// const testimonialDotContainer = document.querySelector(".testimonial-dots");
// const testimonialSlide = document.querySelectorAll(".testimonial-slide");

// // Move formally piled slides to the side (e.g., slide1(0%), slide2(100%), slide3(200%), etc.)
// const createDots = function () {
//   servicesSlide.forEach(function (_, i) {
//     servicesDotContainer.insertAdjacentHTML(
//       "beforeend",
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// };

// createDots();

// const activateDot = function (slideIndex) {
//   document
//     .querySelectorAll(".dots__dot")
//     .forEach((dot) => dot.classList.remove("dots__dot--active"));

//   document
//     .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
//     .classList.add("dots__dot--active");
// };

// activateDot(0);

// const goToSlide = function (slideIndex) {
//   servicesSlide.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slideIndex)}%)`)
//   );
// };

// goToSlide(0);

// let curSlide = 0;
// const maxSlide = servicesSlide.length - 1;

// // Moving slides functionality when the right button is clicked
// const nextSlide = function () {
//   curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const prevSlide = function () {
//   curSlide = curSlide === 0 ? maxSlide : curSlide - 1;
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// servicesBtnLeft.addEventListener("click", prevSlide);
// servicesBtnRight.addEventListener("click", nextSlide);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "ArrowLeft") prevSlide();
//   if (e.key === "ArrowRight") nextSlide();
// });

// servicesDotContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dots__dot")) {
//     const slideIndex = +e.target.dataset.slide; // Convert string to number
//     goToSlide(slideIndex);
//     activateDot(slideIndex);
//   }
// });
class Slider {
  constructor(
    slidesSelector,
    btnLeftSelector,
    btnRightSelector,
    dotContainerSelector
  ) {
    this.slides = document.querySelectorAll(slidesSelector);
    this.btnLeft = document.querySelector(btnLeftSelector);
    this.btnRight = document.querySelector(btnRightSelector);
    this.dotContainer = document.querySelector(dotContainerSelector);
    this.curSlide = 0;
    this.maxSlide = this.slides.length - 1;

    this.init();
  }

  init() {
    this.createDots();
    this.activateDot(0);
    this.goToSlide(0);

    this.btnLeft.addEventListener("click", () => this.prevSlide());
    this.btnRight.addEventListener("click", () => this.nextSlide());

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    this.dotContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dots__dot")) {
        const slideIndex = +e.target.dataset.slide;
        this.goToSlide(slideIndex);
        this.activateDot(slideIndex);
      }
    });
  }

  createDots() {
    this.slides.forEach((_, i) => {
      this.dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  activateDot(slideIndex) {
    this.dotContainer
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    this.dotContainer
      .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
      .classList.add("dots__dot--active");
  }

  goToSlide(slideIndex) {
    this.slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`)
    );
  }

  nextSlide() {
    this.curSlide = this.curSlide === this.maxSlide ? 0 : this.curSlide + 1;
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }

  prevSlide() {
    this.curSlide = this.curSlide === 0 ? this.maxSlide : this.curSlide - 1;
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }
}

// Instantiate sliders
const servicesSlider = new Slider(
  ".services-slide",
  ".servicesSlider__btn--left",
  ".servicesSlider__btn--right",
  ".services-dots"
);

const testimonialSlider = new Slider(
  ".testimonial-slide",
  ".testimonialSlider__btn--left",
  ".testimonialSlider__btn--right",
  ".testimonial-dots"
);
