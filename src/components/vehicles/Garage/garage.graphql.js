import { gql } from 'apollo-boost';

export const GARAGE_QUERY = gql`
  query GARAGE_QUERY($username: String!) {
    user(username: $username) {
      id
      firstName
      rig {
        image {
          id
          url
        }
      }
      vehicle {
        id
        make
        model
        year
        trim
        name
        outfitLevel
        mods
      }
    }
  }
`;
