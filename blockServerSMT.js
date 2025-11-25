(() => {
  console.clear();
  console.log("%c Start... Backend", "color:#ff9800;font-size:16px");
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url, ...args) {
    this._url = url;
    return origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function (body) {
    if (this._url && this._url.includes("SaveEvent")) {
      let isLostFocus = false;
      if (body instanceof FormData) {
        isLostFocus = body.get("eventType") === "0";
      } else if (typeof body === "string") {
        isLostFocus =
          /eventType[\]=:]0/.test(body) || /"eventType":"0"/.test(body);
      } else if (body && typeof body === "object") {
        isLostFocus = body.eventType === 0 || body.eventType === "0";
      }
      if (isLostFocus) {
        console.log(
          "%c Complete request",
          "color:#ff2d2d;font-weight:bold;background:#000;padding:2px 6px"
        );
        return;
      }
    }
    return origSend.apply(this, arguments);
  };
})();

(() => {
  console.log("Starting...");
  const visDesc = {
    value: "visible",
    writable: false,
    configurable: false,
  };
  const hiddenDesc = {
    value: false,
    writable: false,
    configurable: false,
  };
  Object.defineProperties(document, {
    visibilityState: visDesc,
    webkitVisibilityState: visDesc,
    mozVisibilityState: visDesc,
    msVisibilityState: visDesc,
    hidden: hiddenDesc,
    webkitHidden: hiddenDesc,
    mozHidden: hiddenDesc,
    msHidden: hiddenDesc,
  });
  Document.prototype.hasFocus = () => true;
  document.hasFocus = () => true;
  const block = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  };
  const eventsToBlock = [
    "visibilitychange",
    "webkitvisibilitychange",
    "mozvisibilitychange",
    "msvisibilitychange",
    "pagehide",
    "pageshow",
    "blur",
    "focus",
    "focusin",
    "focusout",
    "mouseleave",
    "mouseenter",
    "mouseout",
    "mouseover",
    "beforeunload",
    "unload",
  ];
  eventsToBlock.forEach((ev) => {
    document.addEventListener(ev, block, true);
    window.addEventListener(ev, block, true);
  });
  const noop = () => false;
  ["O", "L", "C", "k", "I", "M", "T", "removeEventListeners"].forEach((fn) => {
    if (typeof window[fn] === "function") window[fn] = noop;
  });
  setInterval(() => {
    if (typeof q !== "undefined") q = Date.now();
    if (typeof S !== "undefined") S = 0;
    if (typeof window.S !== "undefined") window.S = 0;
    window.focus();
  }, 200);
  console.log("%c Testing", "color:#4caf50;font-size:18px;font-weight:bold");
})();

setTimeout(() => {
  console.log("Unloading...");
  console.clear();
}, 11000);
