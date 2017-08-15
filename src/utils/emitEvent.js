// Function for emitting custom events
function emitEvent(el, evtType) {
  let evt;

  if (typeof window.CustomEvent === 'function') {
    evt = new window.CustomEvent(evtType, {
      detail: undefined,
      bubbles: false,
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, false, false);
  }

  el.dispatchEvent(evt);
}

export default emitEvent;
