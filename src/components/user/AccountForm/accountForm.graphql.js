import { gql } from 'apollo-boost';

export const ACCOUNT_FORM_QUERY = gql`
  query ACCOUNT_FORM_QUERY {
    myself {
      id
      email
      accountType
      accountStatus
    }
    logItems: getMembershipLogItems(username: "self", messageCode: DUES_PAID) {
      id
      time
      message
    }
    # notifications: getEmailNotificationsStatus {
    #   id
    #   status
    # }
  }
`;
