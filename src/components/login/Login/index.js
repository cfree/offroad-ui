import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useHistory, useLocation, Link } from 'react-router-dom';

import { LOGIN_MUTATION } from './login.graphql';
// Refetch
import { CURRENT_USER_QUERY } from '../../../hooks/useUser/useUser.graphql';

import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import Button from '../../common/Button';

import Styles from './login.module.scss';

const Login = () => {
  const client = useApolloClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION);
  const { from } = location.state || { from: '/' };

  useEffect(() => {
    if (data && data.login.message) {
      history.push(from);
    }
  }, [data, history, from]);

  return (
    <form
      className={Styles['form']}
      onSubmit={async (e) => {
        e.preventDefault();
        await client.clearStore();
        await login({
          variables: { username, password },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
          awaitRefetchQueries: true,
        });
      }}
    >
      <h3>Login</h3>
      <ErrorMessage error={error} />
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className={Styles['fieldset']}
      >
        <label htmlFor="username">
          <input
            className={Styles['field']}
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
            className={Styles['field']}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <footer>
          <span>
            <Button ghost type="submit">
              Login
            </Button>
            <Loading loading={loading} />
          </span>
          <Link
            className={Styles['forgot-password-link']}
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </footer>
      </fieldset>
    </form>
  );
};

export default Login;
