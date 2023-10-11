function autoScrollPage() {
  let params = new URLSearchParams(window.location.search);

  let scrollTarget = decodeURIComponent(params.get('scroll-to'));

  smoothScrollTo(scrollTarget);
}

function supportsReadyStateChange() {
  var testEl = document.createElement('script');
  return 'onreadystatechange' in testEl;
}

if (supportsReadyStateChange()) {
  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      autoScrollPage();
    }
  };
} else {
  window.addEventListener('load', autoScrollPage);
}
