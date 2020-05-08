import React from 'react';
import { Query } from '@apollo/react-components';
import { Link, Redirect } from 'react-router-dom';

import { CURRENT_USER_QUERY } from '../../hooks/useUser/useUser.graphql';

const Gate = ({
  roleCheck = (role) => role,
  statusCheck = (status) => status,
  typeCheck = (type) => type,
  redirect = '/',
  children,
}) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        // Logged out
        if (!data || !data.myself) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                search: redirect === '/' ? '' : `?redirect=${redirect}`,
              }}
            />
          );
        }

        const { role, accountStatus, accountType } = data.myself;

        const contactWebmasterMessage = (
          <>
            <Link to="/message?to=webmaster">Contact the webmaster</Link> for
            help
          </>
        );

        // Improper role
        if (roleCheck && !roleCheck(role)) {
          return <p>Your account is not authorized to view this content.</p>;
        }

        // Improper status
        if (statusCheck && !statusCheck(accountStatus)) {
          return (
            <p>
              Your account does not have the proper status to view this content.{' '}
              {contactWebmasterMessage}.
            </p>
          );
        }

        // Improper type
        if (typeCheck && !typeCheck(accountType)) {
          return (
            <p>
              You do not have the proper account type to view this content.{' '}
              {contactWebmasterMessage}.
            </p>
          );
        }

        return children;
      }}
    </Query>
  );
};

export default Gate;
