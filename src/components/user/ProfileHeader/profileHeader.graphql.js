import { gql } from 'apollo-boost';

export const PROFILE_HEADER_QUERY = gql`
  query PROFILE_HEADER_QUERY($username: String) {
    user(username: $username) {
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      joined
      role
      username
      titles
      office
      accountType
      rig {
        image {
          id
          url
        }
      }
    }
  }
`;
