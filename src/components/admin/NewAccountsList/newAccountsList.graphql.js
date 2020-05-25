import { gql } from 'apollo-boost';

export const NEW_ACCOUNTS_QUERY = gql`
  query NEW_ACCOUNTS_QUERY {
    users(accountStatus: [LOCKED], accountType: [GUEST]) {
      id
      firstName
      lastName
      username
      birthdate
      gender
    }
  }
`;

export const NEW_ACCOUNTS_MUTATION = gql`
  mutation NEW_ACCOUNTS_MUTATION($userId: ID!) {
    unlockNewAccount(userId: $userId) {
      message
    }
  }
`;
