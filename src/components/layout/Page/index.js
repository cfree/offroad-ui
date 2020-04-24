import React from 'react';

import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';
import ErrorBoundary from '../../utility/ErrorBoundary';

import Styles from './page.module.scss';

const Page = ({ children }) => (
  <>
    <Meta />
    <div className={Styles['wrapper']}>
      <ErrorBoundary>
        <Header />
        <main className={Styles['container']}>{children}</main>
      </ErrorBoundary>
    </div>
    <Footer />
  </>
);

export default Page;
