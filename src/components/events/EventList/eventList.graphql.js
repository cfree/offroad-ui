import { gql } from 'apollo-boost';

export const UPCOMING_EVENTS_QUERY = gql`
  query UPCOMING_EVENTS_QUERY($count: Int, $page: Int) {
    myself {
      id
      firstName
      lastName
      accountType
      avatar {
        id
        smallUrl
      }
    }
    totalEvents: upcomingEventsCount {
      count
    }
    events: getUpcomingEvents(count: $count, page: $page) {
      id
      title
      featuredImage {
        id
        smallUrl
      }
      startTime
      endTime
      membersOnly
      host {
        id
        firstName
        lastName
      }
      address
      rallyAddress
      trailDifficulty
      maxRigs
      maxAttendees
      trail {
        id
        name
        avgDifficulty
        featuredImage {
          id
          smallUrl
        }
      }
      rsvps {
        member {
          id
          firstName
          lastName
          avatar {
            id
            smallUrl
          }
        }
        status
        isRider
        guestCount
      }
    }
  }
`;

export const PAST_EVENTS_QUERY = gql`
  query PAST_EVENTS_QUERY($count: Int, $page: Int) {
    myself {
      id
      firstName
      lastName
      accountType
      avatar {
        id
        smallUrl
      }
    }
    totalEvents: pastEventsCount {
      count
    }
    events: getPastEvents(count: $count, page: $page) {
      id
      title
      featuredImage {
        id
        smallUrl
      }
      startTime
      endTime
      membersOnly
      host {
        id
        firstName
        lastName
      }
      address
      rallyAddress
      trailDifficulty
      maxRigs
      maxAttendees
      trail {
        id
        name
        avgDifficulty
        featuredImage {
          id
          smallUrl
        }
      }
      rsvps {
        member {
          id
          firstName
          lastName
          avatar {
            id
            smallUrl
          }
        }
        status
        isRider
        guestCount
      }
    }
  }
`;
