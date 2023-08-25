const SLIDER_ACTIVATION_WIDTH = 768;

class AsSeenIn extends HTMLElement {
  constructor() {
    super();

    if (this.dataset['swiperEnabled']) {
      this.setupSwiper();
    }
  }

  setupSwiper() {
    waitForProperty('Swiper', (success) => {
      if (!success) {
        throw new Error('Swiper was not loaded in time');
      }

      if (window.innerWidth >= SLIDER_ACTIVATION_WIDTH) {
        return;
      }

      this.classList.add('slider-active');
      this.classList.add('swiper');

      this.swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true, // TODO: Make configurable

        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },

        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          480: {
            enabled: false,
          },
        },
      });
    });
  }
}

customElements.define('as-seen-in', AsSeenIn);
