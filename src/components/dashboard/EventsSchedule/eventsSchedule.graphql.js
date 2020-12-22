import { gql } from 'apollo-boost';

export const DASHBOARD_UPCOMING_EVENTS_QUERY = gql`
  query DASHBOARD_UPCOMING_EVENTS_QUERY {
    myself {
      id
      accountType
    }
    events: getUpcomingEvents(count: 7) {
      id
      title
      startTime
      membersOnly
      rsvps {
        member {
          id
        }
        status
      }
    }
  }
`;
