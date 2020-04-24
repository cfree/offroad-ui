import React from 'react';
import { Link } from 'react-router-dom';

import Gate from '../../components/login/Gate';
import EditProfile from '../../components/user/EditProfile';
import EditGarage from '../../components/vehicles/EditGarage';
import EditAccount from '../../components/user/EditAccount';

const SettingsPage = ({ query }) => {
  const { settings } = query;

  const page = (settings) => {
    let component;
    let title;

    switch (settings) {
      case 'profile':
        component = <EditProfile />;
        title = 'Profile';
        break;
      case 'garage':
        component = <EditGarage />;
        title = 'Garage';
        break;
      case 'account':
      default:
        component = <EditAccount />;
        title = 'Account';
    }

    return { component, title };
  };

  const { component, title } = page(settings);

  return (
    <Gate redirect={`/settings${settings ? `/${settings}` : ''}`}>
      <ul>
        <li>
          <Link to="/settings/profile">Edit Profile</Link>
        </li>
        <li>
          <Link to="/settings/garage">Edit Garage</Link>
        </li>
        <li>
          <Link to="/settings/account">Edit Account</Link>
        </li>
      </ul>
      <h2>{title} Settings</h2>
      {component}
    </Gate>
  );
};

export default SettingsPage;
