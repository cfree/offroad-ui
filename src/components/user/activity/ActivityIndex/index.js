import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import Profile from '../../Profile';
import Activity from '../Activity';
import Garage from '../../../vehicles/Garage';
import ProfileHeader from '../../ProfileHeader';
import useUser from '../../../../hooks/useUser';

import Styles from './activityIndex.module.scss';

const ActivityIndex = () => {
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
      {/* <Breadcrumbs /> */}

      <Switch>
        {/* <Route path={`${path}/trails`}>
          <TrailActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/run-leader`}>
          <RunLeaderActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/bandaids`}>
          <BandaidsActivity username={username} isSelf={isSelf} />
        </Route>
        <Route path={`${path}/events`}>
          <EventsActivity username={username} isSelf={isSelf} />
        </Route> */}
        <Route exact path={path}>
          <Activity username={username} isSelf={isSelf} />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default ActivityIndex;
