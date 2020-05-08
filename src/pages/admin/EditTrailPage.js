import React from 'react';
import { useParams } from 'react-router-dom';

import EditTrail from '../../components/trails/EditTrail';
import PageLayout from '../../components/layout/PageLayout';

const EditTrailPage = () => {
  const { slug } = useParams();

  return (
    <PageLayout>
      <EditTrail slug={slug} />
    </PageLayout>
  );
};

export default EditTrailPage;

// <>{slug ? <EditTrail slug={slug} /> : <div>Slug not found</div>}</>
