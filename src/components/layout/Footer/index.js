import React from 'react';
import { format } from 'date-fns';

import { siteName } from '../../../lib/constants';

import Styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <img src="/img/logo.png" alt="Logo" />
      <p>{siteName}</p>
      <p>&copy; 1986 - {format(Date.now(), 'YYYY')}</p>

      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdnyq--8m4mnyQfbrJdQYLxb3sO3OIi4glRIBwdEqP-S2Dxww/viewform?usp=sf_link"
        title="Report bugs"
      >
        <span role="img" aria-label="Bug">
          🐛
        </span>
      </a>
    </footer>
  );
};

export default Footer;
