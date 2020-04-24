import { gql } from 'apollo-boost';

export const MEMBERSHIP_QUERY = gql`
  query MEMBERSHIP_QUERY(
    $accountStatus: [AccountStatus]
    $accountType: [AccountType]
    $role: [Role]
    $office: [Office]
    $title: [Title]
  ) {
    users(
      accountStatus: $accountStatus
      accountType: $accountType
      role: $role
      office: $office
      title: $title
    ) {
      username
      id
      firstName
      lastName
      avatar {
        smallUrl
      }
      accountType
      contactInfo {
        phone
      }
    }
  }
`;
