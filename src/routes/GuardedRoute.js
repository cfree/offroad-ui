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
  selfCheck,
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
          const { location } = props;

          return (
            <Redirect
              push
              // to="/login"
              to={{
                pathname: '/login',
                search:
                  location.pathname === '/login' || location.pathname === '/'
                    ? ''
                    : `?redirect=${encodeURIComponent(
                        `${location.pathname}${location.search}`,
                      )}`,
              }}
            />
          );
        }

        // Authorize
        const { myself } = data;
        const { role, accountStatus, accountType } = myself;

        // Can view if self
        if (selfCheck) {
          return <Component {...props} />;
        }

        // Only view if checks pass
        return !selfCheck &&
          roleCheck(role) &&
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
