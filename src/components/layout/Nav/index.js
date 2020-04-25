import React, { useCallback, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import get from 'lodash/get';

import User from '../../user/User';
import Logout from '../../login/Logout';
import { DEFAULT_AVATAR_SMALL_SRC } from '../../../lib/constants';
import { isActive, isMember, isAtLeastBoardMember } from '../../../lib/utils';

import Styles from './nav.module.scss';

const Nav = ({ router, ...props }) => {
  const { path, url: pathname } = useRouteMatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <nav>
      <ul className={Styles['nav']}>
        <User>
          {({ error, loading, data }) => {
            if (error) {
              console.error(error);
            }

            if (!data) {
              return null;
            }

            const { myself } = data;

            const AVATAR_SRC = get(
              myself,
              'avatar.smallUrl',
              DEFAULT_AVATAR_SMALL_SRC,
            );

            return (
              myself && (
                <>
                  <li className={pathname === '/' ? 'active' : ''}>
                    <Link to="/">Dashboard</Link>
                  </li>
                  {isActive(myself.accountStatus) &&
                    isMember(myself.accountType) && (
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
                      <li className={pathname === '/admin' ? 'active' : ''}>
                        <Link to="/admin">Admin</Link>
                      </li>
                    )}
                  <li
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="user"
                  >
                    <img
                      className="user-image"
                      src={AVATAR_SRC}
                      height="30"
                      alt="Avatar"
                    />
                    <ul
                      className={cn('dropdown-menu', {
                        'dropdown-menu--open': isOpen,
                      })}
                    >
                      <li className={pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile">Profile</Link>
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
              )
            );
          }}
        </User>
      </ul>
    </nav>
  );
};

export default Nav;
