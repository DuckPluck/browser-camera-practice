import computedStyle from 'computed-style';
import React, { ReactElement, useEffect, useRef } from 'react';

import detectMobile from '../../../utils/detect-mobile';
import windowResize from '../../../utils/detect-window-resize';

import './ViewportHeight.scss';

interface Props {
  noMobile?: boolean;
  children: ReactElement;
}

export const ViewportHeight = (
  {
    children,
    noMobile,
  }: Props,
) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refresh = () => {
      if (!refContainer.current) {
        return;
      }

      const container = refContainer.current as HTMLDivElement;
      const containerChild = container.childNodes.item(0) as HTMLElement;

      if (!containerChild) {
        return;
      }

      if (noMobile && detectMobile.isMobile()) {
        windowResize.removeListener(refresh);

        container.style.height = 'auto';
        container.style.minHeight = '0';

        container.classList.remove('viewport-height_calculating');

        return;
      }

      let height;
      let maxHeight = computedStyle(container, 'max-height');

      const windowHeight = window.innerHeight;

      if (maxHeight && maxHeight.indexOf('px') !== -1) {
        maxHeight = parseInt(maxHeight.slice(0, -2), 10);

        if (windowHeight <= maxHeight) {
          maxHeight = 0;
        }
      } else {
        maxHeight = 0;
      }

      // Reset height
      container.style.height = '1px';
      container.style.minHeight = '1px';

      container.classList.add('viewport-height_calculating');

      containerChild.style.overflow = 'hidden';
      containerChild.style.height = 'auto';

      const containerHeight = container.clientHeight;
      const containerScrollHeight = container.scrollHeight;

      containerChild.style.overflow = '';
      containerChild.style.height = '';

      if (containerScrollHeight !== containerHeight) {
        if (maxHeight) {
          height = Math.max(containerScrollHeight, maxHeight);
        } else {
          height = Math.max(containerScrollHeight, windowHeight);
        }
      } else {
        height = windowHeight;
      }

      height = Math.max(height, windowHeight);

      if (height > windowHeight) {
        container.style.height = '';
        container.style.minHeight = `${height}px`;
      } else {
        container.style.height = `${height}px`;
        container.style.minHeight = '0px';
      }

      container.classList.remove('viewport-height_calculating');
    };

    windowResize.addListener(refresh);

    window.addEventListener('load', refresh);

    refresh();

    return () => {
      windowResize.removeListener(refresh);

      window.removeEventListener('load', refresh);
    };
  }, [noMobile]);

  return (
    <div className="viewport-height viewport-height_calculating" ref={refContainer}>
      {children}
    </div>
  );
};
