import React from 'react';

import Styles from './loading.module.scss';

const Loading = ({ loading }) => {
  return (
    loading && (
      <img
        className={Styles['loading']}
        src="/img/loading.png"
        alt="Loading..."
      />
    )
  );
};

export default Loading;
