import React from 'react';
import { Query } from '@apollo/react-components';

import { CURRENT_USER_QUERY } from './user.graphql';

const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {(payload) => props.children(payload)}
  </Query>
);

export default User;
