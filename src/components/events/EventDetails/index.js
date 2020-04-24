import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/react-components';
import { format, getTime } from 'date-fns';
import parse from 'html-react-parser';
import get from 'lodash/get';

import { EVENT_QUERY } from './eventDetails.graphql';
import {
  trailDifficulties,
  // trailConditions,
  DEFAULT_EVENT_SRC,
  DEFAULT_AVATAR_SMALL_SRC,
  // DEFAULT_TRAIL_SRC,
} from '../../../lib/constants';
// import Calendar from '../Calendar';
import RigbookCard from '../../user/RigbookCard';
import Rsvp from '../Rsvp';
import Filter from '../../login/Filter';
import { isAtLeastRunMaster } from '../../../lib/utils';

import './eventDetails.module.scss';

export default class EventDetails extends Component {
  onMapImgError = (e) => {
    e.target.src = '/img/default-map.png';
  };

  render() {
    const { id: eventId } = this.props;
    console.log('id', eventId);

    return (
      <Query query={EVENT_QUERY} variables={{ eventId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { event, myself } = data;

          const isPastEvent = Date.now() > getTime(event.startTime);

          const attendees = event.rsvps.filter(
            (rsvp) => rsvp.status === 'GOING',
          );

          const attendeeCount = attendees.length;

          const userStatus = () => {
            const rsvp = event.rsvps.find(
              (rsvp) => rsvp.member.id === myself.id,
            );

            if (rsvp) {
              return rsvp.status;
            }

            return 'NONE';
          };

          const encodedRallyAddress = encodeURIComponent(
            event.rallyAddress || event.address || 'Colorado',
          );

          const encodedAddress = encodeURIComponent(
            event.address || 'Colorado',
          );

          const EVENT_IMAGE = get(
            event,
            'featuredImage.url',
            DEFAULT_EVENT_SRC,
          );

          const TRAIL_IMAGE = get(event, 'trail.featuredImage.url');

          const HOST_IMAGE = get(
            event,
            'host.avatar.smallUrl',
            DEFAULT_AVATAR_SMALL_SRC,
          );

          return (
            <div className="event">
              {!isPastEvent && (
                <Filter roleCheck={isAtLeastRunMaster}>
                  <Link to={`/event/${eventId}/edit`}>Edit</Link>
                </Filter>
              )}
              <div className="event__header">
                <div className="event__calendar">{event.type || 'Run'}</div>
                <div className="event__info">
                  <div className="event__date">
                    {isPastEvent
                      ? 'Past Event'
                      : format(event.startTime, 'dddd, mmmm D, yyyy')}
                  </div>
                  <h2 className="event__title">{event.title}</h2>
                  {event.host.firstName && (
                    <div className="event__leader">
                      <img src={HOST_IMAGE} height="30" alt="Run Leader" />
                      Hosted by {event.host.firstName}
                    </div>
                  )}
                </div>
                <div className="event__rsvp">
                  <Rsvp
                    userId={myself.id}
                    userStatus={userStatus()}
                    eventId={this.props.id}
                    attendeeCount={attendeeCount}
                    pastEvent={isPastEvent}
                  />
                </div>
              </div>
              <div className="event__details">
                <div className="event__columns">
                  <section className="event__section">
                    {TRAIL_IMAGE && (
                      <img src={TRAIL_IMAGE} alt={event.trail.name} />
                    )}
                    {EVENT_IMAGE && !TRAIL_IMAGE && (
                      <img src={EVENT_IMAGE} alt={event.title} />
                    )}
                  </section>
                  <section className="event__section" aria-label="Description">
                    {parse(event.description)}
                  </section>
                  {event.trail && (
                    <section>
                      <h3>Trail Information</h3>
                      <h5>{event.trail.name}</h5>
                      {parse(event.trail.description)}

                      {/* <button id={event.trail.id}>
                      {event.trail.name}
                      </button> */}
                      {(event.trailDifficulty || event.trailNotes) && (
                        <>
                          <h4>Run Leader Notes</h4>
                          <p>
                            {event.trailDifficulty && (
                              <>
                                <strong>Difficulty</strong>:{' '}
                                {trailDifficulties[event.trailDifficulty]}
                                <br />
                              </>
                            )}
                            {event.trailNotes && (
                              <>
                                <strong>Comments</strong>: {event.trailNotes}
                              </>
                            )}
                          </p>
                        </>
                      )}
                      {/* {(event.trail.avgDifficulty ||
                        event.trail.avgRatings ||
                        event.trail.favoriteCount ||
                        event.trail.conditionsLastReported) && (
                        <>
                          <h4>Member Notes</h4>
                          <p>
                            {event.trail.avgDifficulty && (
                              <>
                                <strong>Difficulty</strong>:{' '}
                                {trailDifficulties[event.trail.avgDifficulty]}
                                <br />
                              </>
                            )}
                            {!Number.isNaN(event.trail.avgRatings) && (
                              <>
                                <strong>Quality Rating</strong>:{' '}
                                {event.trail.avgRatings > 0 ? (
                                  <>{event.trail.avgRatings}/5</>
                                ) : (
                                  <>None</>
                                )}
                                <br />
                              </>
                            )}
                            <strong>Favorites</strong>:{' '}
                            {event.trail.favoriteCount}
                            <br />
                            <strong>Conditions</strong>:{' '}
                            {trailConditions[event.trail.currentConditions] ||
                              'Unknown'}
                            <br />
                            <small>
                              Last reported:{' '}
                              {distanceInWordsToNow(
                                event.trail.conditionsLastReported,
                              ) || 'Never'}
                            </small>
                          </p>
                        </>
                      )} */}
                    </section>
                  )}
                  <section className="event__section">
                    <h3>Attendees</h3>
                    <div className="event__attendees">
                      <RigbookCard user={event.host} />
                      {attendees
                        .filter(
                          (attendee) => attendee.member.id !== event.host.id,
                        )
                        .map((attendee) => (
                          <RigbookCard user={attendee.member} />
                        ))}
                    </div>
                  </section>
                  {/* {isPastEvent && (
                    <section className="event__section">
                      <h3>Photos</h3>
                      <form>
                        <input type="file" />
                      </form>
                    </section>
                  )} */}
                  {event.comments && (
                    <section className="event__section">
                      <h3>Comments</h3>
                      <hr />
                      <form>
                        <textarea />
                      </form>
                    </section>
                  )}
                  <p className="event__section">
                    <button>See More Events</button>
                  </p>
                </div>
                <aside className="event__aside">
                  <div className="event__aside-wrapper">
                    <p>
                      <strong>Start</strong>:{' '}
                      {format(event.startTime, 'M/D/YY h:mm A')}
                      <br />
                      <strong>End</strong>:{' '}
                      {format(event.endTime, 'M/D/YY h:mm A')}
                    </p>

                    {event.rallyTime || event.rallyAddress ? (
                      <p>
                        {event.rallyTime && (
                          <>
                            <strong>Rally Time</strong>:{' '}
                            {format(event.rallyTime, 'h:mm A')}
                            <br />
                          </>
                        )}
                        {event.rallyAddress && (
                          <>
                            <strong>Rally Point</strong>: {event.rallyAddress}
                          </>
                        )}
                      </p>
                    ) : (
                      <p>
                        <strong>Address</strong>: {event.address || 'n/a'}
                      </p>
                    )}
                    {(event.rallyAddress || event.address) && (
                      <p>
                        <Link
                          to={`https://www.google.com/maps/search/?api=1&query=${encodedRallyAddress}`}
                        >
                          <img
                            width="250"
                            height="100"
                            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=500x200&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`}
                            alt={`${event.title} map`}
                            onError={this.onMapImgError}
                          />
                        </Link>
                        <br />
                        <small>
                          (
                          <Link
                            to={`https://www.google.com/maps/dir/?api=1&destination=${encodedRallyAddress}`}
                          >
                            Directions
                          </Link>
                          )
                        </small>
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
