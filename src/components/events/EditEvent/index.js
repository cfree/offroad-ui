import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import {
  SETUP_EXISTING_EVENT_QUERY,
  EDIT_EVENT_MUTATION,
} from './editEvent.graphql';
import { RUN_EVENT_QUERY } from '../RunEventDetails/runEventDetails.graphql';
import { NON_RUN_EVENT_QUERY } from '../NonRunEventDetails/nonRunEventDetails.graphql';
import { UPCOMING_EVENTS_QUERY } from '../EventList/eventList.graphql';

import EventForm from '../EventForm';
import ErrorMessage from '../../utility/ErrorMessage';
import { uploadImage } from '../../../lib/utils';
// import UploadImagePreview from '../../common/UploadImagePreview';

/**
 * Date round-trip
 *
 * 1. Type received from server: string
 * 2. Initial value: converted string to Date
 * 3.
 */

class EditEvent extends Component {
  render() {
    const { event: existingEventId } = this.props;

    return (
      <Query
        query={SETUP_EXISTING_EVENT_QUERY}
        variables={{ eventId: existingEventId }}
      >
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { event } = queryData;

          const initialValues = {
            id: existingEventId,
            type: event.type,
            startDateTime: new Date(event.startTime),
            endDateTime: new Date(event.endTime),
            title: event.title,
            description: event.description,
            address: event.address,
            trailDifficulty: event.trailDifficulty,
            trailNotes: event.trailNotes,
            rallyAddress: event.rallyAddress,
            membersOnly: event.membersOnly,
            host: event.host.username,
            trail: (event.trail && event.trail.id) || '0',
            image: get(event, 'featuredImage.url', null),
            imagePublicId: get(event, 'featuredImage.publicId', null),
            newImage: null,
            maxAttendees: event.maxAttendees,
            maxRigs: event.maxRigs,
          };

          return (
            <>
              <h3>Edit Event</h3>
              <Mutation
                mutation={EDIT_EVENT_MUTATION}
                refetchQueries={[
                  {
                    query:
                      event.type === 'RUN'
                        ? RUN_EVENT_QUERY
                        : NON_RUN_EVENT_QUERY,
                    variables: { eventId: existingEventId },
                  },
                ]}
              >
                {(
                  updateEvent,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => {
                  const successMessage = get(
                    mutationData,
                    'updateEvent.message',
                  );

                  return (
                    <>
                      <EventForm
                        initialValues={initialValues}
                        onSubmit={(values, setSubmitting) =>
                          this.handleSubmit(values, setSubmitting, updateEvent)
                        }
                        runLeaders={queryData.runLeaders}
                        trails={queryData.trails}
                        loading={mutationLoading}
                        error={mutationError}
                        submitLabel="Edit Event"
                      />
                      {successMessage && (
                        <p>
                          {successMessage}.{' '}
                          <Link to={`/event/${existingEventId}`}>
                            View event
                          </Link>
                          .
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
    updateEvent,
  ) => {
    let eventValues = {
      ...filteredValues,
      startTime: startDateTime,
      endTime: endDateTime,
      featuredImage: image,
      newFeaturedImage: null,
    };

    setSubmitting(true);

    if (newImage) {
      const cloudinaryResults = await uploadImage(newImage, 'events');
      eventValues.newFeaturedImage = cloudinaryResults;
    }

    updateEvent({
      variables: eventValues,
      refetchQueries: [
        {
          query: UPCOMING_EVENTS_QUERY,
          variables: { page: 1 },
        },
      ],
    });

    setSubmitting(false);
  };
}

export default EditEvent;
