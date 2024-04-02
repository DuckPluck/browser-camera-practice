import classNames from 'classnames';
import React, { ReactNode } from 'react';

import './Container.scss';

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Container = (
  {
    children,
    className,
  }: Props,
) => {
  const containerClassName = classNames(
    'container',
    className,
  );

  return (
    <div className={containerClassName}>{children}</div>
  );
};
