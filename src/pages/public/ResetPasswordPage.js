import React from 'react';

import Page from '../../components/layout/Page';
import ForgotPassword from '../../components/login/ForgotPassword';
import ResetPassword from '../../components/login/ResetPassword';
import { useQueryParams } from '../../hooks/useQueryParams';

const ResetPage = () => {
  const query = useQueryParams();
  const { token } = query;

  return (
    <Page>{token ? <ResetPassword token={token} /> : <ForgotPassword />}</Page>
  );
};

export default ResetPage;
