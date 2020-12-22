import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Icon from '../../common/Icon';
import { rsvpStatuses, pastRsvpStatuses } from '../../../lib/constants';
import Button from '../../common/Button';

import Styles from './attendeeStatus.module.scss';

export default class AttendeeStatus extends Component {
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
        case 'NONE':
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
    const {
      status,
      eventId,
      isUpcoming,
      iconFirst = false,
      darkMode = false,
      lockedOut = false,
    } = this.props;

    if (lockedOut) {
      return null;
    }

    const classNames = cn(Styles['attendee-status'], {
      [Styles['attendees-status--dark']]: darkMode,
    });

    if (!status || status === 'NONE') {
      return isUpcoming ? (
        <Button ghost={darkMode} href={`/event/${eventId}`}>
          View Event
        </Button>
      ) : (
        <span className={classNames}>
          <span>{this.showStatus(status)}</span>
          {this.showIcon(status)}
        </span>
      );
    }

    return (
      <span className={classNames}>
        {iconFirst ? (
          <>
            {this.showIcon(status)}
            <span>{this.showStatus(status)}</span>
          </>
        ) : (
          <>
            <span>{this.showStatus(status)}</span>
            {this.showIcon(status)}
          </>
        )}
      </span>
    );
  }
}
