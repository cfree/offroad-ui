import React from 'react';
import { useParams } from 'react-router-dom';

import EditProfile from '../../components/user/EditProfile';
import Page from '../../components/layout/Page';

const ProfileEditPage = () => {
  const { member } = useParams();

  return (
    <Page>
      <EditProfile member={member} />
    </Page>
  );
};

export default ProfileEditPage;
