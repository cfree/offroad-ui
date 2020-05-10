import { gql } from 'apollo-boost';

export const PROFILE_HEADER_QUERY = gql`
  query PROFILE_HEADER_QUERY($username: String) {
    user(username: $username) {
      id
      firstName
      lastName
      avatar {
        id
        url
      }
      joined
      role
      username
      title
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
