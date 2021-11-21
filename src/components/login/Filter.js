import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from '../../hooks/useUser/useUser.graphql';

const Filter = ({
  children,
  roleCheck,
  statusCheck,
  typeCheck,
  selfCheck = '',
  onlySelfCheck = '',
}) => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  let checks = [];

  const validateChecks = () => {
    return checks.length > 0 && checks.every((c) => c === true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Data unavailable</p>;
  }

  if (roleCheck && typeof roleCheck === 'function') {
    checks = [...checks, roleCheck(data.myself.role)];
  }

  if (statusCheck && typeof statusCheck === 'function') {
    checks = [...checks, statusCheck(data.myself.accountStatus)];
  }

  if (typeCheck && typeof typeCheck === 'function') {
    checks = [...checks, typeCheck(data.myself.accountType)];
  }

  // Limit to only self
  if (!selfCheck && onlySelfCheck && onlySelfCheck === data.myself.username) {
    return children;
  }

  // Limit to role/status/type check OR self
  if (
    !onlySelfCheck &&
    selfCheck &&
    (selfCheck === data.myself.username || validateChecks())
  ) {
    return children;
  }

  // Limit to role/status/type check
  if (!onlySelfCheck && !selfCheck && validateChecks()) {
    return children;
  }

  return null;
};

export default Filter;
