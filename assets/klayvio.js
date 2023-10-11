const DISCOUNT_CODE = 'NEWLULLA10'; // TODO: Populate with liquid

function createTag() {
  const discountList = document.querySelector('#discount-list');
  const discountTitle = document.querySelector('#discount-title');
  const discountAmount = document.querySelector('#discount-amount');
  const productPrice = document.querySelector('[data-product-price]').dataset.productPrice;

  if (!discountList || !discountTitle || !discountAmount || !productPrice) {
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
  discountList.classList.remove('hidden');
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
