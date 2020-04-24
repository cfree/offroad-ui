import React from 'react';

import Page from '../../components/layout/Page';
import Profile from '../../components/user/Profile';
import { useQueryParams } from '../../hooks/useQueryParams';

const ProfilePage = () => {
  const query = useQueryParams();
  const { user } = query;

  return <Page>{query.user ? <Profile username={user} /> : <Profile />}</Page>;
};

export default ProfilePage;
