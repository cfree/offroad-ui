import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Tabs from '../../common/Tabs';
import EditProfile from '../EditProfile';
import EditGarage from '../../vehicles/EditGarage';
import EditAccount from '../EditAccount';
import EditNotifications from '../EditNotifications';

import Styles from './settingsIndex.module.scss';

const SettingsIndex = () => {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();

  return (
    <>
      <h2>Settings</h2>

      <div className={Styles['nav']}>
        <Tabs
          tabs={[
            {
              link: `/settings/profile`,
              title: 'Profile',
              activeStyles: pathname.includes('/profile'),
            },
            {
              link: `/settings/garage`,
              title: 'Garage',
              activeStyles: pathname.includes('/garage'),
            },
            {
              link: `/settings/account`,
              title: 'Account',
              activeStyles: pathname.includes('/account'),
            },
            {
              link: `/settings/notifications`,
              title: 'Notifications',
              activeStyles: pathname.includes('/notifications'),
            },
          ]}
        />
      </div>

      <Switch>
        <Route path={`${path}/profile`}>
          <EditProfile />
        </Route>
        <Route path={`${path}/garage`}>
          <EditGarage />
        </Route>
        <Route path={`${path}/account`}>
          <EditAccount />
        </Route>
        <Route path={`${path}/notifications`}>
          <EditNotifications />
        </Route>
        <Redirect exact from={path} to={`${path}/account`} />
        <Redirect from="*" to="/404" />
      </Switch>
    </>
  );
};

export default SettingsIndex;
