import React from 'react';
import { Mutation } from '@apollo/react-components';
import { Link, useHistory } from 'react-router-dom';

import { LOGOUT_MUTATION } from './logout.graphql';

const Logout = () => {
  let history = useHistory();

  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      refetchQueries={['CURRENT_USER_QUERY']}
    >
      {(logout) => (
        <Link
          to="/logout"
          onClick={(e) => {
            e.preventDefault();
            logout();

            history.push('/');
          }}
        >
          Logout
        </Link>
      )}
    </Mutation>
  );
};

export default Logout;
