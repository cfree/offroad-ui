import { gql } from 'apollo-boost';

export const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: ID!) {
    myself {
      id
      firstName
      lastName
      accountType
      avatar {
        id
        url
      }
      rig {
        id
        image {
          id
          url
        }
      }
      vehicle {
        id
        year
        make
        model
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
      }
      startTime
      endTime
      membersOnly
      trailDifficulty
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
          rig {
            id
            image {
              id
              url
            }
          }
          vehicle {
            id
            year
            make
            model
            trim
          }
        }
        status
        guestCount
        isRider
        equipment
      }
      address
      trail {
        id
        description
        name
        address
        avgDifficulty
        avgRatings
        conditionsLastReported
        favoriteCount
        trailheadCoords
        featuredImage {
          id
          url
        }
      }
      rallyAddress
      maxRigs
      maxAttendees
    }
  }
`;
