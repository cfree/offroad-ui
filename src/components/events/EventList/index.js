import React, { Component } from 'react';
import { Query } from '@apollo/react-components';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import cn from 'classnames';

import {
  UPCOMING_EVENTS_QUERY,
  PAST_EVENTS_QUERY,
} from './eventList.graphql.js';
import AttendeeStatus from '../AttendeeStatus';
import Badge from '../../common/Badge';
import {
  dateFormatAbbrev,
  dateTimeFormatAbbrev,
  DEFAULT_EVENT_SMALL_SRC,
  DEFAULT_AVATAR_SMALL_SRC,
  trailDifficulties,
} from '../../../lib/constants';
import { getUserRSVPStatus } from '../../../lib/utils';

import Styles from './eventList.module.scss';

class EventList extends Component {
  state = {
    attendees: [],
  };

  getAttendees = (eventId) => {
    if (this.state.attendees[eventId]) {
      const attendees = this.state.attendees[eventId];
      return attendees.length > 3 ? attendees.slice(0, 3) : attendees;
    }

    return [];
  };

  handleUpdateEventAttendees = (eventUpdate) => {
    this.setState({ attendees: eventUpdate });
  };

  render() {
    const eventType = this.props.upcoming ? 'Upcoming' : 'Past';

    return (
      <Query
        query={this.props.upcoming ? UPCOMING_EVENTS_QUERY : PAST_EVENTS_QUERY}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { events, myself } = data;

          return (
            <div className={Styles['events']}>
              <ul className={Styles['events-list']}>
                <h2>{eventType} Events</h2>
                {events.length > 0 ? (
                  events.map((event) => {
                    const attendeesList = event.rsvps.filter(
                      (rsvp) => rsvp.status === 'GOING',
                    );

                    console.log('attendees', this.state.attendees[event.id]);

                    let totalAttendees = 0;
                    let totalRigs = 0;

                    if (this.state.attendees[event.id]) {
                      this.state.attendees[event.id].forEach((attendee) => {
                        console.log('attendee', attendee);
                        totalAttendees += 1;

                        if (attendee.isRider) {
                          return;
                        }

                        if (attendee.guestCount) {
                          totalAttendees += attendee.guestCount;
                        }

                        if (event.trail) {
                          totalRigs += 1;
                        }
                        return;
                      });
                    } else {
                      this.setState((state) => ({
                        attendees: {
                          ...state.attendees,
                          [event.id]: attendeesList,
                        },
                      }));
                    }

                    const EVENT_IMAGE = get(
                      event,
                      'featuredImage.smallUrl',
                      DEFAULT_EVENT_SMALL_SRC,
                    );

                    const TRAIL_IMAGE = get(
                      event,
                      'trail.featuredImage.smallUrl',
                    );

                    let badgeType;

                    switch (event.trailDifficulty) {
                      case 'ADVANCED':
                        badgeType = 'fail';
                        break;
                      case 'INTERMEDIATE':
                        badgeType = 'caution';
                        break;
                      case 'EASY':
                      case 'BEGINNER':
                        badgeType = 'success';
                        break;
                      default:
                        badgeType = 'neutral';
                    }

                    const lockedOut =
                      event.membersOnly && myself.accountType === 'GUEST';

                    const classNames = cn(Styles['event'], {
                      [Styles['event__locked']]: lockedOut,
                    });

                    // this.state.attendees[event.id] || [].map(() => '');
                    // Loop through each attendee

                    // const totalRigs =
                    //   this.state.attendees[event.id] || [].map(() => '');

                    const isFull =
                      event.maxRigs === totalRigs ||
                      event.maxAttendees === totalAttendees;

                    console.log('isFull', isFull, totalRigs, totalAttendees);

                    return (
                      <li className={Styles['event-wrapper']} key={event.id}>
                        <div className={classNames}>
                          <div className={Styles['event__header']}>
                            <div className={Styles['event__header-details']}>
                              <div className={Styles['event-date']}>
                                {lockedOut ? (
                                  <>
                                    {format(
                                      new Date(event.startTime),
                                      dateFormatAbbrev,
                                    )}
                                  </>
                                ) : (
                                  <Link to={`/event/${event.id}`}>
                                    {format(
                                      new Date(event.startTime),
                                      dateTimeFormatAbbrev,
                                    )}
                                  </Link>
                                )}
                              </div>
                              <h3 className={Styles['event-title']}>
                                {lockedOut ? (
                                  <>{event.title}</>
                                ) : (
                                  <Link to={`/event/${event.id}`}>
                                    {event.title}
                                  </Link>
                                )}
                              </h3>
                              {event.trailDifficulty &&
                                event.trailDifficulty !== 'UNKNOWN' && (
                                  <Badge
                                    type={badgeType}
                                    className={Styles['event__badge']}
                                  >
                                    {trailDifficulties[event.trailDifficulty]}
                                  </Badge>
                                )}
                              {event.membersOnly && (
                                <Badge
                                  type="neutral"
                                  className={Styles['event__badge']}
                                >
                                  Members Only
                                </Badge>
                              )}
                            </div>
                            {TRAIL_IMAGE && (
                              <img
                                className={Styles['event-image']}
                                src={TRAIL_IMAGE}
                                alt={event.trail.name}
                                height="100"
                                width="150"
                              />
                            )}
                            {EVENT_IMAGE && !TRAIL_IMAGE && (
                              <img
                                className={Styles['event-image']}
                                src={EVENT_IMAGE}
                                alt={event.title}
                                height="100"
                                width="150"
                              />
                            )}
                          </div>
                          <div className={Styles['event-details']}>
                            <div className={Styles['event-meta']}>
                              {this.state.attendees[event.id] &&
                                this.state.attendees[event.id].length >= 0 && (
                                  <span className={Styles['event-attendees']}>
                                    {event.rsvps && event.rsvps.length > 0 && (
                                      <span
                                        className={
                                          Styles['event-attendees__avatars']
                                        }
                                      >
                                        {this.getAttendees(event.id).map(
                                          (rsvp) => (
                                            <img
                                              src={get(
                                                rsvp.member,
                                                'avatar.smallUrl',
                                                DEFAULT_AVATAR_SMALL_SRC,
                                              )}
                                              key={`${event.id}-${rsvp.member.id}`}
                                              width="30"
                                              alt="Attendee"
                                            />
                                          ),
                                        )}
                                      </span>
                                    )}
                                    {isFull ? (
                                      <Badge
                                        className={
                                          Styles['event-attendees__badge']
                                        }
                                        type="fail"
                                      >
                                        Full
                                      </Badge>
                                    ) : (
                                      <span
                                        className={
                                          Styles['event-attendees__count']
                                        }
                                      >
                                        <span
                                          className={
                                            Styles['event-attendees__number']
                                          }
                                        >
                                          {totalAttendees}
                                        </span>{' '}
                                        attendees
                                      </span>
                                    )}
                                  </span>
                                )}
                              <span className={Styles['event-rsvp']}>
                                {/* <span className={Styles["event-comment-count">
                                    12
                                  </span> */}
                                <AttendeeStatus
                                  isUpcoming={this.props.upcoming}
                                  status={getUserRSVPStatus(
                                    event.rsvps,
                                    event.id,
                                    myself.id,
                                  )}
                                  eventId={event.id}
                                  user={myself}
                                  lockedOut={lockedOut}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <h3>No events planned</h3>
                )}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default EventList;
