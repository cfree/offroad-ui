import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cn from 'classnames';

import { RSVP_MUTATION } from './rsvp.graphql';
import { EVENT_QUERY } from '../EventDetails/eventDetails.graphql';
import Icon from '../../common/Icon';

import Styles from './rsvp.module.scss';

// interface RsvpProps {
//   userStatus: string;
//   attendeeCount: number;
//   userId: string;
//   eventId: string;
//   pastEvent: boolean;
// }

const Rsvp = ({ userStatus, attendeeCount, userId, eventId, pastEvent }) => {
  const [localUserStatus, setLocalUserStatus] = useState(userStatus);
  const [localAttendeeCount, setLocalAttendeeCount] = useState(attendeeCount);
  const [setRsvp, { loading, error }] = useMutation(RSVP_MUTATION, {
    refetchQueries: [
      {
        query: EVENT_QUERY,
        variables: { eventId },
      },
    ],
  });

  const handleYesClick = useCallback(() => {
    if (localUserStatus === 'GOING') {
      return;
    }

    const set = async () => {
      await setRsvp({
        variables: {
          rsvp: {
            userId,
            eventId,
            status: 'GOING',
          },
        },
      });

      setLocalUserStatus('GOING');
      setLocalAttendeeCount(localAttendeeCount + 1);
    };

    set();
  }, [
    localUserStatus,
    localAttendeeCount,
    setLocalUserStatus,
    setLocalAttendeeCount,
    setRsvp,
    userId,
    eventId,
  ]);

  const handleNoClick = useCallback(() => {
    if (localUserStatus === 'CANT_GO') {
      return;
    }

    console.log('userStatus', userStatus);

    const set = async () => {
      await setRsvp({
        variables: {
          rsvp: {
            userId,
            eventId,
            status: 'CANT_GO',
          },
        },
      });

      // If original RSVP === null, record RSVP but don't count as attendee
      if (localUserStatus !== 'NONE') {
        setLocalAttendeeCount(localAttendeeCount - 1);
      }

      setLocalUserStatus('CANT_GO');
    };

    set();
  }, [
    localUserStatus,
    localAttendeeCount,
    userStatus,
    setLocalUserStatus,
    setLocalAttendeeCount,
    setRsvp,
    userId,
    eventId,
  ]);

  // const handleNoClick = useCallback((status, callback) => {
  //   let count;

  //   // console.log('state status', state.status);
  //   // console.log('userStatus props', this.props.userStatus);

  //   if (localUserStatus === userStatus) {
  //     // Has not RSVPd
  //     switch (status) {
  //       case 'GOING':
  //         count = ++state.attendeeCount;
  //         break;
  //       case 'CANT_GO':
  //       case 'MAYBE':
  //         count = --state.attendeeCount;
  //         break;
  //       default:
  //         count = state.attendeeCount;
  //     }
  //   } else {
  //     // Has RSVPd
  //     // switch (status) {
  //     //   case 'CANT_GO':
  //     //   case 'MAYBE':
  //     //     count = --state.attendeeCount;
  //     //     break;
  //     //   case 'GOING':
  //     //   default:
  //     //     count = state.attendeeCount;
  //     // }

  //     if (
  //       localUserStatus === 'GOING' &&
  //       (status === 'MAYBE' || status === 'CANT_GO')
  //     ) {
  //       count = --state.attendeeCount;
  //     } else if (
  //       (localUserStatus === 'MAYBE' || localUserStatus === 'CANT_GO') &&
  //       status === 'GOING'
  //     ) {
  //       count = ++state.attendeeCount;
  //     } else {
  //       count = state.attendeeCount;
  //     }
  //   }

  //   return {
  //     status,
  //     attendeeCount: count,
  //   };

  //   setUserLocalState();
  //   setRsvp({
  //     variables: {
  //       rsvp: {
  //         userId: userId,
  //         eventId: eventId,
  //         status: localUserStatus,
  //       },
  //     },
  //   });
  // }, []);

  const getPastRsvpText = useCallback(() => {
    switch (localUserStatus) {
      case 'GOING':
        return `You went`;
      case 'MAYBE':
      case 'CANT_GO':
      default:
        return `You didn't go`;
    }
  }, [localUserStatus]);

  const getPastCountText = useCallback(() => {
    switch (localAttendeeCount) {
      case 0:
        return `Nobody went`;
      case 1:
        return `1 person went`;
      default:
        return `${localAttendeeCount} people went`;
    }
  }, [localAttendeeCount]);

  const getRsvpText = useCallback(() => {
    switch (localUserStatus) {
      case 'GOING':
        return `You're going`;
      case 'MAYBE':
        return `You're considering it`;
      case 'CANT_GO':
        return `You're not going`;
      default:
        return 'Are you going?';
    }
  }, [localUserStatus]);

  const yesDisabled = loading || localUserStatus === 'GOING';
  const noDisabled = loading || localUserStatus === 'CANT_GO';

  const yesIconClasses = cn({
    [Styles['icon-yes']]: localUserStatus === 'NONE',
    [Styles['icon-yes--selected']]: localUserStatus === 'GOING',
    [Styles['icon-yes--not-selected']]: localUserStatus === 'CANT_GO',
    [Styles['icon--disabled']]: loading,
  });

  const noIconClasses = cn({
    [Styles['icon-no']]: localUserStatus === 'NONE',
    [Styles['icon-no--selected']]: localUserStatus === 'CANT_GO',
    [Styles['icon-no--not-selected']]: localUserStatus === 'GOING',
    [Styles['icon--disabled']]: loading,
  });

  return pastEvent ? (
    <div className={Styles['rsvp__status--past']}>
      {getPastRsvpText()}{' '}
      <span className={Styles['rsvp__count--past']}>{getPastCountText()}</span>
    </div>
  ) : (
    <div className={Styles['rsvp__status--upcoming']}>
      <div className={Styles['rsvp__attendees']}>
        {getRsvpText()}
        <span className={Styles['rsvp__count']}>
          {localAttendeeCount} going
        </span>
      </div>
      <div className={Styles['rsvp__actions']}>
        <button
          className={Styles['rsvp__button']}
          disabled={yesDisabled}
          onClick={handleYesClick}
        >
          <Icon icon="success" className={yesIconClasses}>
            Yes
          </Icon>
        </button>
        {/* <button
                    disabled={
                      loading || localUserStatus === 'MAYBE'
                    }
                    onClick={() => handleClick('MAYBE', setRsvp)}
                  >
                    Maybe
                  </button> */}
        <button
          className={Styles['rsvp__button']}
          disabled={noDisabled}
          onClick={handleNoClick}
        >
          <Icon icon="fail" className={noIconClasses}>
            No
          </Icon>
        </button>
      </div>
    </div>
  );
};

export default Rsvp;
