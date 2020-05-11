import React from 'react';
// import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../utility/ErrorMessage';

import { ACTIVITY_QUERY } from './activity.graphql';
import Calendar from '../../events/Calendar';
import { sortByDateDesc, isAtLeastBoardMember } from '../../../lib/utils';

import Styles from './activity.module.scss';

const Activity = ({ username, isSelf }) => {
  const { loading, error, data } = useQuery(ACTIVITY_QUERY, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { user } = data;

  return (
    <div className={Styles['activity']}>
      <div className={Styles['user-data']}>
        <div className={Styles['user-data__section']}>
          <h3>Events Attended</h3>
          {get(user, 'eventsRSVPd', []).length > 0 ? (
            <ul className={Styles['calendar-list']}>
              {user.eventsRSVPd
                .filter((event) => event.status === 'GOING')
                .map((rsvp) => (
                  <li key={rsvp.event.id}>
                    <Calendar date={rsvp.event.startTime} />
                    <Link to={`/event/${rsvp.event.id}`}>
                      {rsvp.event.title}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <span>None</span>
          )}
        </div>
        <div className={Styles['user-data__section']}>
          <h3>Trails Visited</h3>
          {get(user, 'trailsVisited', []).length > 0 ? (
            <ul>
              {user.trailsVisited.map((trail) => (
                <li key={trail.id}>{trail.name}</li>
              ))}
            </ul>
          ) : (
            <span>None</span>
          )}
        </div>
        {/* <div className={Styles["user-data__section"]}>
              <h3>Bandaids</h3>
              {get(user, 'bandaids', []).length > 0 ? (
                <ul>
                  {user.bandaids.map(bandaid => (
                    <li key={bandaid.id}>
                      {format(new Date(bandaid.occurred), 'm/d/yyyy')}
                      {' '}
                      {bandaid.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No bandaids found...</span>
              )}
            </div>*/}
        {/* <div className={Styles['user-data__section']}>
          <h3>Run Reports</h3>
          {get(user, 'runReportsLogged', []).length > 0 ? (
            <ul>
              {user.runReportsLogged.map((report) => (
                <li key={report.id}>
                  {format(new Date(report.reportFiled), 'm/d/yyyy')}{' '}
                  {report.title}
                </li>
              ))}
            </ul>
          ) : (
            <span>No run reports found...</span>
          )}
        </div> */}
      </div>
      <aside>
        <div className={Styles['user-data__section']}>
          <h3>Activity Log</h3>
          <div className={Styles['user-logs']}>
            <div className={Styles['activity-log']}>
              {user.activityLog && user.activityLog.length > 0 ? (
                <ul className={Styles['calendar-list']}>
                  {user.activityLog
                    .sort(sortByDateDesc('time'))
                    .map((entry) => (
                      <li key={entry.id}>
                        <Calendar date={entry.time} />
                        {entry.message}

                        {entry.link && <Link to={entry.link}>></Link>}
                      </li>
                    ))}
                </ul>
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Activity;
