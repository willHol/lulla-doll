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
        loop: true,
        slidesPerView: 1.1,
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
          clickable: true,
        },
      });
    });
  }
}

customElements.define('quote-slider', QuoteSlider);
