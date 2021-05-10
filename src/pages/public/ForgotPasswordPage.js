import React from 'react';

import PageLayout from '../../components/layout/PageLayout';
import ForgotPassword from '../../components/login/ForgotPassword';
import ResetPassword from '../../components/login/ResetPassword';
import { useQueryParams } from '../../hooks/useQueryParams';

const ResetPage = () => {
  const query = useQueryParams();
  const { token } = query;

  return (
    <PageLayout>
      {token ? <ResetPassword token={token} /> : <ForgotPassword />}
    </PageLayout>
  );
};

export default ResetPage;
