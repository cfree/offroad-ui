import React, { useState, useCallback } from 'react';
import { Mutation } from '@apollo/react-components';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import { CREATE_TRAIL_MUTATION } from './createTrail.graphql';
import TrailImageUploader from '../TrailImageUploader';

import TrailForm from '../TrailForm';
// import ErrorMessage from '../../utility/ErrorMessage';

const CreateTrail = () => {
  const [image, setImage] = useState({
    publicId: null,
    url: null,
    smallUrl: null,
  });

  const initialValues = {
    name: '',
    slug: '',
    description: '',
    trailheadCoords: '',
    address: '',
  };

  const handleSubmit = useCallback(
    (filteredValues, setSubmitting, createTrail) => {
      setSubmitting(true);

      const trailValues = {
        ...Object.entries(filteredValues).reduce(
          (acc, value) => ({
            ...acc,
            [value[0]]: value[1] === '' ? null : value[1],
          }),
          {},
        ),
        featuredImage: null,
        newFeaturedImage: image,
      };

      createTrail({
        variables: {
          trail: trailValues,
        },
      });

      setSubmitting(false);
    },
    [image],
  );

  return (
    <>
      <h3>Create New Trail</h3>
      <TrailImageUploader onUpload={setImage} />
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
              <TrailForm
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
                  {successMessage}. <Link to="/admin/trails">View trails</Link>.
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
