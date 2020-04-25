import { gql } from 'apollo-boost';

export const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: ID!) {
    myself {
      id
      firstName
      lastName
      avatar {
        id
        url
      }
    }
    event: getEvent(eventId: $eventId) {
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
        username
        accountType
        avatar {
          id
          url
          smallUrl
        }
        rig {
          image {
            id
            url
          }
        }
      }
      startTime
      endTime
      rsvps {
        member {
          id
          firstName
          lastName
          username
          accountType
          avatar {
            id
            url
          }
          rig {
            image {
              id
              url
            }
          }
        }
        status
      }
      address
      trail {
        id
        description
        name
        address
        avgDifficulty
        avgRatings
        currentConditions
        conditionsLastReported
        favoriteCount
        featuredImage {
          id
          url
        }
      }
      rallyAddress
      rallyTime
    }
  }
`;
