// Runs before first paint (blocking, tiny): marks that scripts run, and reads the visitor's motion preference so
// no animation starts and is then cancelled. An external file rather than an inline script, so the
// Content-Security-Policy needs no inline exception.
(function () {
  var root = document.documentElement;
  var reduce = false;
  try {
    reduce = localStorage.getItem('digits:reduce-motion') === 'true';
  } catch (e) {
    reduce = false;
  }
  root.dataset.js = '';
  root.dataset.motion =
    reduce || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'auto';
})();

// A page-to-page transition can be skipped by the browser (a background tab, a resize mid-flight). That is not an
// error for this site: the navigation still happens, only without the cross-fade. Saying so keeps the console clean.
(function () {
  function quiet(event) {
    var transition = event.viewTransition;
    if (!transition) return;
    transition.ready.catch(function () {});
    transition.finished.catch(function () {});
  }
  window.addEventListener('pagereveal', quiet);
  window.addEventListener('pageswap', quiet);
})();
