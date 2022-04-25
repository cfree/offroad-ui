import { gql } from 'apollo-boost';

export const NEWSLETTER_PREFS_QUERY = gql`
  query NEWSLETTER_PREFS_QUERY {
    membersPref: newsletterPreferences(list: MEMBERS) {
      status
    }
    generalPref: newsletterPreferences(list: GENERAL) {
      status
    }
  }
`;

export const EDIT_NEWSLETTER_PREFS_MUTATION = gql`
  mutation EDIT_NEWSLETTER_PREFS_MUTATION(
    $action: NewsletterAction!
    $list: NewsletterList!
  ) {
    editNewsletterPreferences(action: $action, list: $list) {
      message
    }
  }
`;
