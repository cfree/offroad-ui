import { gql } from 'apollo-boost';

export const LOG_MEMBERSHIP_ITEM_MUTATION = gql`
  mutation LOG_MEMBERSHIP_ITEM_MUTATION(
    $date: DateTime!
    $code: String!
    $message: String!
    $userId: ID!
  ) {
    logMembershipEvent(
      date: $date
      code: $code
      userId: $userId
      message: $message
    ) {
      message
    }
  }
`;
