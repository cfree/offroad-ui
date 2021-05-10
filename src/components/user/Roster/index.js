import React, { Component } from 'react';
import { Query } from '@apollo/react-components';

import { MEMBERSHIP_QUERY } from './roster.graphql';
import RosterCard from '../RosterCard';

import Styles from './roster.module.scss';

export class Roster extends Component {
  static defaultProps = {
    filters: {
      accountStatus: ['ACTIVE'],
      accountType: ['FULL', 'ASSOCIATE', 'EMERITUS'],
      role: [],
      office: [],
      title: [],
    },
  };

  render() {
    const { filters } = this.props;

    return (
      <>
        <h2>Roster</h2>
        <Query query={MEMBERSHIP_QUERY} variables={filters}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>Error: {error.message}</div>;
            }

            const { users } = data;

            return (
              <>
                <table className={Styles['roster']}>
                  <thead className={Styles['roster-header']}>
                    <tr>
                      <th />
                      <th>Name</th>
                      <th>Account Type</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <RosterCard
                        key={user.id}
                        user={user}
                        className={Styles['roster-card']}
                      />
                    ))}
                  </tbody>
                </table>
                <small>
                  Full:{' '}
                  {users.filter((user) => user.accountType === 'FULL').length}
                </small>
                &nbsp;&#8226;&nbsp;
                <small>
                  Associate:{' '}
                  {
                    users.filter((user) => user.accountType === 'ASSOCIATE')
                      .length
                  }
                </small>
                &nbsp;&#8226;&nbsp;
                <small>
                  Emeritus:{' '}
                  {
                    users.filter((user) => user.accountType === 'EMERITUS')
                      .length
                  }
                </small>
                &nbsp;&#8226;&nbsp;
                <small>Total: {users.length}</small>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Roster;
