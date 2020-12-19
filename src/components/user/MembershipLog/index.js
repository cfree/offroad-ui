import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import { MEMBERSHIP_LOG_QUERY } from './membershipLog.graphql';
import Calendar from '../../events/Calendar';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { sortByDateDesc } from '../../../lib/utils';
// import { membershipLogMessages } from '../../../lib/constants';
import ManualLogEntry from '../ManualLogEntry';

import Styles from './membershipLog.module.scss';

/**
 * Any time an account is created
 * Any time a role, status, or type changes
 * Any time dues are received
 * Any time an office changes
 * Any time a title changes
 * @param {string} username
 */
const MembershipLog = ({ username }) => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(MEMBERSHIP_LOG_QUERY, {
    variables: { username },
  });

  if (queryLoading) {
    return <Loading loading />;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { user } = queryData;

  let logs = get(user, 'membershipLog', []).sort(sortByDateDesc('time'));

  if (logs.length) {
    logs.sort((a, b) => (a.time < b.time ? 1 : -1));
  }

  return (
    <>
      <ManualLogEntry userId={user.id} username={username} />
      {/* <FilterEntries member={username} /> */}
      <div className="logs">
        <aside className={Styles['log__aside']}>
          <div className={Styles['user-data__section']}>
            <h3>Membership Log</h3>
            <div className={Styles['user-logs']}>
              <div className={Styles['activity-log']}>
                {logs.length > 0 ? (
                  <ul className={Styles['calendar-list']}>
                    {logs.map((entry) => {
                      const loggerInfo = entry.logger ? (
                        <small>
                          Logged by{' '}
                          <Link to={`/profile/${entry.logger.username}`}>
                            {entry.logger.firstName} {entry.logger.lastName}
                          </Link>
                        </small>
                      ) : (
                        <small>Automated</small>
                      );
                      return (
                        <li key={entry.id}>
                          <Calendar date={entry.time} />
                          <div>
                            {entry.message}
                            <br />
                            {loggerInfo}
                          </div>
                          {entry.link && <Link to={entry.link}>&gt;</Link>}
                          {/* {isAdmin && (
                          <button onClick={removeLogEntry()}>Delete</button>
                        )} */}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span>No items found...</span>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default MembershipLog;
