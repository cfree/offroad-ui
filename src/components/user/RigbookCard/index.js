import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import get from 'lodash/get';
import cn from 'classnames';

import { getMemberType, isAtLeastRunLeader } from '../../../lib/utils';
import {
  offices,
  DEFAULT_AVATAR_SRC,
  DEFAULT_RIG_SRC,
} from '../../../lib/constants';
import Filter from '../../login/Filter';

import Styles from './rigbookCard.module.scss';

const RigbookCard = ({ user, className }) => {
  const classes = cn(Styles['rigbook-card'], className);
  const RIG_SRC = get(user, 'rig.image.url', DEFAULT_RIG_SRC);
  const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);

  return (
    <div className={classes}>
      <div className={Styles['user-photos']}>
        <img
          className={Styles['vehicle-img']}
          src={RIG_SRC}
          alt={`${user.firstName}'s Vehicle`}
        />
        <img
          className={Styles['user-img']}
          src={AVATAR_SRC}
          alt={user.firstName}
        />
      </div>
      <div className={Styles['content']}>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        {user.office && (
          <small className={Styles['extra']}>{offices[user.office]}</small>
        )}
        {user.vehicle && (
          <>
            <h3>
              {[
                user.vehicle.year || '',
                user.vehicle.make || '',
                user.vehicle.model || '',
              ].join(' ')}
            </h3>
            {user.vehicle.trim && <h4>{user.vehicle.trim}</h4>}
          </>
        )}
        <h5 className={Styles['titles']}>
          <ul>
            <li>{getMemberType(user.accountType)}</li>
            <li>Joined {format(new Date(user.joined), 'yyyy')}</li>
          </ul>
          {user.titles && (
            <ul>
              {user.titles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          )}
        </h5>
      </div>
      <ul className={Styles['profile-actions-list']}>
        {user.username && (
          <>
            <li>
              <Link to={`/profile/${user.username}`}>View Profile</Link>
            </li>
            <Filter roleCheck={isAtLeastRunLeader}>
              <li>
                <Link to={`/message${user.username}`}>Message</Link>
              </li>
            </Filter>
          </>
        )}
      </ul>
    </div>
  );
};

export default RigbookCard;
