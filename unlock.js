(() => {
  const originalVisibilityState = Object.getOwnPropertyDescriptor(
    Document.prototype,
    "visibilityState"
  ).get;
  const originalHidden = Object.getOwnPropertyDescriptor(
    Document.prototype,
    "hidden"
  ).get;
  const originalHasFocus = Document.prototype.hasFocus;
  Object.defineProperty(document, "visibilityState", {
    get: () => "visible",
    configurable: true,
  });
  Object.defineProperty(document, "hidden", {
    get: () => false,
    configurable: true,
  });
  Document.prototype.hasFocus = () => true;
  Object.defineProperty(document, "hasFocus", {
    get: () => true,
    configurable: true,
  });
  [
    "focus",
    "blur",
    "focusin",
    "focusout",
    "visibilitychange",
    "webkitvisibilitychange",
  ].forEach((ev) => {
    const blockEvent = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    window.addEventListener(ev, blockEvent, { capture: true });
    document.addEventListener(ev, blockEvent, { capture: true });
  });
  Object.defineProperty(document, "activeElement", {
    get: () => document.body || document.documentElement,
    configurable: true,
  });
  const fakeFocusLoop = setInterval(() => {
    if (originalHasFocus.call(document) !== true) {
      document.body.focus();
      document.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    }
    if (originalVisibilityState.call(document) !== "visible") {
      document.dispatchEvent(new Event("visibilitychange", { bubbles: true }));
    }
  }, 5000);
  document.onfocus = document.onblur = document.onvisibilitychange = null;
  window.onfocus = window.onblur = window.onvisibilitychange = null;
  window.fakeFocusCleanup = () => {
    clearInterval(fakeFocusLoop);
    Object.defineProperty(document, "visibilityState", {
      get: originalVisibilityState,
    });
    Object.defineProperty(document, "hidden", { get: originalHidden });
    Document.prototype.hasFocus = originalHasFocus;
  };
  console.clear();
})();
