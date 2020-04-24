import React, { useCallback } from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import Switch from '../../common/Switch';
import Rigbook from '../Rigbook';
import Roster from '../Roster';

const RosterIndex = () => {
  const { push } = useHistory();
  let { path, url } = useRouteMatch();
  const handleClick = useCallback(
    (isRosterList) => {
      if (isRosterList) {
        push(`${url}/list`);
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
          offLabel="Rigbook"
          onLabel="List"
          onClick={handleClick}
          onToStart={url.includes('/list')}
        />
      </nav>

      <Route exact path={path} component={Rigbook} />
      <Route path={`${path}/list`} component={Roster} />
    </div>
  );
};

export default RosterIndex;
