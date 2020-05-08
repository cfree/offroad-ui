import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import { GARAGE_QUERY } from './garage.graphql';
import { outfitLevel } from '../../../lib/constants';
import ErrorMessage from '../../utility/ErrorMessage';
import { Link } from 'react-router-dom';

import Styles from './garage.module.scss';

const Garage = ({ username, isSelf }) => {
  const { loading, error, data } = useQuery(GARAGE_QUERY, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { user } = data;
  const { vehicle } = user;

  const vehicleInfo = [
    get(vehicle, 'year', ''),
    get(vehicle, 'make', ''),
    get(vehicle, 'model', ''),
    get(vehicle, 'trim', ''),
  ]
    .filter((detail) => !!detail)
    .join(' ');

  return (
    <>
      {vehicle ? (
        <div className={Styles['user-garage']}>
          <h3>
            Garage
            {isSelf && (
              <small>
                <Link to="/settings/garage">Edit</Link>
              </small>
            )}
          </h3>
          <dl>
            {vehicleInfo && (
              <>
                <dt>Vehicle</dt>
                <dd>{vehicleInfo}</dd>
              </>
            )}

            {vehicle.name && (
              <>
                <dt>Name</dt>
                <dd>{vehicle.name}</dd>
              </>
            )}

            {vehicle.outfitLevel && (
              <>
                <dt>Outfit Level</dt>
                <dd>{outfitLevel[vehicle.outfitLevel]}</dd>
              </>
            )}

            {vehicle.mods && (
              <>
                <dt>Mods</dt>
                <dd>{vehicle.mods.join(', ')}</dd>
              </>
            )}
          </dl>
        </div>
      ) : (
        <div>No vehicle found. Add something to your garage.</div>
      )}
    </>
  );
};

export default Garage;
