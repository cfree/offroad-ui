import React, { useState, useCallback } from 'react';

const Image = ({ src, alt, fallback, ...props }) => {
  const [source, setSource] = useState(src || fallback);
  const handleError = useCallback(() => {
    setSource(fallback);
  }, [setSource, fallback]);

  return <img src={source} alt={alt} {...props} onError={handleError} />;
};

export default Image;
