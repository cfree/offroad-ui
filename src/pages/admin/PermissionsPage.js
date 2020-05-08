import React from 'react';

import MemberPermissions from '../../components/admin/Roles';
import PageLayout from '../../components/layout/PageLayout';

const AdminPermissionsPage = () => {
  return (
    <PageLayout>
      <MemberPermissions />
    </PageLayout>
  );
};

export default AdminPermissionsPage;
