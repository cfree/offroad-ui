import React, { useCallback } from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import Switch from '../../common/Switch';
import EventList from '../EventList';

const EventIndex = () => {
  const { push } = useHistory();
  let { path, url } = useRouteMatch();
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
      <nav>
        <Switch
          offLabel="Upcoming"
          onLabel="Past"
          onClick={handleClick}
          onToStart={url.includes('/past')}
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

export default EventIndex;
