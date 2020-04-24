import React from 'react';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { trailSchema } from './trailForm.schema';
import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import UploadImagePreview from '../../common/UploadImagePreview';

import './trailForm.module.scss';

const createSlug = (title) => {
  return encodeURI(title.toLowerCase().replace(' ', '-').replace("'", ''));
};

const TrailForm = ({
  initialValues,
  onSubmit,
  loading = '',
  error,
  submitLabel = 'Submit',
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={trailSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => {
          return (
            <div className="form profile-form--user">
              <form onSubmit={formikProps.handleSubmit}>
                <div className="form-field">
                  <label className="profile-form-label" htmlFor="name">
                    Name
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => {
                        formikProps.setFieldValue(
                          'slug',
                          createSlug(e.target.value),
                        );
                        formikProps.handleChange(e);
                      }}
                    />
                    <FormikErrorMessage name="name" component="div" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="profile-form-label" htmlFor="slug">
                    URL Slug
                  </label>
                  <div className="profile-form-field">
                    <Field typ="text" id="slug" name="slug" />
                    <small>
                      Ex: 4-playersofcolorado.org/trail/
                      <strong>{formikProps.values.slug}</strong>
                    </small>
                    <FormikErrorMessage name="slug" component="div" />
                  </div>
                </div>

                <div className="form-field">
                  {formikProps.values.newImage && (
                    <UploadImagePreview file={formikProps.values.newImage} />
                  )}

                  {!formikProps.values.newImage && initialValues.image && (
                    <img src={initialValues.image} alt="" width="400" />
                  )}
                  <label className="profile-form-label" htmlFor="newImage">
                    Featured Image
                  </label>
                  <div className="profile-form-field">
                    <Field
                      name="newImage"
                      id="newImage"
                      component={({ field, form }) => (
                        <input
                          id="file"
                          name="file"
                          type="file"
                          onChange={(event) => {
                            form.setFieldValue(
                              'newImage',
                              event.currentTarget.files[0],
                            );
                          }}
                        />
                      )}
                    />
                    <FormikErrorMessage name="newImage" component="div" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="profile-form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="profile-form-field profile-form-textarea">
                    <Field id="description" name="description">
                      {({ field }) => (
                        <RichTextArea
                          defaultText={formikProps.initialValues.description}
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="form-field">
                  <label
                    className="profile-form-label"
                    htmlFor="trailheadCoords"
                  >
                    Trailhead Coordinates (Longitude, Latitude)
                  </label>
                  <div className="profile-form-field">
                    <Field
                      type="text"
                      id="trailheadCoords"
                      name="trailheadCoords"
                      placeholder="Ex: 40.811850,-105.590210"
                    />
                    <FormikErrorMessage
                      name="trailheadCoords"
                      component="div"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="profile-form-label" htmlFor="address">
                    Address
                  </label>
                  <div className="profile-form-field">
                    <Field type="text" id="address" name="address" />
                    <FormikErrorMessage name="address" component="div" />
                  </div>
                </div>

                <div className="form-footer">
                  <button
                    type="submit"
                    disabled={
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting ||
                      loading
                    }
                  >
                    {submitLabel}
                  </button>
                  <Loading loading={loading} />
                  <ErrorMessage error={error} />
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default TrailForm;
