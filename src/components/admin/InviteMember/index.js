import React from 'react';

import RegisterForm from '../../login/RegisterForm';

const InviteMember = () => {
  return (
    <div>
      <h2>Invite A New Member</h2>

      <RegisterForm source="admin" />
    </div>
  );
};

export default InviteMember;
