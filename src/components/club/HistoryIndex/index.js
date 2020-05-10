import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

import History from '../History';
import Officers from '../Officers';
import InMemoriam from '../InMemoriam';
import Tabs from '../../common/Tabs';

import Styles from './historyIndex.module.scss';

const ProfileIndex = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className={Styles['history']}>
      <h2>Club History</h2>
      <Tabs
        tabs={[
          {
            link: `/history`,
            title: 'Details',
            activeStyles:
              !pathname.includes('/officers') &&
              !pathname.includes('/in-memoriam'),
          },
          {
            link: `/history/officers`,
            title: 'Officers',
            activeStyles: pathname.includes('/officers'),
          },
          {
            link: `/history/in-memoriam`,
            title: 'In Memoriam',
            activeStyles: pathname.includes('/in-memoriam'),
          },
        ]}
      />

      <Switch>
        <Route path={`${path}/officers`}>
          <Officers />
        </Route>
        <Route path={`${path}/in-memoriam`}>
          <InMemoriam />
        </Route>
        <Route exact path={path}>
          <History />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default ProfileIndex;
