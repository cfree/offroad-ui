import { gql } from 'apollo-boost';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
    $gender: Gender!
    $birthdate: DateTime!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
      gender: $gender
      birthdate: $birthdate
    ) {
      id
      email
      firstName
    }
  }
`;
