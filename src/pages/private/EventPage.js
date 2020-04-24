import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page';
import EventDetails from '../../components/events/EventDetails';

const EventPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <Page>
      <EventDetails id={id} />
    </Page>
  );
};

export default EventPage;
