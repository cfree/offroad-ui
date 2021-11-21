import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';

import { LOGIN_MUTATION } from './login.graphql';
// Refetch
import { CURRENT_USER_QUERY } from '../../../hooks/useUser/useUser.graphql';

import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import Button from '../../common/Button';

import Styles from './login.module.scss';

const Login = ({ redirect = '' }) => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data && data.login.message) {
      history.push(decodeURIComponent(redirect));
    }
  }, [data, history, redirect]);

  return (
    <form
      className={Styles['form']}
      onSubmit={async (e) => {
        e.preventDefault();
        await client.clearStore();
        await login({
          variables: { email, password },
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
        <label htmlFor="email">
          <input
            className={Styles['field']}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
