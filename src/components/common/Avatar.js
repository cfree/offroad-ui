import React from 'react';

import Image from './Image';
import { DEFAULT_AVATAR_SRC } from '../../lib/constants';

const Avatar = ({ src, alt, fallback, ...props }) => {
  return <Image src={src} fallback={DEFAULT_AVATAR_SRC} alt={alt} {...props} />;
};

export default Avatar;
