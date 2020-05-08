import React from 'react';

import PageLayout from '../../components/layout/PageLayout';
import TrailsList from '../../components/trails/TrailsList';

const AdminTrailsPage = ({ query }) => {
  return (
    <PageLayout>
      <TrailsList />
    </PageLayout>
  );
};

export default AdminTrailsPage;
