import React from 'react';
import Roles from '../../components/admin/Roles';
import Gate from '../../components/login/Gate';
import { isAtLeastBoardMember, isActive } from '../../lib/utils';
import AdminProfileForm from '../../components/user/AdminProfileForm';
import AdminOverview from '../../components/user/AdminOverview';
import ProfileForm from '../../components/user/ProfileForm';
import MembershipLog from '../../components/user/MembershipLog';
// import ManualLogEntry from '../components/user/ManualLogEntry';

const AdminProfilePage = ({ query }) => {
  const { user = 'self' } = query;

  return (
    <Gate
      roleCheck={isAtLeastBoardMember}
      statusCheck={isActive}
      redirect="/admin-profile"
    >
      <>
        <AdminOverview member={user} />

        {/* <div>
          <h2>Offices and Titles History</h2>
          Manual Log Entry: <input type="text" />
          (Start Date, End Date, Title/Office, User)
        </div> */}

        {/* <ManualLogEntry member={user} /> */}

        <MembershipLog member={user} />

        <AdminProfileForm member={user} />

        <ProfileForm member={user} isAdmin={true} />
      </>
    </Gate>
  );
};

export default AdminProfilePage;
