import React from 'react';

import MemberPermissions from '../../components/admin/Roles';
import Page from '../../components/layout/Page';

const AdminPermissionsPage = () => {
  return (
    <Page>
      <MemberPermissions />
    </Page>
  );
};

export default AdminPermissionsPage;
