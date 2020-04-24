import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';
import { Link } from 'react-router-dom';

import { RSVP_MUTATION } from './attendeeStatus.graphql';
import Loading from '../../utility/Loading';
// import { accountTypes as types, offices, titles } from '../../../lib/constants';

import './attendeeStatus.module.scss';

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
    if (!this.props.isUpcoming) {
      switch (status) {
        case 'GOING':
          return 'WENT';
        case 'MAYBE':
        case 'CANT_GO':
          return null;
        default:
          return status;
      }
    }

    return status;
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
      >
        {(setRSVP, { loading }) => {
          const status = this.getUserRSVPStatus(
            this.props.eventId,
            this.props.user,
          );

          return (
            <>
              {status || !this.props.isUpcoming ? (
                <>
                  {this.showStatus(status) !== null ? (
                    <Link to={`/event/${this.props.eventId}`}>
                      {this.showStatus(status)}
                    </Link>
                  ) : null}
                </>
              ) : (
                <button
                  disabled={loading}
                  onClick={() => this.updateAttendees(setRSVP)}
                >
                  Attend
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
