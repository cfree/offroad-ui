import React from 'react';

import ProfileIndex from '../../components/admin/ProfileIndex';
import PageLayout from '../../components/layout/PageLayout';

const AdminProfilePage = ({ query }) => (
  <PageLayout>
    <ProfileIndex />
  </PageLayout>
);

export default AdminProfilePage;
