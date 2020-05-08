import React, { useCallback } from 'react';
import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Switch from '../../common/Switch';
import EventList from '../EventList';

import Styles from './eventsIndex.module.scss';

const EventsIndex = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();
  const handleClick = useCallback(
    (isPastEvents) => {
      if (isPastEvents) {
        push(`${url}/past`);
      } else {
        push(`${url}`);
      }
    },
    [push, url],
  );

  return (
    <div>
      <nav className={Styles['event-nav']}>
        <Switch
          offLabel="Upcoming"
          onLabel="Past"
          onClick={handleClick}
          onToStart={pathname.includes('/past')}
        />
      </nav>

      <Route exact path={path}>
        <EventList upcoming="true" />
      </Route>
      <Route path={`${path}/past`}>
        <EventList />
      </Route>
    </div>
  );
};

export default EventsIndex;
