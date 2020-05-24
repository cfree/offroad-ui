import React from 'react';

import PageLayout from '../../components/layout/PageLayout';
import NewAccountsList from '../../components/admin/NewAccountsList';

const AdminTrailsPage = ({ query }) => {
  return (
    <PageLayout>
      <NewAccountsList />
    </PageLayout>
  );
};

export default AdminTrailsPage;
