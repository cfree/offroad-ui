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
import AttendeeCard from '../AttendeeCard';
import RunRsvp from '../RunRsvp';
import NonRunRsvp from '../NonRunRsvp';
import Filter from '../../login/Filter';
import { isAtLeastRunMaster, isFullMember } from '../../../lib/utils';
import { eventTypes } from '../../../lib/constants';
import Icon from '../../common/Icon';
import ErrorMessage from '../../utility/ErrorMessage';
import Badge from '../../common/Badge';

import Styles from './eventDetails.module.scss';

const getBadgeType = (difficulty) => {
  switch (difficulty) {
    case 'EASY':
      return 'success';
    case 'INTERMEDIATE':
      return 'caution';
    case 'ADVANCED':
      return 'fail';
    case 'UNKNOWN':
    default:
      return 'neutral';
  }
};

export default class EventDetails extends Component {
  onMapImgError = (e) => {
    e.target.src = '/img/default-map.png';
  };

  getStat = (actual, max, noun, plural) => {
    return max && max !== -1 ? (
      <>
        <span className={Styles['stat--large']}>{actual}</span> out of{' '}
        <span className={Styles['stat--large']}>{max}</span>{' '}
        <span className={Styles['stat--newline']}>{plural}</span>
      </>
    ) : (
      <>
        <span className={Styles['stat--large']}>{actual}</span>{' '}
        <span className={Styles['stat--newline']}>
          {actual === 1 ? noun : plural}
        </span>
      </>
    );
  };

  getMaxRigs = (count) => count > -1 && `Max ${count} rigs`;

  getMaxAttendees = (count) => count > -1 && `Max ${count} attendees`;

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
        </>
      );
    } else {
      return event.trail && <>{format(startTime, 'h:mm a')}</>;
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

          const lockedOut = event.membersOnly && myself.accountType === 'GUEST';

          if (lockedOut) {
            return null;
          }

          const isPastEvent = Date.now() > getTime(new Date(event.startTime));

          const allAttendees = event.rsvps.filter(
            (rsvp) => rsvp.status === 'GOING',
          );
          const hostRsvp = allAttendees.find(
            (attendee) => attendee.member.id === event.host.id,
          );
          const rsvpsSansHost = allAttendees.filter(
            (attendee) => attendee.member.id !== event.host.id,
          );
          const guestPassengerCount = allAttendees.reduce(
            (acc, attendee) => acc + get(attendee, 'guestCount', 0),
            0,
          );
          const memberCount = allAttendees.length;
          const attendeeCount = guestPassengerCount + memberCount;
          const rigCount = allAttendees.filter((attendee) => {
            return !attendee.isRider;
          }).length;

          const userStatus = () => {
            const rsvp = event.rsvps.find(
              (rsvp) => rsvp.member.id === myself.id,
            );

            if (rsvp) {
              return rsvp.status;
            }

            return 'NONE';
          };

          const userRsvp = () =>
            event.rsvps.find((rsvp) => rsvp.member.id === myself.id);

          const encodedRallyAddress = encodeURIComponent(
            event.rallyAddress || event.address || 'Colorado',
          );

          // const encodedAddress =
          //   get(event, 'trail.trailheadCoords') ||
          //   encodeURIComponent(event.address || 'Colorado');

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
                    <Filter
                      roleCheck={isAtLeastRunMaster}
                      typeCheck={isFullMember}
                    >
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
                {event.type === 'RUN' ? (
                  <RunRsvp
                    user={myself}
                    userStatus={userStatus()}
                    eventId={this.props.id}
                    attendeeCount={attendeeCount}
                    rigCount={rigCount}
                    pastEvent={isPastEvent}
                    userRsvp={userRsvp()}
                    isHost={event.host.id === myself.id}
                    maxRigs={event.maxRigs}
                    maxAttendees={event.maxAttendees}
                  />
                ) : (
                  <NonRunRsvp
                    user={myself}
                    userStatus={userStatus()}
                    eventId={this.props.id}
                    attendeeCount={attendeeCount}
                    rsvpCount={rigCount}
                    pastEvent={isPastEvent}
                    userRsvp={userRsvp()}
                    maxAttendees={event.maxAttendees}
                  />
                )}
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
                    <dd>
                      {eventType}{' '}
                      {event.trailDifficulty && event.trail && (
                        <Badge type={getBadgeType(event.trailDifficulty)}>
                          {trailDifficulties[event.trailDifficulty]}
                        </Badge>
                      )}
                    </dd>

                    {event.maxRigs && event.maxRigs > -1 && (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="count"
                          >
                            Max Rigs
                          </Icon>
                        </dt>
                        <dd>{this.getMaxRigs(event.maxRigs)}</dd>
                      </>
                    )}

                    {event.maxAttendees && event.maxAttendees > -1 && (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="count"
                          >
                            Max Attendees
                          </Icon>
                        </dt>
                        <dd>{this.getMaxAttendees(event.maxAttendees)}</dd>
                      </>
                    )}

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

                    {event.rallyAddress && (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="location"
                          >
                            Rally Address
                          </Icon>
                        </dt>
                        <dd>
                          {event.rallyAddress}
                          <br />
                          <small>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedRallyAddress}`}
                            >
                              Directions
                            </a>
                          </small>
                        </dd>
                      </>
                    )}
                    {event.address && (
                      <>
                        <dt>
                          <Icon
                            className={Styles[`event-type__icon`]}
                            icon="location"
                          >
                            Address
                          </Icon>
                        </dt>
                        <dd>
                          {event.address}
                          <br />
                          <small>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                event.address,
                              )}`}
                            >
                              Directions
                            </a>
                          </small>
                        </dd>
                      </>
                    )}
                  </dl>
                  {event.rallyAddress && (
                    <p>
                      <img
                        width="250"
                        height="100"
                        src={`https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=250x100&maptype=roadmap&markers=color:red%7Csize:small%7C${encodeURIComponent(
                          event.rallyAddress,
                        )}&center=${encodeURIComponent(
                          event.rallyAddress,
                        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                        alt={`${event.title} map`}
                        onError={this.onMapImgError}
                      />
                    </p>
                  )}
                  {event.address && (
                    <p>
                      <img
                        width="250"
                        height="100"
                        src={`https://maps.googleapis.com/maps/api/staticmap?zoom=9&size=250x100&maptype=roadmap&markers=color:red%7Csize:small%7C${encodeURIComponent(
                          event.address,
                        )}&center=${encodeURIComponent(event.address)}&key=${
                          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                        }`}
                        alt={`${event.title} map`}
                        onError={this.onMapImgError}
                      />
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

                {event.description && (
                  <section
                    className={Styles['event__section']}
                    aria-label="Description"
                  >
                    {parse(event.description)}
                  </section>
                )}
                {event.trail && (
                  <section>
                    {event.trail.description && (
                      <>
                        <h3>{event.trail.name} Trail Information</h3>
                        {parse(event.trail.description)}
                      </>
                    )}

                    {/* <CurrentWeather coords={event.trail.trailheadCoords} /> */}

                    {event.trailNotes && (
                      <>
                        <h3>Run Leader Notes</h3>
                        <p>
                          <strong>Comments</strong>: {event.trailNotes}
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

                  <div className={Styles['event-stats']}>
                    <div className={Styles['event-stat']}>
                      {this.getStat(
                        rigCount,
                        event.maxRigs,
                        'vehicle',
                        'vehicles',
                      )}
                    </div>
                    <div className={Styles['event-stat']}>
                      {this.getStat(
                        attendeeCount,
                        event.maxAttendees,
                        'attendee',
                        'attendees',
                      )}
                    </div>
                  </div>

                  <div className={Styles['event__attendees']}>
                    <div>
                      <h4 className={Styles['event__card-heading']}>
                        Run Leader
                      </h4>
                      <AttendeeCard
                        key={event.host.id}
                        rsvp={hostRsvp}
                        isLeader
                      />
                    </div>
                    <div>
                      <h4 className={Styles['event__card-heading']}>
                        Attendees
                      </h4>
                      {rsvpsSansHost.map((attendee) => (
                        <AttendeeCard
                          key={attendee.member.id}
                          rsvp={attendee}
                        />
                      ))}
                    </div>
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

/*
  
  Old card:

  <RigbookCard
    key={attendee.member.id}
    user={attendee.member}
    extra={passengers}
    titleOverride={
      event.host.id === attendee.member.id
        ? event.type === 'RUN'
          ? 'Run Leader'
          : 'Host'
        : null
    }
  />
*/

/*

Ideal State:

<Page>
  <Title />

  <Stats>
    <RigsAllowed />
    <AttendeesAllowed />
    <TotalMiles />
    <HighestElevation />
  </Stats>

  <RSVP />

  <OptionalRecurringEventInfo />
  <StartDateTime />
  <EndDateTime />

  <RallyPoint />

  <AddToCalendar>
    <Google />
    <ICal />
  </AddToCalendar>

  <Tabs>
    <Details>
      <Difficulty />
      <TripType />
      <Region />

      <TerrainExpected />
      <RecommendedCapabilities />
    </Details>

    <Attendees>
      <Host>
        <RigPhoto />
        <Avatar />
        <RunLeaderCount />

        <Name />
        <TitlesOrOffices />

        <SendMessage />

        <Hometown />
        <ProfileLink />
        <MemberSince />
      </Host>

      <Attending>
        <Count />

        <Attendee>
          <Avatar />
          <PassengersCount />

          <Name />
          <AccountType />

          <AddlInfo>
            <Name />
            <TitlesOrOffices />
            <Hometown />
            <MemberSince />
            
            <EventsCount />
            <SendMessage />
            <ProfileLink /> // Icon - @username
          </AddlInfo>

          <Drivers>
            <Rig />
            <Equipment />
          </Drivers>
        </Attendee>

        <Riders />
      </Attending>
      <NotAttending />
    </Attendees>

    <Location>
      <Meta>
        <AvgRatings />
        <AvgDifficulty />
        <NumOfFavorites />
      </Meta>
    
      <Description />
      <Map />

    </Location>

    <Comments>
      <CommentCount />

      <Comment>
        <Avatar />
        <Name />
        <Date />
        <Message />
      </Comment>
    </Comments>
  </Tabs>
</Page>

*/
