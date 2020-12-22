import { gql } from 'apollo-boost';

export const MEMBERSHIP_QUERY = gql`
  query MEMBERSHIP_QUERY(
    $accountStatus: [AccountStatus]
    $accountType: [AccountType]
    $role: [Role]
    $office: [Office]
    $titles: [Title]
  ) {
    users(
      accountStatus: $accountStatus
      accountType: $accountType
      role: $role
      office: $office
      titles: $titles
    ) {
      username
      id
      firstName
      lastName
      avatar {
        id
        smallUrl
      }
      accountType
      contactInfo {
        id
        phone
      }
    }
  }
`;
