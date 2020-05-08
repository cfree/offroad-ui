import React from 'react';
import cn from 'classnames';

import Styles from './loading.module.scss';

const Loading = ({ loading, size = 'sm' }) => {
  const classNames = cn(Styles['loading'], {
    [Styles['sm']]: size === 'sm',
    [Styles['md']]: size === 'md',
  });

  return (
    loading && (
      <img className={classNames} src="/img/loading.png" alt="Loading..." />
    )
  );
};

export default Loading;
