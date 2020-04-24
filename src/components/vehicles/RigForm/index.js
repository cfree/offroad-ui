import React from 'react';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { rigSchema } from './rigForm.schema';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import { outfitLevel } from '../../../lib/constants';

import './rigForm.module.scss';

const RigForm = ({ initialValues, onSubmit, loading = '', error }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={rigSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => (
          <div className="form profile-form--user">
            <form onSubmit={formikProps.handleSubmit}>
              <div className="form-field">
                <label className="profile-form-label" htmlFor="year">
                  Year
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="year" name="year" />
                  <FormikErrorMessage name="year" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="make">
                  Make
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="make" name="make" />
                  <FormikErrorMessage name="make" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="model">
                  Model
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="model" name="model" />
                  <FormikErrorMessage name="model" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="trim">
                  Trim
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="trim" name="trim" />
                  <FormikErrorMessage name="trim" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="name">
                  Name
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="name" name="name" />
                  <FormikErrorMessage name="name" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="outfitLevel">
                  Outfit Level
                </label>
                <div className="profile-form-field">
                  <Field
                    component="select"
                    name="outfitLevel"
                    id="outfitLevel"
                    defaultValue={formikProps.initialValues.outfitLevel}
                  >
                    {Object.entries({ 0: 'n/a', ...outfitLevel }).map(
                      (outfitLevel, idx) => (
                        <option key={idx} value={outfitLevel[0]}>
                          {outfitLevel[1]}
                        </option>
                      ),
                    )}
                  </Field>
                  <FormikErrorMessage name="outfitLevel" component="div" />
                </div>
              </div>

              <div className="form-field">
                <label className="profile-form-label" htmlFor="mods">
                  Mods (comma separated)
                </label>
                <div className="profile-form-field">
                  <Field type="text" id="mods" name="mods" />
                  <FormikErrorMessage name="mods" component="div" />
                </div>
              </div>

              {/* <Field type="checkbox" name="isDefault" /> */}

              <div className="form-footer">
                <button
                  type="submit"
                  disabled={
                    Object.keys(formikProps.errors).length > 0 ||
                    formikProps.isSubmitting ||
                    loading
                  }
                >
                  Update
                </button>
                <Loading loading={loading} />
                <ErrorMessage error={error} />
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default RigForm;
