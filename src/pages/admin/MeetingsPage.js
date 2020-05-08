import React from 'react';

import MeetingsList from '../../components/admin/MeetingsList';
import PageLayout from '../../components/layout/PageLayout';

const AdminMeetingPage = () => {
  return (
    <PageLayout>
      <MeetingsList />
    </PageLayout>
  );
};

export default AdminMeetingPage;
