import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../../components/login/Login';
import { useQueryParams } from '../../hooks/useQueryParams';

const LoginPage = () => {
  const query = useQueryParams();
  const { redirect } = query;

  return (
    <div>
      <h2>Welcome!</h2>
      <p>
        You've reached the 4-Players of Colorado members' site. To continue,
        please log in with your account credentials.
      </p>
      <Login redirect={redirect} />
      <p>
        If you have not yet signed up, you must first{' '}
        <Link to="/signup">register for an account</Link>. To learn more about
        the club, please{' '}
        <a href="https://4-playersofcolorado.org">visit our public site</a>.
        Thanks for visiting!
      </p>
    </div>
  );
};

export default LoginPage;
