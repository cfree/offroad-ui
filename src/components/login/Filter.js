import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../../hooks/useUser/useUser.graphql';

const Filter = ({
  children,
  roleCheck = (role) => true,
  statusCheck = (status) => true,
  typeCheck = (type) => true,
}) => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);

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
};

export default Filter;
