import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, useLocation, Link } from 'react-router-dom';

import { LOGIN_MUTATION } from './login.graphql';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';

import Styles from './login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION);
  const { from } = location.state || { from: '/' };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const submit = async () => {
        await login({
          variables: { username, password },
          refetchQueries: ['CURRENT_USER_QUERY'],
        });
      };

      submit();
    },
    [username, password, login],
  );

  if (data && data.login) {
    return <Redirect to={from} />;
  }

  return (
    <form className={Styles['form']} onSubmit={handleSubmit}>
      <h3>Login</h3>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="username">
          <input
            type="username"
            id="username"
            name="username"
            placeholder="User"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Login</button>
        <Loading loading={loading} />
        <br />
        <Link to="/reset-password">Forgot password?</Link>
      </fieldset>
    </form>
  );
};

export default Login;
