import { gql } from 'apollo-boost';

export const TRAILS_QUERY = gql`
  query TRAILS_QUERY {
    trails: getTrails {
      id
      slug
      name
      description
      featuredImage {
        id
        url
      }
      trailheadCoords
      # coords: Coords
      address
      avgDifficulty
      avgRatings
      currentConditions
      conditionsLastReported
      favoriteCount
      pastEvents {
        id
        title
      }
      visitors {
        id
        firstName
      }
    }
  }
`;
