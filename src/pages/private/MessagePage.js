import React from 'react';

import Message from '../../components/user/Message';
import Page from '../../components/layout/Page';
import { useQueryParams } from '../../hooks/useQueryParams';

const MessagePage = () => {
  const query = useQueryParams();
  const { to } = query;

  return (
    <Page>
      <Message recipients={to} />
    </Page>
  );
};

export default MessagePage;
