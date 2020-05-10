import { gql } from 'apollo-boost';

export const PROFILE_QUERY = gql`
  query PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      email
      gender
      birthdate
      comfortLevel
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
        updatedAt
        emergencyContactName
        emergencyContactPhone
        photoPermissions
      }
    }
  }
`;
