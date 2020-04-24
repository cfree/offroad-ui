import { gql } from 'apollo-boost';

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;
