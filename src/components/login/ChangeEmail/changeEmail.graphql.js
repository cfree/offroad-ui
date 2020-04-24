import { gql } from 'apollo-boost';

export const CHANGE_EMAIL_MUTATION = gql`
  mutation CHANGE_EMAIL_MUTATION($email: String!) {
    changeEmail(email: $email) {
      message
    }
  }
`;
