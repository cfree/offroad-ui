import React from 'react';
import { Link } from 'react-router-dom';

import Filter from '../../login/Filter';
// import PollingPlace from '../../voting/PollingPlace';
import NextEvent from '../NextEvent';
import EventsSchedule from '../EventsSchedule';
// import RunReports from '../RunReports';
// import RecentPhotos from '../RecentPhotos';
// import RecentCheckIns from '../RecentCheckIns';
import {
  // isFullMember,
  // isNotFullMember,
  isNotLocked,
  isLocked,
} from '../../../lib/utils';

import './dashboard.module.scss';

const Dashboard = () => (
  <div className="dashboard">
    <Filter statusCheck={isNotLocked}>
      <div className="two-thirds">
        <div className="container">
          <NextEvent />
        </div>
        <div className="container">
          <EventsSchedule />
        </div>
      </div>

      <div className="third">
        <div className="container">
          <Link to="/roster" className="roster-link">
            Roster
          </Link>
        </div>
        <div className="container">
          <Link to="/history" className="history-link">
            Club History
          </Link>
        </div>
        <div className="container">
          <Link to="/documents" className="document-link">
            Documents
          </Link>
        </div>
      </div>

      {/* <div className="two-thirds">
        <div className="container">
          <RecentPhotos />
        </div>

        <div className="container">
          <RunReports />
          <RecentCheckIns />
        </div>
      </div> */}
      {/* <PollingPlace /> */}
    </Filter>
    <Filter statusCheck={isLocked}>
      <p>
        Your account is being reviewed. To expedite this process,{' '}
        <Link to="/settings/profile">fill out your profile</Link> and{' '}
        <Link to="/settings/garage">add your rig</Link>.
      </p>
    </Filter>
  </div>
);

export default Dashboard;
