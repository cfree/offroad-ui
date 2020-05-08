import React from 'react';
import { useParams } from 'react-router-dom';

import EditProfile from '../../components/user/EditProfile';
import PageLayout from '../../components/layout/PageLayout';

const ProfileEditPage = () => {
  const { member } = useParams();

  return (
    <PageLayout>
      <EditProfile member={member} />
    </PageLayout>
  );
};

export default ProfileEditPage;
