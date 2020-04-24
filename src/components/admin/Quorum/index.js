import React, { useState, useCallback } from 'react';
import { Query } from '@apollo/react-components';
import get from 'lodash/get';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import ErrorMessage from '../../utility/ErrorMessage';
// import Button from '../../common/Button';
import {
  accountTypes,
  DEFAULT_AVATAR_SRC,
  accountStatuses,
} from '../../../lib/constants';
import { QUORUM_QUERY } from './quorum.graphql';

import './quorum.module.scss';

const Quorum = () => {
  const [present, setPresent] = useState(0);

  const handleCheck = useCallback(
    (e) => {
      if (e.target.checked) {
        setPresent(present + 1);
      } else {
        setPresent(present - 1);
      }
    },
    [present, setPresent],
  );

  const determineQuorum = useCallback(
    (total) => {
      const percentage = present / total;
      const hasQuorum =
        percentage >= 1 / 3
          ? '<span className="quorum-yes">Yes</span>'
          : '<span className="quorum-no">No</span>';

      return `${hasQuorum} (${100 * percentage}%)`;
    },
    [present],
  );

  return (
    <Query query={QUORUM_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { users } = data;

        return (
          <div className="quorum">
            <h2>Meeting Quorum</h2>

            <div className="cols">
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Account Type</th>
                    <th>Account Status</th>
                    <th>Present</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const AVATAR_SRC = get(
                      user,
                      'avatar.url',
                      DEFAULT_AVATAR_SRC,
                    );

                    return (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={AVATAR_SRC}
                            alt={`${user.firstName} ${user.lastName}`}
                            width="50"
                            height="50"
                          />
                        </td>
                        <td>
                          <Link to={`/admin-profile/${user.username}`}>
                            {user.firstName} {user.lastName}
                          </Link>
                        </td>
                        <td>{accountTypes[user.accountType]}</td>
                        <td>{accountStatuses[user.accountStatus]}</td>
                        <td>
                          <input type="checkbox" onChange={handleCheck} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <p>Total Members: {users.length}</p>
                <p>Total Present: {present}</p>

                <p>Quorum: {parse(determineQuorum(users.length))}</p>
              </div>
            </div>
            {/* <Button>Record</Button> */}
          </div>
        );
      }}
    </Query>
  );
};

export default Quorum;
