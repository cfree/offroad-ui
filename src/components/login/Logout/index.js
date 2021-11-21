import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';

import { LOGOUT_MUTATION } from './logout.graphql';

const Logout = () => {
  const client = useApolloClient();
  let history = useHistory();
  const [logout, { data }] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    const doEffect = async () => {
      await client.clearStore();
      history.push('/login');
    };

    if (data && data.logout.message) {
      doEffect();
    }
  }, [data, history, client]);

  return (
    <Link
      to="/logout"
      onClick={async (e) => {
        e.preventDefault();
        await logout();
      }}
    >
      Logout
    </Link>
  );
};

export default Logout;
