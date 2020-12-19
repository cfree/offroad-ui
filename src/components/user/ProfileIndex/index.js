import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import Profile from '../Profile';
import ActivityIndex from '../activity/ActivityIndex';
import Garage from '../../vehicles/Garage';
import ProfileHeader from '../ProfileHeader';
import useUser from '../../../hooks/useUser';

import Styles from './profileIndex.module.scss';

const ProfileIndex = () => {
  const query = useParams();
  const { username } = query;
  const { path } = useRouteMatch();
  const { error, loading, data } = useUser();

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const { myself } = data;
  const isSelf = myself.username === username;

  return (
    <div className={Styles['profile']}>
      <ProfileHeader username={username} isSelf={isSelf} />

      <Switch>
        <Route path={`${path}/garage`}>
          <Garage username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/activity`}>
          <ActivityIndex username={username} isSelf={isSelf} />
        </Route>
        <Route exact path={path}>
          <Profile username={username} isSelf={isSelf} />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default ProfileIndex;
