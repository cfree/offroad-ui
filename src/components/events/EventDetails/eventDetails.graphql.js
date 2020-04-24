import { gql } from 'apollo-boost';

export const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: ID!) {
    myself {
      id
      firstName
      lastName
      avatar {
        url
      }
    }
    event: getEvent(eventId: $eventId) {
      title
      description
      featuredImage {
        url
      }
      host {
        id
        firstName
        lastName
        username
        accountType
        avatar {
          url
          smallUrl
        }
        rig {
          image {
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
            url
          }
          rig {
            image {
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
          url
        }
      }
      rallyAddress
      rallyTime
    }
  }
`;
