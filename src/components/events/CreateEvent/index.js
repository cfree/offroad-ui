import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import {
  SETUP_NEW_EVENT_QUERY,
  CREATE_EVENT_MUTATION,
} from './createEvent.graphql';
import { UPCOMING_EVENTS_QUERY } from '../EventList/eventList.graphql.js';

import EventForm from '../EventForm';
import ErrorMessage from '../../utility/ErrorMessage';
import { uploadImage } from '../../../lib/utils';

class CreateEvent extends Component {
  render() {
    return (
      <Query query={SETUP_NEW_EVENT_QUERY}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const todayStart = new Date();
          todayStart.setHours(10, 0, 0, 0);
          const todayEnd = new Date();
          todayEnd.setHours(15, 0, 0, 0);

          const hasRunLeaders =
            queryData.runLeaders && queryData.runLeaders.length > 0;

          const initialValues = {
            type: 'RUN',
            title: '',
            description: '',
            startDateTime: todayStart,
            endDateTime: todayEnd,
            address: '',
            trailDifficulty: 'UNKNOWN',
            trailNotes: '',
            rallyAddress: '',
            membersOnly: false,
            host: hasRunLeaders
              ? queryData.runLeaders[0].username
              : queryData.myself.username,
            trail: '0',
            image: null,
            newImage: null,
            maxAttendees: -1,
            maxRigs: -1,
          };

          return (
            <>
              <h3>Create New Event</h3>
              <Mutation
                mutation={CREATE_EVENT_MUTATION}
                refetchQueries={[
                  {
                    query: UPCOMING_EVENTS_QUERY,
                    variables: { page: 1 },
                  },
                ]}
              >
                {(
                  createEvent,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => {
                  const successMessage = get(
                    mutationData,
                    'createEvent.message',
                  );

                  return (
                    <>
                      <EventForm
                        initialValues={initialValues}
                        onSubmit={(values, setSubmitting) =>
                          this.handleSubmit(values, setSubmitting, createEvent)
                        }
                        runLeaders={
                          hasRunLeaders
                            ? queryData.runLeaders
                            : [queryData.myself]
                        }
                        trails={queryData.trails}
                        loading={mutationLoading}
                        error={mutationError}
                        submitLabel="Create Event"
                      />
                      {successMessage && (
                        <p>
                          {successMessage}.{' '}
                          <Link to="/events">View events</Link>.
                        </p>
                      )}
                    </>
                  );
                }}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }

  handleSubmit = async (
    { startDateTime, endDateTime, image, newImage, ...filteredValues },
    setSubmitting,
    createEvent,
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: startDateTime,
      endTime: endDateTime,
      featuredImage: image,
      newFeaturedImage: null,
    };

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, 'events');
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    createEvent({
      variables: eventValues,
    });

    setSubmitting(false);
  };
}

export default CreateEvent;
