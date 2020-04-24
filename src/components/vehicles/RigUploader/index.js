import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_RIG, DELETE_RIG } from './rigUploader.graphql.js';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { getUploadLocation } from '../../../lib/utils';

const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation('rigs'));

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );

  return res.json();
};

const defaultRig = {
  id: null,
  publicId: null,
  url: null,
  smallUrl: null,
};

const RigUploader = ({ image }) => {
  const initialImage = {
    id: (image && image.id) || defaultRig.id,
    publicId: (image && image.publicId) || defaultRig.publicId,
    url: (image && image.url) || defaultRig.url,
    smallUrl: (image && image.smallUrl) || defaultRig.smallUrl,
  };
  const [rig, setRig] = useState(initialImage);
  const [oldRig, setOldRig] = useState(image ? initialImage : null);
  const [
    updateRig,
    { error: updateError, loading: updateLoading, data: updateData },
  ] = useMutation(UPDATE_RIG);
  const [
    deleteRig,
    { error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_RIG);

  const uploadFile = useCallback(
    async (e, callback) => {
      const files = e.target.files;
      const uploadResults = await uploadImage(files[0]);
      const newRig = {
        publicId: uploadResults.public_id,
        url: uploadResults.secure_url,
        smallUrl: uploadResults.eager[0].secure_url,
      };

      callback({
        variables: {
          data: {
            old: oldRig,
            new: newRig,
          },
        },
      });

      setRig(newRig);
      setOldRig(newRig);
    },
    [oldRig, setRig, setOldRig],
  );

  const deleteFile = useCallback(
    async (callback) => {
      callback({
        variables: {
          rig: oldRig,
        },
      });

      setRig(defaultRig);
      setOldRig(null);
    },
    [oldRig, setRig, setOldRig],
  );

  return (
    <>
      Upload rig photo (cropped to 1320 x 880)
      <input
        type="file"
        id="file"
        name="file"
        placeholder="Upload an image"
        required
        onChange={(e) => uploadFile(e, updateRig)}
        key={Date.now()}
      />
      {updateLoading && <Loading loading={updateLoading} />}
      {updateError && <ErrorMessage error={updateError} />}
      {rig.url && updateData && updateData.updateRig.message}
      {rig.url && <img width="660" src={rig.url} alt="Rig" />}
      {rig.url && (
        <>
          <button
            disabled={deleteLoading}
            onClick={() => deleteFile(deleteRig)}
          >
            Delete image
          </button>
          {deleteLoading && <Loading loading={deleteLoading} />}
          {deleteError && <ErrorMessage error={deleteError} />}
        </>
      )}
    </>
  );
};

export default RigUploader;
