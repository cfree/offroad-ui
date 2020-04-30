import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../Login';
import { useQueryParams } from '../../../hooks/useQueryParams';

import Styles from './loginIndex.module.scss';

const LoginIndex = () => {
  const query = useQueryParams();
  const { redirect } = query;

  return (
    <div className={Styles['login']}>
      <div className={Styles['login-box']}>
        <section>
          <img
            src="/img/logo.png"
            alt="4-Players Logo"
            width="90"
            className={Styles['logo']}
          />
          <p>
            You've reached the 4-Players of Colorado members' site. To continue,
            please log in with your account credentials.
          </p>
          <p>
            If you have not yet signed up, you must first{' '}
            <Link to="/register">register for an account</Link>. To learn more
            about the club, please{' '}
            <a href="https://4-playersofcolorado.org">visit our public site</a>.
            Thanks for visiting!
          </p>
        </section>
        <section>
          <Login redirect={redirect} />

          {/* <Socials /> */}
        </section>
      </div>
    </div>
  );
};

export default LoginIndex;
