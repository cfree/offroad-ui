import { gql } from 'apollo-boost';

export const ACTIVITY_QUERY = gql`
  query ACTIVITY_QUERY($username: String!) {
    user(username: $username) {
      id
      eventsRSVPd {
        event {
          id
          title
          startTime
        }
        status
      }
      trailsVisited {
        id
        name
      }
      bandaids {
        id
        occurred
        title
      }
      runReportsLogged {
        id
        reportFiled
        title
      }
      activityLog {
        id
        time
        message
      }
      membershipLog {
        id
        time
        message
      }
    }
  }
`;
