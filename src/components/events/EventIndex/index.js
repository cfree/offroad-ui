import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import RunEventDetails from '../RunEventDetails';
import NonRunEventDetails from '../NonRunEventDetails';
import ErrorMessage from '../../utility/ErrorMessage';

const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: ID!) {
    event: getEvent(eventId: $eventId) {
      id
      type
    }
  }
`;

const EventIndex = ({ id }) => {
  const { loading, error, data } = useQuery(EVENT_QUERY, {
    variables: { eventId: id },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { event } = data;

  return (
    <>
      {event.type === 'RUN' ? (
        <RunEventDetails eventId={event.id} />
      ) : (
        <NonRunEventDetails eventId={event.id} />
      )}
    </>
  );
};

export default EventIndex;
