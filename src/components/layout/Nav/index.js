import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import get from 'lodash/get';

import useUser from '../../../hooks/useUser';
import Logout from '../../login/Logout';
import { DEFAULT_AVATAR_SMALL_SRC } from '../../../lib/constants';
import { isActive, isMember, isAtLeastBoardMember } from '../../../lib/utils';

import Styles from './nav.module.scss';

const Nav = ({ openMobileNav, router, ...props }) => {
  const { path, url: pathname } = useRouteMatch();
  const { loading, error, data } = useUser();

  const navClasses = cn(Styles['nav-list'], {
    [Styles['mobile-nav-list--open']]: openMobileNav,
  });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const { myself } = data;

  const AVATAR_SRC = get(myself, 'avatar.smallUrl', DEFAULT_AVATAR_SMALL_SRC);

  return (
    <>
      <nav className={Styles['nav']}>
        <ul className={navClasses}>
          {myself && (
            <>
              <li className={pathname === '/' ? 'active' : ''}>
                <Link to="/">Dashboard</Link>
              </li>
              {isActive(myself.accountStatus) && isMember(myself.accountType) && (
                <li
                  className={
                    pathname === '/roster' || pathname === '/roster/list'
                      ? 'active'
                      : ''
                  }
                >
                  <Link to="/roster">Roster</Link>
                </li>
              )}
              {isActive(myself.accountStatus) && (
                <li
                  className={
                    pathname === '/events' ||
                    pathname === '/events/past' ||
                    path === '/event/:id'
                      ? 'active'
                      : ''
                  }
                >
                  <Link to="/events">Events</Link>
                </li>
              )}
              {isActive(myself.accountStatus) &&
                isAtLeastBoardMember(myself.role) && (
                  <li className={pathname.includes('/admin') ? 'active' : ''}>
                    <Link to="/admin">Admin</Link>
                  </li>
                )}
              <li className={Styles['nav-user']} tabIndex={0}>
                <img
                  className={Styles['user-image']}
                  src={AVATAR_SRC}
                  height="30"
                  alt="Avatar"
                />
                <ul>
                  <li className={pathname === '/profile' ? 'active' : ''}>
                    <Link to={`/profile/${myself.username}`}>Profile</Link>
                  </li>
                  <li className={pathname === '/settings' ? 'active' : ''}>
                    <Link to="/settings/account">Account</Link>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
