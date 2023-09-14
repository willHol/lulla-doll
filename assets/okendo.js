const OKENDO_DEFAULT_RATING = 4.9;
const OKENDO_DEFAULT_PERCENTAGE = ((OKENDO_DEFAULT_RATING / 5) * 100).toFixed();

const OKENDO_METAFIELD_SELECTOR = '[data-oke-metafield-data]';
const OKENDO_STAR_RATING_FOREGROUND_SELECTOR = '.oke-stars-foreground';
const OKENDO_STAR_RATING_TEXT_SELECTOR = '.oke-sr-rating';
const OKENDO_STAR_RATING_CONTAINER_SELECTOR = '[data-oke-star-rating]';

function parseOkendoMetafieldData(root) {
  return waitForElementToExist(OKENDO_METAFIELD_SELECTOR, root).then((element) => {
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
    parseOkendoMetafieldData(element).then((okendoMetadata) => {
      if (okendoMetadata.averageRating == '0') {
        waitForElementToExist(OKENDO_STAR_RATING_FOREGROUND_SELECTOR, element).then(
          (element) => (element.style.width = `${OKENDO_DEFAULT_PERCENTAGE}%`)
        );
        waitForElementToExist(OKENDO_STAR_RATING_TEXT_SELECTOR, element).then(
          (element) => (element.textContent = ` ${OKENDO_DEFAULT_RATING} `)
        );

        element.style.visibility = 'visible';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeOkendoRatingStars);
