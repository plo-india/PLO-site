/* The old site used to load this file. Browsers can still have an old page saved for a few minutes after
   the switch to the new site; when one of those loads this file, reload the same address fresh (the
   query string skips the saved copy), which now serves the new site. */
(function () {
  if (/[?&]fresh=/.test(location.search)) return; // already reloaded once; never loop
  var sep = location.search ? "&" : "?";
  location.replace(location.pathname + location.search + sep + "fresh=" + Date.now() + location.hash);
})();
