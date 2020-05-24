import React, { useState, useCallback, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { UPDATE_TRAIL } from './trailImageUploader.graphql.js';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { getUploadLocation } from '../../../lib/utils';
import Button from '../../common/Button';
import Icon from '../../common/Icon';

import Styles from './trailImageUploader.module.scss';

const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation('trails'));

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
    {
      method: 'POST',
      body: data,
    },
  );

  return res.json();
};

const defaultTrail = {
  publicId: null,
  url: null,
  smallUrl: null,
};

const TrailUploader = ({ image, onUpload, trailId }) => {
  const inputEl = useRef(null);
  const [trail, setTrail] = useState(defaultTrail);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [
    updateTrail,
    { error: updateError, loading: updateLoading, data: updateData },
  ] = useMutation(UPDATE_TRAIL);

  const handleFileUpload = useCallback(() => {
    inputEl.current.click();
  }, [inputEl]);

  const uploadFile = useCallback(
    async (e) => {
      const files = e.target.files;

      setUploadComplete(false);
      setUploading(true);

      const uploadResults = await uploadImage(files[0]);

      const newTrail = {
        publicId: uploadResults.public_id,
        url: uploadResults.secure_url,
        smallUrl: uploadResults.eager[0].secure_url,
      };

      if (onUpload) {
        // Pass to parent component
        onUpload(newTrail);
      } else {
        // Handle the mutation itself
        updateTrail({
          variables: {
            id: trailId,
            image: newTrail,
          },
        });
      }

      setTrail(newTrail);
      setUploading(false);
      setUploadComplete(true);
    },
    [setTrail, setUploading, setUploadComplete, onUpload, updateTrail, trailId],
  );

  // const deleteFile = useCallback(
  //   async (callback) => {
  //     callback({
  //       variables: {
  //         rig: oldTrail,
  //       },
  //     });

  //     setTrail(defaultTrail);
  //     setOldTrail(null);
  //   },
  //   [oldTrail, setTrail, setOldTrail],
  // );

  return (
    <div className={Styles['uploader']}>
      <div className={Styles['uploader-contents']}>
        <img
          className={Styles['img']}
          width="330"
          src={trail.url || image || '/img/default-event.jpg'}
          alt="Trail"
        />
        <div className={Styles['uploader-input']}>
          <div>
            <h4>Change Your Trail Photo</h4>
            <Button
              className={Styles['upload-button']}
              onClick={handleFileUpload}
            >
              Choose File
            </Button>
            {(uploading || updateLoading) && <Loading loading={uploading} />}
            {trail.url && uploadComplete && updateData && (
              <small>
                {updateData.updateTrailImage.message}
                <Icon className={Styles['icon']} icon="success" />
              </small>
            )}
            <input
              ref={inputEl}
              className={Styles['input']}
              type="file"
              id="file"
              name="file"
              accept="image/png,image/jpeg,image/gif"
              placeholder="Upload an image"
              required
              onChange={uploadFile}
              key={Date.now()}
            />
          </div>
          <small className={Styles['reqs']}>
            JPG, GIF, or PNG. At least 1440 x 810.
          </small>
          <ErrorMessage error={updateError} />
        </div>
      </div>
      {/* {trail.url && (
        <>
          <button
            disabled={deleteLoading}
            onClick={() => deleteFile(deleteTrail)}
          >
            Delete image
          </button>
          {deleteLoading && <Loading loading={deleteLoading} />}
          {deleteError && <ErrorMessage error={deleteError} />}
        </>
      )} */}
    </div>
  );
};

export default TrailUploader;
