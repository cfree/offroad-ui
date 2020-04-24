import { gql } from 'apollo-boost';

export const TOKEN_QUERY = gql`
  query TOKEN_QUERY {
    getResetToken {
      token
    }
  }
`;

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      firstName
    }
  }
`;
