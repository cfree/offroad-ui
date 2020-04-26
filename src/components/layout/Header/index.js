import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav';
import { siteNameShort } from '../../../lib/constants';

import Styles from './header.module.scss';

const Header = () => (
  <header className={Styles['header']}>
    <div className={Styles['nav']}>
      <Link to="/">
        <img
          className={Styles['logo-image']}
          src="/img/logo.png"
          alt={siteNameShort}
          height="60"
        />
        <h1 className={Styles['list-heading']}>
          <span className={Styles['list-big-number']}>4</span>-Players
        </h1>
      </Link>
      <Nav />
    </div>
  </header>
);

export default Header;
