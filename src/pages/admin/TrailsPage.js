import React from 'react';

import Page from '../../components/layout/Page';
import TrailsList from '../../components/trails/TrailsList';

const AdminTrailsPage = ({ query }) => {
  return (
    <Page>
      <TrailsList />
    </Page>
  );
};

export default AdminTrailsPage;
