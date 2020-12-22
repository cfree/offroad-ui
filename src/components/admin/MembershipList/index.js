import React, { Component } from 'react';

import Filters from '../../user/Filters';
import Roster from '../../user/Roster';

export class MembershipList extends Component {
  state = {
    activeFilters: {
      accountStatus: ['ACTIVE'],
      accountType: ['FULL', 'ASSOCIATE', 'EMERITUS'],
      role: [],
      office: [],
      title: [],
    },
    searchTerm: '',
  };

  handleFilterUpdate = (updatedVals, filter) => {
    this.setState((state) => {
      console.log('old State', state);
      return {
        activeFilters: {
          ...state.activeFilters,
          [filter]:
            updatedVals === null
              ? []
              : Object.values(updatedVals).map((obj) => obj.value),
        },
      };
    });
  };

  handleDefault = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['ACTIVE'],
        accountType: ['FULL', 'ASSOCIATE', 'EMERITUS'],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleActiveGuests = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['ACTIVE'],
        accountType: ['GUEST'],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleClear = () => {
    this.setState({
      activeFilters: {
        accountStatus: [],
        accountType: [],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleShowPastDue = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['PAST_DUE'],
        accountType: ['FULL'],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleShowDelinquent = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['DELINQUENT'],
        accountType: ['FULL'],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleShowInactive = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['INACTIVE'],
        accountType: ['FULL'],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  handleShowNewRegs = () => {
    this.setState({
      activeFilters: {
        accountStatus: ['LOCKED'],
        accountType: [],
        role: [],
        office: [],
        title: [],
      },
    });
  };

  render() {
    return (
      <div>
        <h2>Membership</h2>

        <aside>
          <h3>Quick Filters</h3>

          <ul>
            <li>
              <button onClick={this.handleDefault}>Active Members</button>
            </li>
            <li>
              <button onClick={this.handleActiveGuests}>Active Guests</button>
            </li>
            <li>
              <button onClick={this.handleShowNewRegs}>
                Locked New Registrations
              </button>
            </li>
            <li>
              <button onClick={this.handleShowPastDue}>
                Past Due Full Members
              </button>
            </li>
            <li>
              <button onClick={this.handleShowDelinquent}>
                Delinquent Full Members
              </button>
            </li>
            <li>
              <button onClick={this.handleShowInactive}>
                Inactive Full Members
              </button>
            </li>
            <li>
              <button onClick={this.handleClear}>Clear Filters</button>
            </li>
          </ul>
        </aside>

        <section>
          <Filters
            activeFilters={this.state.activeFilters}
            onFilterUpdate={this.handleFilterUpdate}
          />
          {/* 1-25 of x results */}
          <Roster filters={this.state.activeFilters} />
        </section>
      </div>
    );
  }
}

export default MembershipList;
