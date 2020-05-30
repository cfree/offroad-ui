import React, { useCallback } from 'react';
import get from 'lodash/get';
import { Query, Mutation } from '@apollo/react-components';

import { USER_RIG, USER_UPDATE_RIG_MUTATION } from './editGarage.graphql';
import ErrorMessage from '../../utility/ErrorMessage';
import RigForm from '../RigForm';
import RigUploader from '../RigUploader';

const EditGarage = () => {
  const handleSubmit = useCallback(
    async ({ id, ...vehicleValues }, setSubmitting, userUpdateRig) => {
      setSubmitting(true);

      const { year, mods, outfitLevel, ...restVehicles } = vehicleValues;

      userUpdateRig({
        variables: {
          id,
          outfitLevel: outfitLevel === '0' ? null : outfitLevel,
          year: parseInt(year, 10),
          mods: mods ? mods.split(', ') : '',
          ...restVehicles,
        },
      });

      setSubmitting(false);
    },
    [],
  );

  return (
    <Query query={USER_RIG}>
      {({ data: queryData, loading: queryLoading, error: queryError }) => {
        if (queryLoading) {
          return <div>Loading...</div>;
        }
        if (queryError) {
          return <ErrorMessage error={queryError} />;
        }

        const { vehicle } = queryData.user;
        const { user } = queryData;
        const isGuest =
          user.accountType === 'GUEST' ||
          (user.accountStatus !== 'ACTIVE' &&
            user.accountStatus !== 'PAST_DUE');

        const initialValues = {
          id: get(vehicle, 'id', 0),
          year: get(vehicle, 'year', null),
          make: get(vehicle, 'make', ''),
          model: get(vehicle, 'model', ''),
          trim: get(vehicle, 'trim', ''),
          name: get(vehicle, 'name', ''),
          outfitLevel: get(vehicle, 'outfitLevel', ''),
          mods: get(vehicle, 'mods', []).join(', '),
        };

        return (
          <>
            <RigUploader
              image={get(queryData, 'user.rig.image')}
              isGuest={isGuest}
            />
            <Mutation mutation={USER_UPDATE_RIG_MUTATION}>
              {(
                userUpdateRig,
                {
                  error: mutationError,
                  loading: mutationLoading,
                  data: mutationData,
                },
              ) => {
                const successMessage = get(
                  mutationData,
                  'updateVehicle.message',
                );

                return (
                  <>
                    <RigForm
                      initialValues={initialValues}
                      onSubmit={(values, setSubmitting) =>
                        handleSubmit(values, setSubmitting, userUpdateRig)
                      }
                      loading={mutationLoading}
                      error={mutationError}
                      successMessage={successMessage}
                    />
                  </>
                );
              }}
            </Mutation>
          </>
        );
      }}
    </Query>
  );
};

export default EditGarage;
