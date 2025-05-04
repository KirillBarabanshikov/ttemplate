const INACTIVITY_TIMEOUT = window.INACTIVITY_TIMEOUT * 1000;

let inactivityTimer;

function onInactivity() {
  history.pushState(null, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(onInactivity, INACTIVITY_TIMEOUT);
}

const activityEvents = [
  'mousemove',
  'mousedown',
  'keypress',
  'touchstart',
  'scroll',
];

activityEvents.forEach((eventName) => {
  window.addEventListener(eventName, resetInactivityTimer, true);
});

resetInactivityTimer();
