import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import cn from 'classnames';

import Icon from '../../common/Icon';
import { accountTypes, DEFAULT_AVATAR_SRC } from '../../../lib/constants';

import Styles from './attendeeCard.module.scss';

const AttendeeCard = ({ rsvp, startOpen = false, isLeader = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const detailsClassNames = cn(Styles['details'], {
    [Styles['details--open']]: isOpen,
  });

  const cardClassNames = cn(Styles['card'], {
    [Styles['card--leader']]: isLeader,
  });

  const { member } = rsvp;
  const passengerCount = rsvp.guestCount || 0;
  const AVATAR_SRC = get(member, 'avatar.url', DEFAULT_AVATAR_SRC);
  const memberType =
    member.accountType === 'GUEST'
      ? 'Guest'
      : `${accountTypes[member.accountType]} Member`;
  const vehicle =
    member.vehicle &&
    `${member.vehicle.year} ${member.vehicle.make} ${
      member.vehicle.model
    } ${get(member, 'vehicle.trim', '')}`.trim();
  const vehicleDetails =
    !vehicle || member.isRider ? 'Rider' : vehicle || 'Driver';

  return (
    <div className={cardClassNames}>
      <div className={Styles['main']}>
        <div className={Styles['main-container']}>
          <div className={Styles['avatar-wrapper']}>
            <img
              className={Styles['avatar']}
              src={AVATAR_SRC}
              alt={`${member.firstName} ${member.lastName} avatar`}
            />
            {passengerCount > 0 && (
              <span
                className={Styles['passengersCount']}
                title={`${passengerCount} passenger(s)`}
              >
                {passengerCount}
              </span>
            )}
          </div>

          <div className={Styles['main__heading']}>
            <h3>
              {member.firstName} {member.lastName}
            </h3>
            <p>{memberType}</p>
            <p>{vehicleDetails}</p>
          </div>
        </div>

        <button className={Styles['open__button']} onClick={handleToggle}>
          <Icon icon={isOpen ? 'arrow-up' : 'arrow-down'}>Toggle Details</Icon>
        </button>
      </div>
      <div className={detailsClassNames}>
        {member.equipment && member.equipment.length > 0 && (
          <p>
            <h5>Equipment</h5>
            {member.equipment.join(', ')}
          </p>
        )}

        <ul className={Styles['details-list']}>
          <li>
            <Icon className={Styles['details-list__icon']} icon="run">
              Events Count
            </Icon>{' '}
            {member.runsAttendedCount || 0}
          </li>
          <li>
            <Icon
              className={cn(
                Styles['details-list__icon'],
                Styles['details-list__icon--location'],
              )}
              icon="location"
            >
              Location
            </Icon>{' '}
            {member.contactInfo.city}, {member.contactInfo.state}
          </li>
          <li>
            <Icon className={Styles['details-list__icon']} icon="mail">
              Send Message
            </Icon>{' '}
            <a href={`mailto:${member.email}`}>Send Message</a>
          </li>
          <li>
            <Icon className={Styles['details-list__icon']} icon="profile">
              Profile
            </Icon>{' '}
            <Link to={`/profile/${member.username}`}>View Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AttendeeCard;

/* 
<Attendee>
  <Name />
  <AccountType />

  <AddlInfo>
    <TitlesOrOffices />
    <Hometown />
    <MemberSince />

    <EventsCount />
    <SendMessage />
    <ProfileLink /> // Icon - @username
  </AddlInfo>

  <Drivers>
    <Rig />
    <Equipment />
  </Drivers>
</Attendee> 
*/
