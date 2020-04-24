import React, { useState, useCallback } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
// import parse from 'html-react-parser';
import { format } from 'date-fns';

import { RSVP_MUTATION } from '../../events/Rsvp/rsvp.graphql';
import { NEXT_EVENT_QUERY } from './nextEvent.graphql';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import Button from '../../common/Button';
import { DEFAULT_EVENT_SRC } from '../../../lib/constants';

import './nextEvent.module.scss';

const userStatus = (userId, event) => {
  if (!event.rsvps) {
    return 'NONE';
  }

  const rsvp = event.rsvps.find((rsvp) => rsvp.member.id === userId);

  if (rsvp) {
    return rsvp.status;
  }

  return 'NONE';
};

const NextEvent = () => {
  const [attending, setAttending] = useState(null);
  const submitRsvp = useCallback((rsvp, eventId, userId, callback) => {
    setAttending(rsvp);
    callback({
      variables: {
        rsvp: {
          userId,
          eventId,
          status: rsvp ? 'GOING' : 'CANT_GO',
        },
      },
    });
  }, []);

  return (
    <>
      <h3 className="dashboard-heading">Next Event</h3>
      <Query query={NEXT_EVENT_QUERY}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }

          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { event, myself } = queryData;

          if (!event) {
            return 'Nothing scheduled';
          }

          const userRSVP = userStatus(myself.id, event);
          const hasRSVPd = userRSVP !== 'NONE' || attending !== null;
          const isAttendingNextEvent =
            attending !== null ? attending : userRSVP === 'GOING';

          const featuredImage = get(
            event,
            'featuredImage.url',
            DEFAULT_EVENT_SRC,
          );

          const backgroundImage = `
            background-image: linear-gradient(
              90deg,
              rgba($grey-light, 1) 0%,
              rgba($grey-light, 0.95) 0%,
              rgba($grey-light, 0.75) 40%,
              rgba($red, 0.5) 65%,
              rgba($red-light, 0.25) 80%
            ),
            url(${featuredImage});
          `;

          return (
            <div className="event-container">
              <div className="event" style={backgroundImage}>
                <div className="event-details">
                  <h3>
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </h3>
                  <h4>{format(event.startTime, 'ddd, mmm D, h:mm A')}</h4>
                </div>
                <Mutation mutation={RSVP_MUTATION}>
                  {(setRsvp, { loading, error }) => (
                    <>
                      <Button
                        onClick={() =>
                          submitRsvp(true, event.id, myself.id, setRsvp)
                        }
                        ghost
                        selected={hasRSVPd && isAttendingNextEvent}
                      >
                        Attending
                      </Button>
                      <Button
                        onClick={() =>
                          submitRsvp(false, event.id, myself.id, setRsvp)
                        }
                        ghost
                        selected={hasRSVPd && !isAttendingNextEvent}
                      >
                        Not Attending
                      </Button>
                      <Loading loading={loading} />
                    </>
                  )}
                </Mutation>
              </div>
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default NextEvent;
