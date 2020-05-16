import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import cn from 'classnames';

import {
  getMemberType,
  getPhoneNumber,
  isAtLeastBoardMember,
} from '../../../lib/utils';
import { DEFAULT_AVATAR_SMALL_SRC } from '../../../lib/constants';
import Filter from '../../login/Filter';

import Styles from './rosterCard.module.scss';

const RosterCard = ({ user, className }) => {
  const classes = cn(Styles['roster-card'], className);
  const phone = get(user, 'contactInfo.phone', '');

  return (
    <tr className={classes}>
      <td>
        <img
          className={Styles['member__img']}
          src={
            (user.avatar && user.avatar.smallUrl) || DEFAULT_AVATAR_SMALL_SRC
          }
          alt={user.firstName}
        />
      </td>
      <td>
        <Link to={`/profile/${user.username}`}>
          {user.firstName} {user.lastName}
        </Link>
      </td>
      <td>{getMemberType(user.accountType)}</td>
      <td>{phone && getPhoneNumber(phone)}</td>
    </tr>
  );
};

export default RosterCard;
