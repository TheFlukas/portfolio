import Header from './header.js'

new Header()

document.addEventListener("DOMContentLoaded", () => {
  // MixItUp
  const mixer = mixitup(".directions__list");
  // Кнопки фильтра
  const filterBtns = document.querySelectorAll(".directions__filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // убираем активный класс у всех
      filterBtns.forEach((b) =>
        b.classList.remove("directions__filter-btn--active")
      );

      // добавляем активный класс текущей
      btn.classList.add("directions__filter-btn--active");
    });
  });

  // Слайдеры

  const swiper = new Swiper(".team__slider", {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".team__btn--next",
      prevEl: ".team__btn--prev",
    },

    // And if we need scrollbar
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
      },
      700: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
      1040: {
        allowTouchMove: false,
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".team__slider .swiper-pagination",
      clickable: true,
    },
  });

  const testimonialsSwiper = new Swiper(".testimonials__slider", {
    slidesPerView: 1,
    loop: true,

    navigation: {
      nextEl: ".testimonials__btn--next",
      prevEl: ".testimonials__btn--prev",
    },

    pagination: {
      el: ".testimonials__slider-wrapper .swiper-pagination",
      clickable: true,
    },
  });

  function initAccordion({ triggerSelector, activeClass, preventDefault = true }) {
  const triggers = document.querySelectorAll(triggerSelector);

  triggers.forEach(trigger => {
    trigger.addEventListener("click", e => {
      if (preventDefault) e.preventDefault();

      const isActive = trigger.classList.contains(activeClass);

      // закрываем все
      triggers.forEach(t =>
        t.classList.remove(activeClass)
      );

      // если был неактивен — открываем
      if (!isActive) {
        trigger.classList.add(activeClass);
      }
    });
  });
}

// аккордеон программы
initAccordion({
  triggerSelector: ".program__acc-link",
  activeClass: "program__acc-link--active"
});

// аккордеон футера
initAccordion({
  triggerSelector: ".footer__top-slide",
  activeClass: "footer__top-slide--active",
});

  // Fancybox
  Fancybox.bind("[data-fancybox]", {});

  // Копирование адреса
  document.querySelectorAll('.info__item-address').forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.textContent).then(() => {
        el.dataset.tooltip = 'Скопировано ✔';
        el.classList.add('copied');

        setTimeout(() => {
          el.dataset.tooltip = 'Скопировать';
          el.classList.remove('copied');
        }, 1500);
      });
    });
  });

});