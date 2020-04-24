import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import { siteName } from '../../../lib/constants';

import Styles from './header.module.scss';

const Header = () => (
  <header className={Styles['header']}>
    <div className={Styles['nav']}>
      <Link to="/">
        <img
          className={Styles['logo-image']}
          src="/img/logo.png"
          alt={siteName}
          height="60"
        />
        {/* <h1>{siteNameShort}</h1> */}
      </Link>
      <Nav />
    </div>
  </header>
);

export default Header;
