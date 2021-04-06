import React, { useCallback } from 'react';
import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Switch from '../../common/Switch';
import EventList from '../EventList';
import { useQueryParams } from '../../../hooks/useQueryParams';

import Styles from './eventsIndex.module.scss';

const EventsIndex = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();
  const { page } = useQueryParams();

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
        <EventList page={parseInt(page, 10)} upcoming />
      </Route>
      <Route path={`${path}/past`}>
        <EventList page={parseInt(page, 10)} />
      </Route>
    </div>
  );
};

export default EventsIndex;
