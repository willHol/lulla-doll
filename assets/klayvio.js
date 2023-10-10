const DISCOUNT_CODE = 'NEWLULLA10'; // TODO: Populate with liquid

onElementAppear('[aria-label="POPUP Form"] button', (element) => {
  if (!element.textContent.toLowerCase().includes('get')) {
    return;
  }

  element.addEventListener('click', () => {
    const discountList = document.querySelector('#discount-list');
    const discountTitle = document.querySelector('#discount-title');
    const discountAmount = document.querySelector('#discount-amount');
    const productPrice = document.querySelector('[data-product-price]').dataset.productPrice;

    const discountPercentage = parseInt(DISCOUNT_CODE.slice(-2)) / 100;

    const discount = (parseInt(productPrice) * discountPercentage) / 100;

    const discountText = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(discount);

    discountTitle.innerText = DISCOUNT_CODE;
    discountAmount.innerText = discountText;
    discountList.classList.remove('hidden');
  });
});
