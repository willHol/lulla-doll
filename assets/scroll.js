let SCROLL_BEHAVIOUR = 'auto';
let params = new URLSearchParams(window.location.search);
let scrollTarget = decodeURIComponent(params.get('scroll-to'));
let hasScrolled = false;

function autoScrollPage() {
  if (!hasScrolled) {
    smoothScrollTo(scrollTarget);
    hasScrolled = true;
  }
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

// Resetting scroll behaviour
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('intersecting');
      SCROLL_BEHAVIOUR = 'smooth';
      observer.unobserve(entry.target);
    }
  });
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(handleIntersection, options);

const target = document.querySelector(scrollTarget);

if (target) {
  observer.observe(target);
}

if (scrollTarget == 'null') {
  SCROLL_BEHAVIOUR = 'smooth';
}
