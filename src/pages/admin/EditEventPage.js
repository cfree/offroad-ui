import React from 'react';

import EditEvent from '../../components/events/EditEvent';
import Page from '../../components/layout/Page';
import { useQueryParams } from '../../hooks/useQueryParams';

const EditEventPage = () => {
  const query = useQueryParams();
  const { id } = query;

  return (
    <Page>
      <EditEvent event={id} />
    </Page>
  );
};

export default EditEventPage;
