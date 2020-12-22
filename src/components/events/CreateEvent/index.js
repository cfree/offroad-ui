import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { format } from 'date-fns';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import {
  SETUP_NEW_EVENT_QUERY,
  CREATE_EVENT_MUTATION,
} from './createEvent.graphql';
// import { UPCOMING_EVENTS_QUERY } from '../EventList/eventList.graphql.js';

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

          const today = new Date();

          const initialValues = {
            type: 'RUN',
            title: '',
            description: '',
            startDate: format(today, 'yyyy-MM-dd'),
            startTime: '10:00',
            endDate: format(today, 'yyyy-MM-dd'),
            endTime: '15:00',
            address: '',
            trailDifficulty: 'UNKNOWN',
            trailNotes: '',
            rallyAddress: '',
            membersOnly: false,
            host: queryData.runLeaders[0].username,
            trail: '0',
            image: null,
            newImage: null,
            maxAttendees: -1,
            maxRigs: -1,
          };

          console.log('initialValue', format(today, 'yyyy-MM-dd'));

          return (
            <>
              <h3>Create New Event</h3>
              <Mutation
                mutation={CREATE_EVENT_MUTATION}
                refetchQueries={['UPCOMING_EVENTS_QUERY']}
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
                        runLeaders={queryData.runLeaders}
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
    { startDate, endDate, image, newImage, ...filteredValues },
    setSubmitting,
    createEvent,
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: new Date(`${startDate} ${filteredValues.startTime}`),
      endTime: new Date(`${endDate} ${filteredValues.endTime}`),
      featuredImage: image,
      newFeaturedImage: null,
    };

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, 'events');
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    console.log('eventValues', eventValues);

    createEvent({
      variables: eventValues,
    });

    setSubmitting(false);
  };
}

export default CreateEvent;
