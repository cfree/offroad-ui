import { gql } from 'apollo-boost';

export const ACCOUNT_FORM_QUERY = gql`
  query ACCOUNT_FORM_QUERY {
    myself {
      id
      email
      accountType
      accountStatus
      eventsRSVPd {
        id
        status
        event {
          id
          type
          startTime
        }
      }
    }
    logItems: getMembershipLogItems(username: "self", messageCode: DUES_PAID) {
      id
      time
      message
      logger {
        id
        firstName
        lastName
      }
    }

    # notifications: getEmailNotificationsStatus {
    #   id
    #   status
    # }
  }
`;
