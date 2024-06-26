const DISCOUNT_CODE = KLAVIYO_DISCOUNT_CODE;
const POPUP_ID = KLAVIYO_POPUP_ID;
const KLAVIYO_SESSION_KEY = 'klaviyoFormCompleted';
const discountAdvertisement = document.querySelector('#discount--advertisement');
const discountList = document.querySelector('#discount-list');

function createTag() {
  const discountTitle = document.querySelector('#discount-title');
  const discountAmount = document.querySelector('#discount-amount');
  const productPrice = document.querySelector('[data-product-price]').dataset.productPrice;

  if (!discountList || !discountTitle || !discountAmount || !productPrice || !discountAdvertisement) {
    return;
  }

  const discountPercentage = parseInt(DISCOUNT_CODE.slice(-2)) / 100;

  const discount = (parseInt(productPrice) * discountPercentage) / 100;

  const discountText = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(discount);

  discountTitle.innerText = DISCOUNT_CODE;
  discountAmount.innerText = discountText;
  discountAdvertisement.classList.add('hidden');
  discountList.querySelector('#discount--badge').classList.remove('hidden');
}

function addFormCompletionToSessionStorage() {
  if (!window.sessionStorage.getItem(KLAVIYO_SESSION_KEY)) {
    window.sessionStorage.setItem(KLAVIYO_SESSION_KEY, 'true');
  }
}

window.addEventListener('klaviyoForms', function (e) {
  if (e.detail.type == 'open' || e.detail.type == 'embedOpen') {
    gtag('event', 'form_open', { form: 'Klaviyo form', form_id: e.detail.formId });
  }

  if (e.detail.type == 'submit') {
    gtag('event', 'form_submit', { form: 'Klaviyo form', form_id: e.detail.formId });
    addFormCompletionToSessionStorage();
    createTag();
  }

  if (e.detail.type == 'stepSubmit') {
    gtag('event', 'form_step_submit', { form: 'Klaviyo form', step_name: e.detail.metaData.$step_name });
  }

  if (e.detail.type == 'redirectedToUrl') {
    gtag('event', 'form_url_redirect', { form: 'Klaviyo form', form_id: e.detail.formId });
  }

  if (e.detail.type == 'close') {
    gtag('event', 'form_close', { form: 'Klaviyo form', form_id: e.detail.formId });
  }
});

// Are there any cart discounts applied and has the form has not been filled before?
if (
  discountList &&
  !discountList.querySelector('.discount--badge-cart') &&
  !window.sessionStorage.getItem(KLAVIYO_SESSION_KEY)
) {
  discountAdvertisement.classList.remove('hidden');
  discountAdvertisement.addEventListener('click', () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(['openForm', KLAVIYO_POPUP_ID]);
  });
}

// To prevent flashing of the discount badge list
if (discountList && discountList.querySelectorAll('li:not(.hidden)').length > 0) {
  discountList.classList.remove('hidden');
}
