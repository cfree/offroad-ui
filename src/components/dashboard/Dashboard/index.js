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
  wasRemoved,
  wasNotRemoved,
  hasResigned,
  hasNotResigned,
  isNotInactive,
  isInactive,
  isNotLocked,
  isNotLimited,
  isLocked,
  isLimited,
  isMember,
  isDeceasedMember,
  isNotDeceasedMember,
  isDelinquent,
  isNotDelinquent,
} from '../../../lib/utils';

import Styles from './dashboard.module.scss';

const Dashboard = () => (
  <div>
    <Filter statusCheck={isNotInactive}>
      <Filter statusCheck={isNotLimited}>
        <Filter statusCheck={wasNotRemoved}>
          <Filter statusCheck={hasNotResigned}>
            <Filter statusCheck={isNotLocked}>
              <Filter typeCheck={isNotDeceasedMember}>
                <div className={Styles['dashboard']}>
                  <Filter statusCheck={isNotDelinquent}>
                    <div className={Styles['two-thirds']}>
                      <div className={Styles['container']}>
                        <NextEvent />
                      </div>
                    </div>
                    <div className={Styles['third']}>
                      <EventsSchedule />
                    </div>
                  </Filter>

                  <Filter typeCheck={isMember}>
                    <Filter statusCheck={isNotDelinquent}>
                      <div className={Styles['third']}>
                        <Link to="/roster" className={Styles['roster-link']}>
                          Roster
                        </Link>
                      </div>
                    </Filter>
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
                </div>
              </Filter>
            </Filter>
          </Filter>
        </Filter>
      </Filter>
    </Filter>

    <Filter statusCheck={isInactive}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is inactive. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
    <Filter statusCheck={isLimited}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is locked. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
    <Filter statusCheck={isLocked}>
      <>
        <h2>Welcome!</h2>
        <p>
          Your account is being reviewed. To expedite this process,{' '}
          <Link to="/settings/profile">fill out your profile</Link> and{' '}
          <Link to="/settings/garage">add your rig</Link>.
        </p>
      </>
    </Filter>
    <Filter statusCheck={isDelinquent}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is locked. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
    <Filter typeCheck={isDeceasedMember}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is locked. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
    <Filter statusCheck={wasRemoved}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is locked. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
    <Filter statusCheck={hasResigned}>
      <>
        <h2>Dashboard</h2>
        <p>
          Your account is locked. Review your{' '}
          <Link to="/settings/account">account settings</Link> for more details.
        </p>
      </>
    </Filter>
  </div>
);

export default Dashboard;
