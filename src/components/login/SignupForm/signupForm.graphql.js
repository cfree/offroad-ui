import { gql } from 'apollo-boost';

export const REGISTRATION_QUERY = gql`
  query REGISTRATION_QUERY($token: String!) {
    getRegistration(token: $token) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
    $gender: Gender!
    $birthdate: DateTime!
    $token: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
      gender: $gender
      birthdate: $birthdate
      token: $token
    ) {
      message
    }
  }
`;
