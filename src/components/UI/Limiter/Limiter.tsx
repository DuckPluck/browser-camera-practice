import classNames from 'classnames';
import React, { ReactNode } from 'react';

import './Limiter.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Limiter = (
  {
    children,
    className,
  }: Props,
) => {
  const limiterClassName = classNames(
    'limiter',
    className,
  );

  return (
    <div className={limiterClassName}>{children}</div>
  );
};
