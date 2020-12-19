import { gql } from 'apollo-boost';

export const ACTIVITY_QUERY = gql`
  query ACTIVITY_QUERY($username: String!) {
    user(username: $username) {
      id
      # eventsHosted {
      #   id
      #   title
      #   startTime
      # }
      activityLog {
        id
        time
        message
      }
    }
    # getStatHighlights {
    #   trails {
    #     id
    #     name
    #     slug
    #   }
    #   rSVPs {
    #     id
    #     event {
    #       id
    #       title
    #       startTime
    #     }
    #     status
    #   }
    #   bandaids {
    #     id
    #     occurred
    #     title
    #   }
    #   runReportsLogged {
    #     id
    #     reportFiled
    #     title
    #   }
    # }
  }
`;
