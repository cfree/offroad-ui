import { gql } from 'apollo-boost';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    myself {
      id
      username
      email
      firstName
      role
      accountStatus
      accountType
      avatar {
        id
        url
        smallUrl
      }
    }
  }
`;
