import { gql } from 'apollo-boost';

export const MEMBERSHIP_LOG_QUERY = gql`
  query MEMBERSHIP_LOG_QUERY($username: String) {
    user(username: $username) {
      id
      membershipLog {
        id
        time
        message
        messageCode
        logger {
          id
          username
          firstName
          lastName
        }
      }
    }
  }
`;
