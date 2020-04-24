import React from 'react';
import { Query } from '@apollo/react-components';
import { Link } from 'react-router-dom';
// import get from 'lodash/get';

import ErrorMessage from '../../utility/ErrorMessage';
import { TRAILS_QUERY } from './trailsList.graphql.js';
// import {
//   StyledEvents,
//   StyledEventsList,
//   StyledEvent,
// } from './eventList.styles';
// import AttendeeStatus from '../AttendeeStatus';
// import {
//   DEFAULT_EVENT_SMALL_SRC,
//   DEFAULT_AVATAR_SMALL_SRC,
// } from '../../../lib/constants';

const TrailsList = () => {
  return (
    <Query query={TRAILS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { trails } = data;

        return (
          <>
            {trails.length > 0 ? (
              <ul>
                {trails.map((trail) => {
                  return (
                    <li key={trail.slug}>
                      {trail.name} -{' '}
                      <Link to={`/trail/${trail.slug}/edit`}>Edit</Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h3>No trails yet</h3>
            )}
          </>
        );
      }}
    </Query>
  );
};

export default TrailsList;
