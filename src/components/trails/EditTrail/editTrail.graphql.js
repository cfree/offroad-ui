import { gql } from 'apollo-boost';

export const EXISTING_TRAIL_QUERY = gql`
  query EXISTING_TRAIL_QUERY($trailSlug: String!) {
    trail: getTrail(slug: $trailSlug) {
      id
      name
      slug
      description
      featuredImage {
        id
        url
      }
      trailheadCoords
      address
    }
  }
`;

export const EDIT_TRAIL_MUTATION = gql`
  mutation EDIT_TRAIL_MUTATION($trail: TrailInput!, $id: ID!) {
    updateTrail(trail: $trail, id: $id) {
      message
    }
  }
`;
