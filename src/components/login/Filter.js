import React from 'react';
import { Query } from '@apollo/react-components';

import { CURRENT_USER_QUERY } from '../../hooks/useUser/useUser.graphql';

const Filter = ({
  children,
  roleCheck = (role) => role,
  statusCheck = (status) => status,
  typeCheck = (type) => type,
}) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, error, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        // Improper role and status
        if (
          data &&
          data.myself &&
          roleCheck(data.myself.role) &&
          statusCheck(data.myself.accountStatus) &&
          typeCheck(data.myself.accountType)
        ) {
          return children;
        }

        return null;
      }}
    </Query>
  );
};

export default Filter;
