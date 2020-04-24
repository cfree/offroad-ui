import React from 'react';

import './loading.module.scss';

const Loading = ({ loading }) => {
  return (
    loading && (
      <img className="loading" src="/img/loading.png" alt="Loading..." />
    )
  );
};

export default Loading;
