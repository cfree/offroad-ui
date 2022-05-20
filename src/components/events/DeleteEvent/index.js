import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../common/Button';
import { DELETE_EVENT_MUTATION } from './deleteEvent.graphql.js';
import {
  UPCOMING_EVENTS_QUERY,
  PAST_EVENTS_QUERY,
} from '../EventList/eventList.graphql';

const DeleteEvent = ({ id }) => {
  const history = useHistory();
  const [deleteEvent, { error, loading }] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [
      { query: UPCOMING_EVENTS_QUERY },
      { query: PAST_EVENTS_QUERY },
    ],
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEventDelete = useCallback(() => {
    async function asyncDelete() {
      if (window.confirm('Are you sure you want to delete this event?')) {
        try {
          const result = await deleteEvent();

          toast.success(result.data.deleteEvent.message);
          history.push('/events');
        } catch (e) {
          console.error(e);
        }
      }
    }

    asyncDelete();
  }, [deleteEvent, history]);

  return (
    <Button disabled={loading || error} onClick={handleEventDelete}>
      Delete
    </Button>
  );
};

export default DeleteEvent;
