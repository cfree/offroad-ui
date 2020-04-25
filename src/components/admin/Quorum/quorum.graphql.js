import { gql } from 'apollo-boost';

export const QUORUM_QUERY = gql`
  query QUORUM_QUERY {
    users(accountStatus: [ACTIVE, PAST_DUE], accountType: [FULL]) {
      username
      id
      firstName
      lastName
      avatar {
        id
        url
      }
      accountType
      accountStatus
    }
  }
`;
