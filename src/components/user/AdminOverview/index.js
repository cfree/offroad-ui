import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';

import { ADMIN_OVERVIEW_QUERY } from './adminOverview.graphql';
import ErrorMessage from '../../utility/ErrorMessage';

const AdminOverview = ({ username }) => {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(ADMIN_OVERVIEW_QUERY, {
    variables: { username },
  });

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { user, duesLastReceived, meetings, runs } = queryData;

  return (
    <div>
      <h2>Overview</h2>
      {/* <div>
        <h2>Offices and Titles History</h2>
        Manual Log Entry: <input type="text" />
        (Start Date, End Date, Title/Office, User)
      </div> */}
      <ul>
        <li>
          <strong>Date account created:</strong>{' '}
          {format(new Date(user.createdAt), 'MM-dd-yyyy')}
        </li>
        <li>
          <strong>Last login:</strong>{' '}
          {user.lastLogin && format(new Date(user.lastLogin), 'MM-dd-yyyy')}
        </li>
        <li>
          <strong>Runs attended:</strong> {(runs && runs.length) || '0'}{' '}
          {runs && runs.length > 0 && (
            <>
              <br />
              <small>{`last: ${format(
                new Date(runs[0].startTime),
                'MM-dd-yyyy',
              )}`}</small>
            </>
          )}
        </li>
        <li>
          <strong>Meetings attended:</strong>{' '}
          {(meetings && meetings.length) || '0'}{' '}
          {meetings && meetings.length > 0 && (
            <>
              <br />
              <small>{`last: ${format(
                new Date(meetings[0].startTime),
                'MM-dd-yyyy',
              )}`}</small>
            </>
          )}
        </li>
        {user.joined ? (
          <>
            <li>
              <strong>Date joined:</strong>{' '}
              {user.joined
                ? format(new Date(user.joined), 'MM-dd-yyyy')
                : 'n/a'}
            </li>

            <li>
              <strong>Dues last received:</strong>{' '}
              {duesLastReceived &&
                format(new Date(duesLastReceived.time), 'MM-dd-yyyy')}
            </li>
          </>
        ) : (
          <li>
            <strong>Eligible for membership:</strong>{' '}
            {runs &&
            meetings &&
            runs.length &&
            runs.length > 0 &&
            meetings &&
            meetings.length > 0
              ? 'Yes'
              : 'No'}
          </li>
        )}
        {/* <li>General Mailing List Status: Subscribed / Unsubscribed?</li>
        <li>Members Mailing List Status: Subscribed / Unsubscribed?</li>
        <li>Membership packet? Yes/No</li>
        <li>CORSAR? Yes/No</li>
        <li>Sticker? Yes/No</li>
        <li>T-shirt? Yes/No</li>
        <li>T-shirt size</li> */}
      </ul>
    </div>
  );
};

export default AdminOverview;
