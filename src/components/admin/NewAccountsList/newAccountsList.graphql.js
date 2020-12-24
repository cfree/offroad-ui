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

export const NEW_ACCOUNTS_APPROVE_MUTATION = gql`
  mutation NEW_ACCOUNTS_APPROVE_MUTATION($userId: ID!) {
    unlockNewAccount(userId: $userId) {
      message
    }
  }
`;

export const NEW_ACCOUNTS_REJECT_MUTATION = gql`
  mutation NEW_ACCOUNTS_REJECT_MUTATION($userId: ID!, $reason: String!) {
    rejectNewAccount(userId: $userId, reason: $reason) {
      message
    }
  }
`;
