import React from 'react';

import MemberPermissions from '../../components/admin/Roles';
import Gate from '../../components/login/Gate';
import { isAdmin, isActive } from '../../lib/utils';

const AdminPermissionsPage = () => {
  return (
    <Gate
      roleCheck={isAdmin}
      statusCheck={isActive}
      redirect="/admin-permissions"
    >
      <MemberPermissions />
    </Gate>
  );
};

export default AdminPermissionsPage;
