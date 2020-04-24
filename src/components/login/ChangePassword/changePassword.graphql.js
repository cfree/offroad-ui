import { gql } from 'apollo-boost';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION(
    $password: String!
    $confirmPassword: String!
  ) {
    changePassword(password: $password, confirmPassword: $confirmPassword) {
      message
    }
  }
`;
