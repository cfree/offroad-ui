import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import toast from 'react-hot-toast';

import RunEventDetails from '../RunEventDetails';
import NonRunEventDetails from '../NonRunEventDetails';
// import ErrorMessage from '../../utility/ErrorMessage';

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
    toast.error(error.message.replace('GraphQL error: ', ''));
    console.error(error);
    // return <ErrorMessage error={error} />;
    return null;
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
