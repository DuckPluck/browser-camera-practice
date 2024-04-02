import throttle from 'lodash.throttle';

import detectMobile from './detect-mobile';

const callbackList: Array<Function> = [];

const resizeIterateCallbacks = (isTriggered: boolean): void => {
  callbackList.forEach((callback) => {
    if (typeof callback === 'function') {
      callback(isTriggered);
    }
  });
};

const isMobile = detectMobile.isMobile();
let windowLastWidth = screen.width;

const resizeHandle = throttle((isTriggered) => {
  if (isMobile) {
    if (windowLastWidth === screen.width) {
      // Avoid causing resize events on mobile browsers when scrolling,
      // as it alters the viewport height
      return;
    }

    windowLastWidth = screen.width;
  }

  resizeIterateCallbacks(isTriggered);
}, 256);

const windowResize = {
  addListener: (callback: Function) => {
    callbackList.push(callback);
  },
  removeListener: (callback: Function) => {
    const callbackIndex = callbackList.indexOf(callback);
    delete callbackList[callbackIndex];
  },
  trigger: () => resizeHandle(true),
};

window.addEventListener('resize', () => resizeHandle(false), false);

window.addEventListener('orientationchange', () => {
  windowLastWidth = 0;
  resizeIterateCallbacks(false);
}, false);

export default windowResize;
