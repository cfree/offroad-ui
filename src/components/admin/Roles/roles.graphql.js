import { gql } from 'apollo-boost';

export const UPDATE_ROLE_MUTATION = gql`
  mutation UPDATE_ROLE_MUTATION($role: Role, $userId: ID!) {
    updateRole(role: $role, userId: $userId) {
      id
      role
    }
  }
`;

export const UPDATE_ACCOUNT_TYPE_MUTATION = gql`
  mutation UPDATE_ACCOUNT_TYPE_MUTATION(
    $accountType: AccountType
    $userId: ID!
  ) {
    updateAccountType(accountType: $accountType, userId: $userId) {
      id
      accountType
    }
  }
`;

export const UPDATE_ACCOUNT_STATUS_MUTATION = gql`
  mutation UPDATE_ACCOUNT_STATUS_MUTATION(
    $accountStatus: AccountStatus
    $userId: ID!
  ) {
    updateAccountStatus(accountStatus: $accountStatus, userId: $userId) {
      id
      accountStatus
    }
  }
`;

export const UPDATE_OFFICE_MUTATION = gql`
  mutation UPDATE_OFFICE_MUTATION($office: Office, $userId: ID!) {
    updateOffice(office: $office, userId: $userId) {
      id
      office
    }
  }
`;

export const UPDATE_TITLE_MUTATION = gql`
  mutation UPDATE_TITLE_MUTATION($titles: [Title], $userId: ID!) {
    updateTitles(titles: $titles, userId: $userId) {
      id
      titles
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
      email
      role
      accountStatus
      accountType
      office
    }
  }
`;
