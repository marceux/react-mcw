'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Function for emitting custom events
function emitEvent(el, evtType) {
  var evt = void 0;

  if (typeof window.CustomEvent === 'function') {
    evt = new window.CustomEvent(evtType, {
      detail: undefined,
      bubbles: false
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, false, false);
  }

  el.dispatchEvent(evt);
}

exports.default = emitEvent;