import React from 'react';
import { useParams } from 'react-router-dom';

import EditTrail from '../../components/trails/EditTrail';
import Page from '../../components/layout/Page';

const EditTrailPage = () => {
  const { slug } = useParams();

  return (
    <Page>
      <EditTrail slug={slug} />
    </Page>
  );
};

export default EditTrailPage;

// <>{slug ? <EditTrail slug={slug} /> : <div>Slug not found</div>}</>
