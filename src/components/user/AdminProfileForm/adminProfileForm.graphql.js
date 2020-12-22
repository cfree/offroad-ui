import { gql } from 'apollo-boost';

export const MEMBER_ADMIN_PROFILE_QUERY = gql`
  query MEMBER_ADMIN_PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      titles
      office
      role
      accountStatus
      accountType
    }
  }
`;

export const USER_ADMIN_UPDATE_PROFILE_MUTATION = gql`
  mutation USER_ADMIN_UPDATE_PROFILE_MUTATION(
    $id: ID!
    $titles: [Title]
    $office: String
    $role: String!
    $accountStatus: String!
    $accountType: String!
  ) {
    updateUserAdminProfileSettings(
      data: {
        titles: $titles
        office: $office
        role: $role
        accountStatus: $accountStatus
        accountType: $accountType
      }
      id: $id
    ) {
      message
    }
  }
`;
