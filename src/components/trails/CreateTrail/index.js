import React, { useCallback } from 'react';
import { Mutation } from '@apollo/react-components';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import { CREATE_TRAIL_MUTATION } from './createTrail.graphql';

import EventForm from '../TrailForm';
// import ErrorMessage from '../../utility/ErrorMessage';

const CreateTrail = () => {
  const initialValues = {
    name: '',
    slug: '',
    description: '',
    featuredImage: '',
    trailheadCoords: '',
    address: '',
    image: null,
    newImage: null,
  };

  const handleSubmit = useCallback(
    ({ image, newImage, ...filteredValues }, setSubmitting, createEvent) => {
      const trailValues = {
        ...Object.entries(filteredValues).reduce(
          (acc, value) => ({
            ...acc,
            [value[0]]: value[1] === '' ? null : value[1],
          }),
          {},
        ),
        featuredImage: null,
        newFeaturedImage: newImage,
      };
      console.log('values', trailValues);
      setSubmitting(true);
      createEvent({
        variables: {
          trail: trailValues,
        },
      });
      setSubmitting(false);
    },
    [],
  );

  return (
    <>
      <h3>Create New Trail</h3>
      <Mutation mutation={CREATE_TRAIL_MUTATION}>
        {(
          createTrail,
          {
            error: mutationError,
            loading: mutationLoading,
            data: mutationData,
          },
        ) => {
          const successMessage = get(mutationData, 'createTrail.message');

          return (
            <>
              <EventForm
                initialValues={initialValues}
                onSubmit={(values, setSubmitting) =>
                  handleSubmit(values, setSubmitting, createTrail)
                }
                loading={mutationLoading}
                error={mutationError}
                submitLabel="Create Trail"
              />
              {successMessage && (
                <p>
                  {successMessage}. <Link to="/admin-trails">View trails</Link>.
                </p>
              )}
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default CreateTrail;
