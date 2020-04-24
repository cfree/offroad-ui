import { gql } from 'apollo-boost';

export const MEMBER_ADMIN_PROFILE_QUERY = gql`
  query MEMBER_ADMIN_PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      title
      isCharterMember
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
    $title: String
    $isCharterMember: Boolean!
    $office: String
    $role: String!
    $accountStatus: String!
    $accountType: String!
  ) {
    updateUserAdminProfileSettings(
      data: {
        title: $title
        isCharterMember: $isCharterMember
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
