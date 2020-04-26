import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { format } from 'date-fns';

import { ADMIN_OVERVIEW_QUERY } from './adminOverview.graphql';
import ErrorMessage from '../../utility/ErrorMessage';

const AdminOverview = ({ member }) => {
  return (
    <Query query={ADMIN_OVERVIEW_QUERY} variables={{ username: member }}>
      {({ loading: queryLoading, error: queryError, data: queryData }) => {
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
            <ul>
              <li>
                <strong>Date account created:</strong>{' '}
                {format(user.createdAt, 'm-d-yyyy')}
              </li>
              <li>
                <strong>Last login:</strong>{' '}
                {user.lastLogin && format(new Date(user.lastLogin), 'm-d-yyyy')}
              </li>
              <li>
                <strong>Runs attended:</strong> {runs.length || '0'}{' '}
                {runs.length > 0 && (
                  <>{`last: ${format(
                    new Date(runs[0].startTime),
                    'm-d-yyyy',
                  )}`}</>
                )}
              </li>
              <li>
                <strong>Meetings attended:</strong> {meetings.length || '0'}{' '}
                {meetings.length > 0 && (
                  <>{`last: ${format(
                    new Date(meetings[0].startTime),
                    'm-d-yyyy',
                  )}`}</>
                )}
              </li>
              {user.joined ? (
                <>
                  <li>
                    <strong>Date joined:</strong>{' '}
                    {user.joined
                      ? format(new Date(user.joined), 'm-d-yyyy')
                      : 'n/a'}
                  </li>

                  <li>
                    <strong>Dues last received:</strong>{' '}
                    {duesLastReceived &&
                      format(new Date(duesLastReceived.time), 'm-d-yyyy')}
                  </li>
                </>
              ) : (
                <li>
                  <strong>Eligible for membership:</strong>{' '}
                  {runs.length &&
                  runs.length > 0 &&
                  meetings &&
                  meetings.length > 0
                    ? 'Yes'
                    : 'No'}
                </li>
              )}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default AdminOverview;
