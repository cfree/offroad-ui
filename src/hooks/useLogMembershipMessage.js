import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { membershipLogMessages } from '../lib/constants';

const LOG_MEMBERSHIP_MESSAGE = gql`
  mutation LOG_MEMBERSHIP_MESSAGE(
    $message: String!
    $messageCode: String!
    $time: DateTime
    $username: String!
  ) {
    logActivityMessage(
      message: $message
      messageCode: $messageCode
      time: $time
      username: $username
    ) {
      message
    }
  }
`;

const logActivityMessage = () => {
  const [log] = useMutation(LOG_MEMBERSHIP_MESSAGE);
  const logMessage = useCallback(
    (props, messageCode, username, time) => {
      log({
        message: membershipLogMessages['messageCode'](props),
        messageCode,
        username,
        time: time || new Date(),
      });
    },
    [addTodo],
  );

  return logMessage;
};

export default logActivityMessage;
