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
      <Query query={MEMBERSHIP_QUERY} variables={filters}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div className={Styles['roster']}>
              <div className={Styles['roster-header']}>
                <span />
                <strong>Name</strong>
                <strong>Account Type</strong>
                <strong>Phone</strong>
                <span />
                <span />
                <span />
              </div>
              {data.users.map((user) => (
                <RosterCard key={user.id} user={user} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Roster;
