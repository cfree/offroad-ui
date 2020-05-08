import { gql } from 'apollo-boost';

export const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $firstName: String
    $lastName: String
    $email: String!
    $confirmEmail: String!
    $source: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      confirmEmail: $confirmEmail
      source: $source
    ) {
      message
    }
  }
`;
