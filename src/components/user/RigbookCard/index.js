import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import get from 'lodash/get';

import { getMemberType, isAtLeastRunLeader } from '../../../lib/utils';
import {
  offices,
  DEFAULT_AVATAR_SRC,
  DEFAULT_RIG_SRC,
} from '../../../lib/constants';
import Filter from '../../login/Filter';

import './rigbookCard.module.scss';

const RigbookCard = ({ user }) => {
  const RIG_SRC = get(user, 'rig.image.url', DEFAULT_RIG_SRC);
  const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);

  return (
    <div className="rigbook-card">
      <div className="user-photos">
        <img
          className="vehicle-img"
          src={RIG_SRC}
          alt={`${user.firstName}'s Vehicle`}
        />
        <img className="user-img" src={AVATAR_SRC} alt={user.firstName} />
      </div>
      <div className="content">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        {user.office && <div className="titles">{offices[user.office]}</div>}
        {user.titles && <div className="titles">{user.titles.join(', ')}</div>}
        {user.vehicle && (
          <>
            <h3>
              {user.vehicle.year} {user.vehicle.make} {user.vehicle.model}
            </h3>
            {user.vehicle.trim && <h4>{user.vehicle.trim}</h4>}
          </>
        )}
        <h5>
          {getMemberType(user.accountType)}
          {user.joined && ` • Joined ${format(user.joined, 'yyyy')}`}
        </h5>
      </div>
      <ul className="profile-actions-list">
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
