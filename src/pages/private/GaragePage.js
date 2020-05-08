import React from 'react';

import PageLayout from '../../components/layout/PageLayout';

const GaragePage = () => {
  return (
    <PageLayout>
      <p>
        Vehicle Information:
        <br />
        {/* {/* {user.vehicle.year} {user.vehicle.make}{' '} */} */}
        {/* {/* {user.vehicle.model} {user.vehicle.trim} */} */}
        <br />
        {/* {user.vehicle.name} */}
        <br />
        Mods
        <br />
        Comfort level
        <br />
        {/* Select primary vehicle: */}
      </p>
    </PageLayout>
  );
};

export default GaragePage;
