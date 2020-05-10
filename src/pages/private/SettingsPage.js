import React from 'react';

import PageLayout from '../../components/layout/PageLayout';
import SettingsIndex from '../../components/user/SettingsIndex';

const SettingsPage = ({ query }) => {
  return (
    <PageLayout>
      <SettingsIndex />
    </PageLayout>
  );
};

export default SettingsPage;
