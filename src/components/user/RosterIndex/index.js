import React, { useCallback } from 'react';
import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Switch from '../../common/Switch';
import Rigbook from '../Rigbook';
import Roster from '../Roster';

import Styles from './rosterIndex.module.scss';

const RosterIndex = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();
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
    <div className={Styles['rigbook-index']}>
      <nav className={Styles['rigbook-nav']}>
        <Switch
          offLabel="Rigbook"
          offIcon="rigbook"
          onLabel="List"
          onIcon="list"
          onClick={handleClick}
          onToStart={pathname.includes('/list')}
        />
      </nav>

      <Route exact path={path} component={Rigbook} />
      <Route path={`${path}/list`} component={Roster} />
    </div>
  );
};

export default RosterIndex;
