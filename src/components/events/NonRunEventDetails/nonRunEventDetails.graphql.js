import { gql } from 'apollo-boost';

export const NON_RUN_EVENT_QUERY = gql`
  query NON_RUN_EVENT_QUERY($eventId: ID!) {
    myself {
      id
      accountType
    }
    event: getEvent(eventId: $eventId) {
      id
      type
      title
      description
      featuredImage {
        id
        url
      }
      host {
        id
        firstName
        lastName
        avatar {
          id
          smallUrl
        }
      }
      startTime
      endTime
      membersOnly
      rsvps {
        id
        member {
          id
          firstName
          lastName
          username
          accountType
          email
          runsAttendedCount
          contactInfo {
            id
            city
            state
          }
          avatar {
            id
            url
          }
        }
        status
        guestCount
      }
      address
      maxAttendees
    }
  }
`;
