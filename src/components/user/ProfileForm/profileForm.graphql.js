import { gql } from 'apollo-boost';

export const MEMBER_PROFILE_QUERY = gql`
  query MEMBER_PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      firstName
      lastName
      username
      gender
      birthdate
      email
      joined
      avatar {
        id
        publicId
        url
        smallUrl
      }
      contactInfo {
        id
        street
        city
        state
        zip
        phone
      }
      preferences {
        id
        emergencyContactName
        emergencyContactPhone
        photoPermissions
      }
      comfortLevel
    }
  }
`;

export const SELF_PROFILE_QUERY = gql`
  query SELF_PROFILE_QUERY {
    user: myself {
      id
      accountType
      accountStatus
      firstName
      lastName
      username
      gender
      birthdate
      email
      joined
      avatar {
        id
        publicId
        url
        smallUrl
      }
      contactInfo {
        id
        street
        city
        state
        zip
        phone
      }
      preferences {
        id
        emergencyContactName
        emergencyContactPhone
        photoPermissions
      }
      comfortLevel
    }
  }
`;

export const USER_UPDATE_PROFILE_MUTATION = gql`
  mutation USER_UPDATE_PROFILE_MUTATION(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $username: String!
    $gender: String!
    $birthdate: DateTime!
    $joined: DateTime
    $contactInfoId: ID
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $phone: String!
    $preferencesId: ID
    $emergencyContactName: String!
    $emergencyContactPhone: String!
    $comfortLevel: TrailDifficulty
  ) {
    updateUserProfileSettings(
      data: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        gender: $gender
        birthdate: $birthdate
        joined: $joined
        contactInfoId: $contactInfoId
        street: $street
        city: $city
        state: $state
        zip: $zip
        phone: $phone
        preferencesId: $preferencesId
        emergencyContactName: $emergencyContactName
        emergencyContactPhone: $emergencyContactPhone
        comfortLevel: $comfortLevel
      }
      id: $id
    ) {
      message
    }
  }
`;
