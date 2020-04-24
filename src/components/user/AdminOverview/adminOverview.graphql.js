import { gql } from 'apollo-boost';

const ADMIN_OVERVIEW_QUERY = gql`
  query ADMIN_OVERVIEW_QUERY($username: String!) {
    user(username: $username) {
      id
      createdAt
      joined
      lastLogin
    }
    duesLastReceived: getDuesLastReceived(username: $username) {
      time
    }
    meetings: getUserEvents(username: $username, eventType: MEETING) {
      id
      startTime
    }
    runs: getUserEvents(username: $username, eventType: RUN) {
      id
      startTime
    }
  }
`;
