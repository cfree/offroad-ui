import { gql } from 'apollo-boost';

export const NOTIFICATIONS_FORM_QUERY = gql`
  query NOTIFICATIONS_FORM_QUERY {
    notificationSettings: notifications {
      id
      # accountSetupComplete
      # oldSiteMigrationComplete
      emailPublicNotifications
      emailMemberNotifications
      # emailEventAnnouncements
    }
  }
`;

export const NOTIFICATIONS_FORM_MUTATION = gql`
  mutation NOTIFICATIONS_FORM_QUERY($settings: NotificationsSettingsInput!) {
    notifications(settings: $settings) {
      message
    }
  }
`;
