import React, { Component } from 'react';

import Filters from '../../user/Filters';
import Roster from '../../user/Roster';
import Button from '../../common/Button';

import Styles from './membershipList.module.scss';

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
          <h3>Filter Presets</h3>

          <ul className={Styles['button-list']}>
            <li>
              <Button onClick={this.handleDefault}>Active Members</Button>
            </li>
            <li>
              <Button onClick={this.handleActiveGuests}>Active Guests</Button>
            </li>
            <li>
              <Button onClick={this.handleShowNewRegs}>
                Locked New Registrations
              </Button>
            </li>
            <li>
              <Button onClick={this.handleShowPastDue}>
                Past Due Full Members
              </Button>
            </li>
            <li>
              <Button onClick={this.handleShowDelinquent}>
                Delinquent Full Members
              </Button>
            </li>
            <li>
              <Button onClick={this.handleShowInactive}>
                Inactive Full Members
              </Button>
            </li>
            <li>
              <Button onClick={this.handleClear}>Clear Filters</Button>
            </li>
          </ul>
        </aside>

        <section>
          <h3>Filters</h3>
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
