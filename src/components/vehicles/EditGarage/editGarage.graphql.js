import { gql } from 'apollo-boost';

export const USER_RIG = gql`
  query USER_RIG {
    user {
      id
      rig {
        image {
          id
          publicId
          url
        }
      }
      vehicle {
        id
        year
        make
        model
        trim
        name
        outfitLevel
        mods
      }
    }
  }
`;

export const USER_UPDATE_RIG_MUTATION = gql`
  mutation USER_UPDATE_RIG_MUTATION(
    $id: ID
    $year: Int
    $make: String
    $model: String
    $trim: String
    $name: String
    $outfitLevel: OutfitLevel
    $mods: [String]
  ) {
    updateVehicle(
      id: $id
      vehicle: {
        year: $year
        make: $make
        model: $model
        trim: $trim
        name: $name
        outfitLevel: $outfitLevel
        mods: $mods
      }
    ) {
      message
    }
  }
`;
