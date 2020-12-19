import React from 'react';
// import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../../../utility/ErrorMessage';

import { ACTIVITY_QUERY } from './activity.graphql';
import Calendar from '../../../events/Calendar';
import Filter from '../../../login/Filter';
import { sortByDateDesc, isAtLeastRunLeader } from '../../../../lib/utils';

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

  // const trails = get(user, 'eventsRSVPd', [])
  //   .filter((event) => event.trail !== null)
  //   .map((event) => event.trail);
  // filter
  //    past events
  // some
  //    have trails
  // map
  //   .sort((a, b) =>
  //   a.event.startTime < b.event.startTime ? 1 : -1,
  // );

  let activity = get(user, 'activityLog', []).sort(sortByDateDesc('time'));

  if (activity.length) {
    activity.sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  return (
    <div className={Styles['activity']}>
      {/* <ul className={Styles['user-data']}>
        <li>
          <h3>Trails</h3>
        </li>
        <li>
          <h3>Events</h3>
        </li>
        <Filter roleCheck={isAtLeastRunLeader}>
          <li>
            <h3>Runs Led</h3>
          </li>
        </Filter>
        <li>
          <h3>Bandaids</h3>
        </li>
      </ul> */}
      <aside className={Styles['activity__aside']}>
        <div className={Styles['user-data__section']}>
          <h3>Activity Log</h3>
          <div className={Styles['user-logs']}>
            <div className={Styles['activity-log']}>
              {activity.length > 0 ? (
                <ul className={Styles['calendar-list']}>
                  {activity.map((entry) => (
                    <li key={entry.id}>
                      <Calendar date={entry.time} />
                      {entry.message}

                      {entry.link && <Link to={entry.link}>&gt;</Link>}
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
