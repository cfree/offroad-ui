import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

import { activityLogMessages } from '../lib/constants';

const LOG_ACTIVITY_MESSAGE = gql`
  mutation LOG_ACTIVITY_MESSAGE(
    $message: String!
    $messageCode: String!
    $time: DateTime
    $username: String!
    $link: String
  ) {
    logActivityMessage(
      message: $message
      messageCode: $messageCode
      time: $time
      username: $username
      link: $link
    ) {
      message
    }
  }
`;

const logActivityMessage = () => {
  const [log] = useMutation(LOG_ACTIVITY_MESSAGE);
  const logMessage = useCallback(
    (props, messageCode, username, time, link) => {
      addTodd({
        message: activityLogMessages['messageCode'](props),
        messageCode,
        username,
        time: time || new Date(),
        link,
      });
    },
    [log],
  );

  return logMessage;
};

export default logActivityMessage;
