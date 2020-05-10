import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useUser from '../hooks/useUser';
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
  const { loading, data } = useUser();

  if (loading || !data) {
    return <Spinner />;
  }

  return (
    <Route
      path={path}
      render={(props) => {
        // Authenticate
        if (!data.myself) {
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
