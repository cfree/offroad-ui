import { gql } from 'apollo-boost';

export const RUN_EVENT_QUERY = gql`
  query RUN_EVENT_QUERY($eventId: ID!) {
    myself {
      id
      accountType
      vehicle {
        id
        year
        make
        model
      }
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
