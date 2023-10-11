const DISCOUNT_CODE = 'NEWLULLA10'; // TODO: Populate with liquid
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

// Are there any visible elements in the discount badge list?
if (discountList && !discountList.querySelector('.discount--badge-cart')) {
  discountAdvertisement.classList.remove('hidden');
  discountAdvertisement.addEventListener('click', () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(['openForm', 'RhfhNc']);
  });
}

// To prevent flashing of the discount badge list
discountList.classList.remove('hidden');
