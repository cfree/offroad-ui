import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../../hooks/useUser/useUser.graphql';

const Filter = ({
  children,
  roleCheck = (role) => true,
  statusCheck = (status) => true,
  typeCheck = (type) => true,
  selfCheck = '',
  onlySelfCheck = '',
}) => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Only self can see
  if (!selfCheck && onlySelfCheck && onlySelfCheck === data.myself.username) {
    return children;
  }

  // Proper role/status/type, self included
  if (
    !onlySelfCheck &&
    selfCheck &&
    (selfCheck === data.myself.username ||
      (data &&
        data.myself &&
        roleCheck(data.myself.role) &&
        statusCheck(data.myself.accountStatus) &&
        typeCheck(data.myself.accountType)))
  ) {
    return children;
  }

  // Proper role/status/type
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
