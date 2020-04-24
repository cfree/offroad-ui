import { gql } from 'apollo-boost';

export const CREATE_TRAIL_MUTATION = gql`
  mutation CREATE_TRAIL_MUTATION($trail: TrailInput!) {
    createTrail(trail: $trail) {
      message
    }
  }
`;
