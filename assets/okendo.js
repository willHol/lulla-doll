const OKENDO_DEFAULT_RATING = 4.9;
const OKENDO_DEFAULT_PERCENTAGE = ((OKENDO_DEFAULT_RATING / 5) * 100).toFixed();

const OKENDO_METAFIELD_SELECTOR = '[data-oke-metafield-data]';
const OKENDO_STAR_RATING_FOREGROUND_SELECTOR = '.oke-stars-foreground';
const OKENDO_STAR_RATING_TEXT_SELECTOR = '.oke-sr-rating';
const OKENDO_STAR_RATING_CONTAINER_SELECTOR = '[data-oke-star-rating]';

function parseOkendoMetafieldData() {
  return waitForElementToExist(OKENDO_METAFIELD_SELECTOR).then((element) => {
    try {
      return JSON.parse(element.innerHTML);
    } catch (e) {
      console.error('Error parsing Okendo metadata', e);
    }

    return {};
  });
}

function initializeOkendoRatingStars() {
  onElementAppear(OKENDO_STAR_RATING_CONTAINER_SELECTOR, (element) => {
    var okendoMetadata = {};
    try {
      okendoMetadata = JSON.parse(element.querySelector(OKENDO_METAFIELD_SELECTOR).innerHTML);
    } catch (e) {
      console.error('Error parsing Okendo metadata', e);
      return;
    }

    if (okendoMetadata.averageRating == '0') {
      element.querySelector(OKENDO_STAR_RATING_FOREGROUND_SELECTOR).style.width = `${OKENDO_DEFAULT_PERCENTAGE}%`;
      element.querySelector(OKENDO_STAR_RATING_TEXT_SELECTOR).textContent = ` ${OKENDO_DEFAULT_RATING} `;
      element.style.visibility = 'visible';
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeOkendoRatingStars);
