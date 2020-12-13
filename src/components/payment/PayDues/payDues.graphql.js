import { gql } from 'apollo-boost';

export const PAY_DUES_MUTATION = gql`
  mutation PAY_DUES_MUTATION($data: DuesPaymentInput!) {
    payMembershipDues(data: $data) {
      message
    }
  }
`;
