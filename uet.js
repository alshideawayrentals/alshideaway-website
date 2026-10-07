/* Microsoft Advertising tracking for staytexashillcountry.com
 *
 * 1. Loads the Microsoft UET tag (tag ID 355013009) so Microsoft Ads can see
 *    visits that came from its ads.
 * 2. Reports a "booking_click" event whenever a visitor clicks any link that
 *    goes to the ResNexus booking engine (Check Availability, Book Cabin, etc.).
 * 3. Reports a "phone_click" event when a visitor taps the main phone number.
 *
 * Loaded on every page with:  <script async src="/uet.js"></script>
 * New pages need that line in their <head> (it sits right after the Google Tag
 * Manager block) or Microsoft Ads will not see them.
 */
(function (w, d, t, r, u) {
  var f, n, i;
  w[u] = w[u] || [];
  f = function () {
    var o = { ti: "355013009", enableAutoSpaTracking: true };
    o.q = w[u];
    w[u] = new UET(o);
    w[u].push("pageLoad");
  };
  n = d.createElement(t);
  n.src = r;
  n.async = 1;
  n.onload = n.onreadystatechange = function () {
    var s = this.readyState;
    if (s && s !== "loaded" && s !== "complete") return;
    f();
    n.onload = n.onreadystatechange = null;
  };
  i = d.getElementsByTagName(t)[0];
  i.parentNode.insertBefore(n, i);
})(window, document, "script", "https://bat.bing.com/bat.js", "uetq");

(function () {
  var MAIN_PHONE = "8305103331";

  function send(action, category, label) {
    window.uetq = window.uetq || [];
    window.uetq.push("event", action, {
      event_category: category,
      event_label: label
    });
  }

  function onClick(e) {
    var el = e.target;
    var a = el && el.closest ? el.closest("a[href]") : null;
    if (!a) return;

    var host = (a.hostname || "").toLowerCase();
    if (host === "resnexus.com" || host.slice(-13) === ".resnexus.com") {
      var label = (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
      send("booking_click", "booking", label || "booking link");
      return;
    }

    var href = a.getAttribute("href") || "";
    if (href.toLowerCase().indexOf("tel:") === 0 &&
        href.replace(/\D/g, "").slice(-10) === MAIN_PHONE) {
      send("phone_click", "contact", "main phone");
    }
  }

  // "click" covers normal and ctrl/cmd clicks; "auxclick" covers middle-click
  // (open in new tab), which browsers do not report as a click.
  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", function (e) {
    if (e.button === 1) onClick(e);
  }, true);
})();
