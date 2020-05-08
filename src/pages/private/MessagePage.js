import React from 'react';

import Message from '../../components/user/Message';
import PageLayout from '../../components/layout/PageLayout';
import { useQueryParams } from '../../hooks/useQueryParams';

const MessagePage = () => {
  const query = useQueryParams();
  const { to } = query;

  return (
    <PageLayout>
      <Message recipients={to} />
    </PageLayout>
  );
};

export default MessagePage;
