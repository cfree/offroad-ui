import React from 'react';
import cn from 'classnames';

import Meta from '../Meta';
import Header from '../Header';
import Footer from '../Footer';
import ErrorBoundary from '../../utility/ErrorBoundary';

import Styles from './eventPageLayout.module.scss';
import PageStyles from '../PageLayout/pageLayout.module.scss';

const EventPageLayout = ({ children }) => {
  const mainClasses = cn(PageStyles['container'], Styles['container']);

  return (
    <>
      <Meta />
      <div className={PageStyles['wrapper']}>
        <ErrorBoundary>
          <Header />
          <main className={mainClasses}>{children}</main>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
};

export default EventPageLayout;
