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
import KennysCabin from '../KennysCabin';
// // import MemberAwards from '../MemberAwards';
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
              !pathname.includes('/in-memoriam') &&
              !pathname.includes('/kennys-cabin'),
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
          {
            link: `/history/kennys-cabin`,
            title: "Kenny's Cabin",
            activeStyles: pathname.includes('/kennys-cabin'),
          },
          // {
          //   link: `/history/awards`,
          //   title: 'Awards',
          //   activeStyles: pathname.includes('/awards'),
          // },
        ]}
      />

      <Switch>
        <Route path={`${path}/officers`}>
          <Officers />
        </Route>
        <Route path={`${path}/in-memoriam`}>
          <InMemoriam />
        </Route>
        <Route path={`${path}/kennys-cabin`}>
          <KennysCabin />
        </Route>
        {/* <Route path={`${path}/awards`}>
          <MemberAwards />
        </Route> */}
        <Route exact path={path}>
          <History />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default ProfileIndex;
