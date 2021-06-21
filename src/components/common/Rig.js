import React from 'react';

import Image from './Image';
import { DEFAULT_RIG_SRC } from '../../lib/constants';

const Rig = ({ src, alt, fallback, ...props }) => {
  return <Image src={src} fallback={DEFAULT_RIG_SRC} alt={alt} {...props} />;
};

export default Rig;
