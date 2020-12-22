import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { DASHBOARD_UPCOMING_EVENTS_QUERY } from './eventsSchedule.graphql';
import Calendar from '../../events/Calendar';
import ErrorMessage from '../../utility/ErrorMessage';

import Styles from './eventsSchedule.module.scss';

const EventsSchedule = () => {
  const { loading, error, data } = useQuery(DASHBOARD_UPCOMING_EVENTS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { events, myself } = data;

  return (
    <div className={Styles['events-schedule']}>
      <h3 className={Styles['dashboard-heading']}>Events Schedule</h3>
      {events.length > 0 ? (
        <>
          <ul>
            {events.map((event) => {
              const lockedOut =
                event.membersOnly && myself.accountType === 'GUEST';

              console.log('locked', lockedOut);

              return (
                <li key={event.id}>
                  <Calendar
                    className={Styles['calendar']}
                    date={event.startTime}
                    mask={lockedOut}
                  />
                  {lockedOut ? (
                    <>{event.title}</>
                  ) : (
                    <Link to={`event/${event.id}`}>{event.title}</Link>
                  )}
                </li>
              );
            })}
          </ul>
          <hr className={Styles['hr']} />
          <Link to="/events">
            <small>See All</small>
          </Link>
        </>
      ) : (
        <div className={Styles['nothing-scheduled']} />
      )}
    </div>
  );
};

export default EventsSchedule;
