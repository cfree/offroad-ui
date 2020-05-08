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
  isMember,
} from '../../../lib/utils';

import Styles from './dashboard.module.scss';

const SampleError = () => {};

const Dashboard = () => (
  <div className={Styles['dashboard']}>
    <Filter statusCheck={isNotLocked}>
      <div className={Styles['two-thirds']}>
        <div className={Styles['container']}>
          <NextEvent />
          <SampleError />
        </div>
      </div>
      <div className={Styles['third']}>
        <EventsSchedule />
      </div>
      <Filter typeCheck={isMember}>
        <div className={Styles['third']}>
          <Link to="/roster" className={Styles['roster-link']}>
            Roster
          </Link>
        </div>
        <div className={Styles['third']}>
          <Link to="/history" className={Styles['history-link']}>
            Club History
          </Link>
        </div>
        <div className={Styles['third']}>
          <Link to="/documents" className={Styles['document-link']}>
            Documents
          </Link>
        </div>

        {/* <div className={Styles['two-thirds']}>
          <RecentPhotos />
        </div>

          <RunReports />
          <RecentCheckIns />
        </div>
      </div> */}
        {/* <PollingPlace /> */}
      </Filter>
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
