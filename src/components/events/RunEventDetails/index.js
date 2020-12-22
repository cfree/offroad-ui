import React from 'react';
import { Link } from 'react-router-dom';
import { format, getTime } from 'date-fns';
import parse from 'html-react-parser';
import get from 'lodash/get';
import cn from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import { RUN_EVENT_QUERY } from './runEventDetails.graphql';

import {
  dateFormatFull,
  trailDifficulties,
  // trailConditions,
  DEFAULT_EVENT_SRC,
  DEFAULT_AVATAR_SMALL_SRC,
  // DEFAULT_TRAIL_SRC,
} from '../../../lib/constants';
import RunAttendeeCard from '../RunAttendeeCard';
import RunRsvp from '../RunRsvp';
import Filter from '../../login/Filter';
import {
  isAtLeastRunMaster,
  isFullMember,
  getBadgeType,
  onMapImgError,
  getMaxRigs,
  getMaxAttendees,
} from '../../../lib/utils';
import { getStat, getEventDate, getEventTime } from '../NonRunEventDetails';
import { eventTypes } from '../../../lib/constants';
import Icon from '../../common/Icon';
import Badge from '../../common/Badge';
import ErrorMessage from '../../utility/ErrorMessage';

import Styles from './runEventDetails.module.scss';

const RunEventDetails = ({ eventId }) => {
  const { loading, error, data } = useQuery(RUN_EVENT_QUERY, {
    variables: { eventId },
  });

  if (loading && !data) {
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

  const allAttendees = event.rsvps.filter((rsvp) => rsvp.status === 'GOING');
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
    const rsvp = event.rsvps.find((rsvp) => rsvp.member.id === myself.id);

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

  const EVENT_IMAGE = get(event, 'featuredImage.url', DEFAULT_EVENT_SRC);

  const TRAIL_IMAGE = get(event, 'trail.featuredImage.url');

  const HOST_IMAGE = get(
    event,
    'host.avatar.smallUrl',
    DEFAULT_AVATAR_SMALL_SRC,
  );

  const eventType = eventTypes[event.type];
  const fullUp =
    event.maxAttendees === attendeeCount || event.maxRigs === rigCount;

  return (
    <>
      <div className={Styles['event__header']}>
        <div className={Styles['event__date']}>
          {isPastEvent
            ? 'Past Event'
            : format(new Date(event.startTime), dateFormatFull)}
          {!isPastEvent && (
            <Filter roleCheck={isAtLeastRunMaster} typeCheck={isFullMember}>
              {' '}
              <small>
                <Link to={`/event/${eventId}/edit`}>Edit</Link>
              </small>
            </Filter>
          )}
        </div>
        <div className={Styles['event__title']}>
          <h2 className={Styles['event__title--heading']}>{event.title}</h2>
          {event.trailDifficulty && event.trailDifficulty !== 'UNKNOWN' && (
            <Badge
              type={getBadgeType(event.trailDifficulty)}
              className={Styles['event__badge']}
            >
              {trailDifficulties[event.trailDifficulty]}
            </Badge>
          )}
          {event.membersOnly && (
            <Badge type="neutral" className={Styles['event__badge']}>
              Members Only
            </Badge>
          )}
          {fullUp && <Badge type="fail">Full</Badge>}
        </div>
      </div>
      <div className={Styles['event__rsvp']}>
        <RunRsvp
          user={myself}
          userStatus={userStatus()}
          eventId={eventId}
          attendeeCount={attendeeCount}
          rigCount={rigCount}
          pastEvent={isPastEvent}
          userRsvp={userRsvp()}
          isHost={event.host.id === myself.id}
          maxRigs={event.maxRigs}
          maxAttendees={event.maxAttendees}
          fullUp={fullUp}
        />
      </div>
      <aside className={Styles['event__aside']}>
        <div className={Styles['event__aside-wrapper']}>
          <dl>
            <dt>
              <img
                className={Styles['event__leader']}
                src={HOST_IMAGE}
                alt={`Run Leader ${event.host.firstName} ${event.host.lastName}`}
              />
            </dt>
            <dd>
              {event.host.firstName} {event.host.lastName}
              <br />
              <small>Run Leader</small>
            </dd>

            <dt>
              <Icon
                className={
                  Styles[`event__type-icon--${eventType.toLowerCase()}`]
                }
                icon={eventType.toLowerCase()}
              >
                Event Type
              </Icon>
            </dt>
            <dd>{eventType}</dd>

            {event.maxRigs && event.maxRigs > -1 && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="count">
                    Max Rigs
                  </Icon>
                </dt>
                <dd>{getMaxRigs(event.maxRigs)}</dd>
              </>
            )}

            {event.maxAttendees && event.maxAttendees > -1 && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="count">
                    Max Attendees
                  </Icon>
                </dt>
                <dd>{getMaxAttendees(event.maxAttendees)}</dd>
              </>
            )}

            <dt>
              <Icon className={Styles[`event__type-icon`]} icon="date">
                Date
              </Icon>
            </dt>
            <dd>{getEventDate(event)}</dd>

            <dt>
              <Icon className={Styles[`event__type-icon`]} icon="time">
                Time
              </Icon>
            </dt>
            <dd>{getEventTime(event)}</dd>

            {event.rallyAddress && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="location">
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
            {event.address && !event.rallyAddress && (
              <>
                <dt>
                  <Icon className={Styles[`event__type-icon`]} icon="location">
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
                )}&center=${encodeURIComponent(event.rallyAddress)}&key=${
                  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                }`}
                alt={`${event.title} map`}
                onError={onMapImgError}
                className={Styles['event__map-image']}
              />
            </p>
          )}
          {event.address && !event.rallyAddress && (
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
                onError={onMapImgError}
                className={Styles['event__map-image']}
              />
            </p>
          )}
        </div>
      </aside>
      <div className={Styles['event__details']}>
        <section className={Styles['event__section']}>
          {TRAIL_IMAGE && <img src={TRAIL_IMAGE} alt={event.trail.name} />}
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

          <div className={Styles['event__stats']}>
            <div className={Styles['event__stat']}>
              {getStat(rigCount, event.maxRigs, 'rig', 'rigs')}
            </div>
            <div className={Styles['event__stat']}>
              {getStat(
                attendeeCount,
                event.maxAttendees,
                'attendee',
                'attendees',
              )}
            </div>
          </div>

          <div className={Styles['event__attendees']}>
            <div>
              <h4
                className={cn(
                  Styles['event__card-heading'],
                  Styles['event__card-heading--first'],
                )}
              >
                Run Leader
              </h4>
              <RunAttendeeCard key={event.host.id} rsvp={hostRsvp} isLeader />
            </div>
            <div>
              <h4 className={Styles['event__card-heading']}>Attendees</h4>
              {rsvpsSansHost.map((attendee) => (
                <RunAttendeeCard key={attendee.member.id} rsvp={attendee} />
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
};

export default RunEventDetails;

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
