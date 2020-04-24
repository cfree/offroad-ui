import React from 'react';

import Page from '../../components/layout/Page';

const GaragePage = () => {
  return (
    <Page>
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
    </Page>
  );
};

export default GaragePage;
