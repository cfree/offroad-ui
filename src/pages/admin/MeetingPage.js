import React from 'react';

import Quorum from '../../components/admin/Quorum';
import Gate from '../../components/login/Gate';
import { isAtLeastBoardMember, isNotLocked } from '../../lib/utils';

const AdminMeetingPage = () => {
  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isNotLocked}
      redirect="/admin-quorum"
    >
      <Quorum />
    </Gate>
  );
};

export default AdminMeetingPage;
