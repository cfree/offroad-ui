import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/react-components';
import { format, getTime, isEqual, startOfDay } from 'date-fns';
import parse from 'html-react-parser';
import get from 'lodash/get';
import cn from 'classnames';

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
import { eventTypes } from '../../../lib/constants';
import Icon from '../../common/Icon';
import ErrorMessage from '../../utility/ErrorMessage';

import Styles from './eventDetails.module.scss';

export default class EventDetails extends Component {
  onMapImgError = (e) => {
    e.target.src = '/img/default-map.png';
  };

  getEventDate = (event) => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

    // If event is on one day
    if (isEqual(startOfDay(startTime), startOfDay(endTime))) {
      return <>{format(startTime, 'M/d/yy')}</>;
    } else {
      return (
        <>
          {format(startTime, 'M/d/yy')} to {format(endTime, 'M/d/yy')}
        </>
      );
    }
  };

  getEventTime = (event) => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

    // If event is on one day
    if (isEqual(startOfDay(startTime), startOfDay(endTime))) {
      return (
        <>
          {format(startTime, 'h:mm a')} to {format(endTime, 'h:mm a')}
          {event.rallyTime && (
            <>
              <br />
              {format(new Date(event.rallyTime), 'h:mm a')} rally time
            </>
          )}
        </>
      );
    } else {
      return event.rallyTime ? (
        <>{format(new Date(event.rallyTime), 'h:mm a')} rally time</>
      ) : (
        <>{format(startTime, 'h:mm a')}</>
      );
    }
  };

  render() {
    const { id: eventId } = this.props;

    return (
      <Query query={EVENT_QUERY} variables={{ eventId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <ErrorMessage error={error} />;
          }

          const { event, myself } = data;

          const isPastEvent = Date.now() > getTime(new Date(event.startTime));

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

          const eventType = eventTypes[event.type];

          return (
            <>
              <div className={Styles['event__header']}>
                <div className={Styles['event__date']}>
                  {isPastEvent
                    ? 'Past Event'
                    : format(new Date(event.startTime), 'EEEE, MMMM d, yyyy')}
                  {!isPastEvent && (
                    <Filter roleCheck={isAtLeastRunMaster}>
                      {' '}
                      <small>
                        <Link to={`/event/${eventId}/edit`}>Edit</Link>
                      </small>
                    </Filter>
                  )}
                </div>
                <h2 className={Styles['event__title']}>{event.title}</h2>
                {event.host.firstName && (
                  <div className={Styles['event__leader']}>
                    <img
                      src={HOST_IMAGE}
                      height="30"
                      alt={`Run Leader ${event.host.firstName} ${event.host.lastName}`}
                    />
                    Hosted by {event.host.firstName}
                  </div>
                )}
              </div>
              <div className={Styles['event__rsvp']}>
                <Rsvp
                  userId={myself.id}
                  userStatus={userStatus()}
                  eventId={this.props.id}
                  attendeeCount={attendeeCount}
                  pastEvent={isPastEvent}
                />
              </div>
              <aside className={Styles['event__aside']}>
                <div className={Styles['event__aside-wrapper']}>
                  <dl>
                    <dt>
                      <Icon
                        className={
                          Styles[`event-type__icon--${eventType.toLowerCase()}`]
                        }
                        icon={eventType.toLowerCase()}
                      >
                        Event Type
                      </Icon>
                    </dt>
                    <dd>{eventType}</dd>

                    <dt>
                      <Icon className={Styles[`event-type__icon`]} icon="date">
                        Date
                      </Icon>
                    </dt>
                    <dd>{this.getEventDate(event)}</dd>

                    <dt>
                      <Icon className={Styles[`event-type__icon`]} icon="time">
                        Time
                      </Icon>
                    </dt>
                    <dd>{this.getEventTime(event)}</dd>

                    {event.rallyAddress ? (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="location"
                          >
                            Rally Address
                          </Icon>
                        </dt>
                        <dd>{event.rallyAddress}</dd>
                      </>
                    ) : (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="location"
                          >
                            Address
                          </Icon>
                        </dt>
                        <dd>{event.address || 'n/a'}</dd>
                      </>
                    )}
                  </dl>
                  {(event.rallyAddress || event.address) && (
                    <p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodedRallyAddress}`}
                      >
                        <img
                          width="250"
                          height="100"
                          src={`https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=500x200&maptype=roadmap&markers=size:mid%7Ccolor:red%7C&center=${encodedAddress}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                          alt={`${event.title} map`}
                          onError={this.onMapImgError}
                        />
                      </a>
                      <br />
                      <small>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodedRallyAddress}`}
                        >
                          Directions
                        </a>
                      </small>
                    </p>
                  )}
                </div>
              </aside>
              <div className={Styles['event__details']}>
                <section className={Styles['event__section']}>
                  {TRAIL_IMAGE && (
                    <img src={TRAIL_IMAGE} alt={event.trail.name} />
                  )}
                  {EVENT_IMAGE && !TRAIL_IMAGE && (
                    <img src={EVENT_IMAGE} alt={event.title} />
                  )}
                </section>
                <section
                  className={Styles['event__section']}
                  aria-label="Description"
                >
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
                <section className={Styles['event__section']}>
                  <h3>Attendees</h3>

                  <div className={Styles['event__attendees']}>
                    <div
                      className={cn(Styles['event__host'])}
                      title={event.type === 'RUN' ? 'Run Leader' : 'Host'}
                    >
                      <RigbookCard user={event.host} />
                    </div>
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
                    <section className={Styles["event__section"]}>
                      <h3>Photos</h3>
                      <form>
                        <input type="file" />
                      </form>
                    </section>
                  )} */}
                {event.comments && (
                  <section className={Styles['event__section']}>
                    <h3>Comments</h3>
                    <hr />
                    <form>
                      <textarea />
                    </form>
                  </section>
                )}
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}
