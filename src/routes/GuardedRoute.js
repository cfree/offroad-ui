import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

import { CURRENT_USER_QUERY } from '../hooks/useUser/useUser.graphql';
import Spinner from '../components/utility/Spinner';

const Unauthorized = () => {
  return <Redirect to="/unauthorized" />;
};

const GuardedRoute = ({
  path,
  component: Component,
  roleCheck = () => true,
  statusCheck = () => true,
  typeCheck = () => true,
  fallback: Fallback = Unauthorized,
  ...rest
}) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Route
      path={path}
      render={(props) => {
        // Authenticate
        if (!get(data, 'myself.username')) {
          return <Redirect to="/login" />;
        }

        const { myself } = data;
        const { role, accountStatus, accountType } = myself;

        // Authorize
        return roleCheck(role) &&
          statusCheck(accountStatus) &&
          typeCheck(accountType) ? (
          <Component {...props} />
        ) : (
          <Fallback />
        );
      }}
      {...rest}
    />
  );
};

export default GuardedRoute;
