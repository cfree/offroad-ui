import React from 'react';
import get from 'lodash/get';
import format from 'date-fns/format';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import cn from 'classnames';

import { PROFILE_HEADER_QUERY } from './profileHeader.graphql';
import {
  accountTypes as types,
  offices,
  titles,
  DEFAULT_AVATAR_SRC,
  DEFAULT_RIG_SRC,
} from '../../../lib/constants';
import {
  // isSelf,
  isAtLeastBoardMember,
  isAtLeastRunLeader,
} from '../../../lib/utils';
import Filter from '../../login/Filter';

import Styles from './profileHeader.module.scss';

const ProfileHeader = ({ username, isSelf }) => {
  const { pathname } = useLocation();
  const { data, loading, error } = useQuery(PROFILE_HEADER_QUERY, {
    variables: { username },
  });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const { user } = data;
  console.log('routematch', pathname);

  const convertedTitles = get(titles, 'user.title', []);
  const RIG_SRC = get(user, 'rig.image.url', DEFAULT_RIG_SRC);
  const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);

  const detailsLink = cn({
    [Styles['active']]:
      !pathname.includes('/garage') && !pathname.includes('/activity'),
  });

  const garageLink = cn({
    [Styles['active']]: pathname.includes('/garage'),
  });

  const activityLink = cn({
    [Styles['active']]: pathname.includes('/activity'),
  });

  return (
    <>
      <header>
        <div
          aria-label={"User's Vehicle"}
          className={Styles['user-vehicle']}
          style={{
            'background-image': `url(${RIG_SRC})`,
          }}
        />

        {user ? (
          <div className={Styles['user-header']}>
            <div className={Styles['user-demographics']}>
              <img src={AVATAR_SRC} height="130" width="130" alt="Avatar" />
              <div className={Styles['user-name-info']}>
                <div className={Styles['user-name']}>
                  <h2 className={Styles['user-full-name']}>
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
                <ul className={Styles['user-info']}>
                  {user.foundingMember ? (
                    <li>Charter Member</li>
                  ) : (
                    <li>{types[user.accountType]} Member</li>
                  )}
                  {(user.office || convertedTitles.length > 0) && (
                    <li>
                      {[offices[user.office], ...convertedTitles].join(', ')}
                    </li>
                  )}
                  <li>Joined {format(new Date(user.joined), 'M/d/yyyy')}</li>
                </ul>
              </div>
            </div>
            <ul className={Styles['user-actions']}>
              {/* {isSelf && (
                <li>
                  <Link to="/settings/profile">Edit Profile</Link>
                </li>
              )} */}
              {/* {!isSelf && isAtLeastRunLeader(user.role) && (
                <li>
                  <Link
                    to={{
                      pathname: 'message',
                      query: { to: user.username },
                    }}
                  >
                    Send Message
                  </Link>
                </li>
              )}{' '}
              */}
            </ul>
          </div>
        ) : (
          <h3>No user information</h3>
        )}
      </header>

      <nav>
        <ul>
          <li>
            <Link className={detailsLink} to={`/profile/${username}`}>
              Details
            </Link>
          </li>
          <li>
            <Link className={garageLink} to={`/profile/${username}/garage`}>
              Garage
            </Link>
          </li>
          <li>
            <Link className={activityLink} to={`/profile/${username}/activity`}>
              Activity
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ProfileHeader;
