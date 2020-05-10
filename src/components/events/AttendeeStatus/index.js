import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';
// import { Link } from 'react-router-dom';
import cn from 'classnames';

import { RSVP_MUTATION } from './attendeeStatus.graphql';
// Refetch
import { EVENT_QUERY } from '../EventDetails/eventDetails.graphql';
import { UPCOMING_EVENTS_QUERY } from '../EventList/eventList.graphql';
import { NEXT_EVENT_QUERY } from '../../dashboard/NextEvent/nextEvent.graphql';

import Icon from '../../common/Icon';
import Loading from '../../utility/Loading';
import { rsvpStatuses, pastRsvpStatuses } from '../../../lib/constants';

import Styles from './attendeeStatus.module.scss';

export default class AttendeeStatus extends Component {
  getUserRSVPStatus = (eventId, myself) => {
    if (this.props.attendees[eventId]) {
      const attendee = this.props.attendees[eventId].find(
        (rsvp) => rsvp.member.id === myself.id,
      );

      return (attendee && attendee.status) || null;
    }
    return null;
  };

  updateAttendees = async (setRSVP) => {
    await setRSVP();

    const update = [
      ...this.props.attendees[this.props.eventId],
      {
        member: { ...this.props.user },
        status: 'GOING',
      },
    ];

    this.props.onUpdateEventAttendees({ [this.props.eventId]: update });
  };

  showStatus = (status) => {
    if (this.props.isUpcoming) {
      switch (status) {
        case 'GOING':
          return rsvpStatuses[status];
        case 'MAYBE':
        case 'CANT_GO':
        default:
          return rsvpStatuses['CANT_GO'];
      }
    } else {
      switch (status) {
        case 'GOING':
          return pastRsvpStatuses[status];
        case 'MAYBE':
        case 'CANT_GO':
        default:
          return pastRsvpStatuses['CANT_GO'];
      }
    }
  };

  showIcon = (status) => {
    if (this.props.isUpcoming) {
      switch (status) {
        case 'GOING':
          return (
            <Icon
              className={Styles['attendee-status-icon--going']}
              icon="success"
            >
              {rsvpStatuses[status]}
            </Icon>
          );
        case 'MAYBE':
          return (
            <Icon
              className={Styles['attendee-status-icon--maybe']}
              icon="unknown"
            >
              {rsvpStatuses[status]}
            </Icon>
          );
        case 'CANT_GO':
        default:
          return (
            <Icon
              className={Styles['attendee-status-icon--not-going']}
              icon="fail"
            >
              {rsvpStatuses[status]}
            </Icon>
          );
      }
    } else {
      switch (status) {
        case 'GOING':
          return (
            <Icon
              className={Styles['attendee-status-icon--going']}
              icon="success"
            >
              {pastRsvpStatuses[status]}
            </Icon>
          );
        case 'MAYBE':
        case 'CANT_GO':
        default:
          return (
            <Icon
              className={Styles['attendee-status-icon--not-going']}
              icon="fail"
            >
              {pastRsvpStatuses['CANT_GO']}
            </Icon>
          );
      }
    }
  };

  render() {
    return (
      <Mutation
        mutation={RSVP_MUTATION}
        variables={{
          rsvp: {
            userId: this.props.user.id,
            eventId: this.props.eventId,
            status: 'GOING',
          },
        }}
        refetchQueries={[
          {
            query: EVENT_QUERY,
            variables: { eventId: this.props.eventId },
          },
          {
            query: UPCOMING_EVENTS_QUERY,
          },
          {
            query: NEXT_EVENT_QUERY,
          },
        ]}
      >
        {(setRSVP, { loading }) => {
          const status = this.getUserRSVPStatus(
            this.props.eventId,
            this.props.user,
          );

          return (
            <>
              {status || !this.props.isUpcoming ? (
                <span className={Styles['attendee-status']}>
                  <span>{this.showStatus(status)}</span>
                  {this.showIcon(status)}
                </span>
              ) : (
                <button
                  className={Styles['button']}
                  disabled={loading}
                  onClick={() => this.updateAttendees(setRSVP)}
                >
                  <Icon
                    className={Styles['attendee-status--icon']}
                    icon="success"
                  >
                    Attend
                  </Icon>
                </button>
              )}
              <Loading loading={loading} />
            </>
          );
        }}
      </Mutation>
    );
  }
}
