import { gql } from 'apollo-boost';

export const NEXT_EVENT_QUERY = gql`
  query NEXT_EVENT_QUERY {
    myself {
      id
      accountType
    }
    event: getNextEvent {
      id
      title
      startTime
      description
      featuredImage {
        id
        url
      }
      startTime
      endTime
      membersOnly
      rsvps {
        member {
          id
        }
        status
      }
      host {
        id
        firstName
        lastName
        avatar {
          id
          url
        }
      }
      trailDifficulty
      trail {
        id
        name
        featuredImage {
          url
        }
      }
    }
  }
`;
