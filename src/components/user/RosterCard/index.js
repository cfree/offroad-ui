import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import get from 'lodash/get';
import cn from 'classnames';

import { getMemberType, getPhoneNumber } from '../../../lib/utils';
import Avatar from '../../common/Avatar';
import { DEFAULT_AVATAR_SMALL_SRC } from '../../../lib/constants';

import Styles from './rosterCard.module.scss';

const RosterCard = ({ user, className }) => {
  const classes = cn(Styles['roster-card'], className);
  const phone = get(user, 'contactInfo.phone', '');
  const match = useRouteMatch('/admin/roster');
  const linkTo =
    match && match.isExact
      ? `/admin/profile/${user.username}`
      : `/profile/${user.username}`;

  return (
    <tr className={classes}>
      <td>
        <Avatar
          className={Styles['member__img']}
          src={user.avatar && user.avatar.smallUrl}
          alt={user.firstName}
        />
      </td>
      <td>
        <Link to={linkTo}>
          {user.firstName} {user.lastName}
        </Link>
      </td>
      <td>{getMemberType(user.accountType)}</td>
      <td>{phone && phone !== '0000000000' && getPhoneNumber(phone)}</td>
    </tr>
  );
};

export default RosterCard;
