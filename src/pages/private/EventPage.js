import React from 'react';
import { useParams } from 'react-router-dom';

import EventPageLayout from '../../components/layout/EventPageLayout';
import EventDetails from '../../components/events/EventDetails';

const EventPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <EventPageLayout>
      <EventDetails id={id} />
    </EventPageLayout>
  );
};

export default EventPage;
