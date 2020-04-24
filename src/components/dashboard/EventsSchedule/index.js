import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/react-components';

import { DASHBOARD_UPCOMING_EVENTS_QUERY } from './eventsSchedule.graphql';
import Calendar from '../../events/Calendar';
import ErrorMessage from '../../utility/ErrorMessage';

import './eventsSchedule.module.scss';

const EventsSchedule = () => {
  return (
    <div className="events-schedule">
      <h3 className="dashboard-heading">Events Schedule</h3>
      <Query query={DASHBOARD_UPCOMING_EVENTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }

          const { events } = data;
          return (
            <>
              {events.length > 0 ? (
                <>
                  <ul>
                    {events.map((event) => (
                      <li key={event.id}>
                        <Calendar date={event.startTime} />
                        <Link to={`event/${event.id}`}>{event.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <hr className="hr" />
                  <Link to="/events">
                    <small>See All</small>
                  </Link>
                </>
              ) : (
                <p>Nothing scheduled</p>
              )}
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default EventsSchedule;
