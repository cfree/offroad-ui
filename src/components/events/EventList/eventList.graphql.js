import { gql } from 'apollo-boost';

export const UPCOMING_EVENTS_QUERY = gql`
  query UPCOMING_EVENTS_QUERY {
    myself {
      id
      firstName
      lastName
      avatar {
        id
        smallUrl
      }
    }
    events: getUpcomingEvents {
      id
      title
      featuredImage {
        id
        smallUrl
      }
      startTime
      endTime
      host {
        id
        firstName
        lastName
      }
      address
      rallyAddress
      rallyTime
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
      }
    }
  }
`;

export const PAST_EVENTS_QUERY = gql`
  query PAST_EVENTS_QUERY {
    myself {
      id
      firstName
      lastName
      avatar {
        id
        smallUrl
      }
    }
    events: getPastEvents {
      id
      title
      featuredImage {
        id
        smallUrl
      }
      startTime
      endTime
      host {
        id
        firstName
        lastName
      }
      address
      rallyAddress
      rallyTime
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
      }
    }
  }
`;
