import React from 'react';
import { useParams } from 'react-router-dom';

import EditEvent from '../../components/events/EditEvent';
import Page from '../../components/layout/Page';

const EditEventPage = () => {
  const { id } = useParams();

  return (
    <Page>
      <EditEvent event={id} />
    </Page>
  );
};

export default EditEventPage;
