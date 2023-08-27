class QuoteSlider extends HTMLElement {
  constructor() {
    super();

    this.setupSwiper();
  }

  setupSwiper() {
    waitForProperty('Swiper', (success) => {
      if (!success) {
        throw new Error('Swiper was not loaded in time');
      }

      this.swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        spaceBetween: 10,
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 30,
        watchSlidesVisibility: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      });
    });
  }
}

customElements.define('quote-slider', QuoteSlider);
