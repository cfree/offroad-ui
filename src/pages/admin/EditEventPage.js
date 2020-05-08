import React from 'react';
import { useParams } from 'react-router-dom';

import EditEvent from '../../components/events/EditEvent';
import PageLayout from '../../components/layout/PageLayout';

const EditEventPage = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <EditEvent event={id} />
    </PageLayout>
  );
};

export default EditEventPage;
