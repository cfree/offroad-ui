import React from 'react';
import { useParams } from 'react-router-dom';

import EventPageLayout from '../../components/layout/EventPageLayout';
import EventIndex from '../../components/events/EventIndex';

const EventPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <EventPageLayout>
      <EventIndex id={id} />
    </EventPageLayout>
  );
};

export default EventPage;
