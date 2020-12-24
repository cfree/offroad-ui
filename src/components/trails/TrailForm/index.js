import React from 'react';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import cn from 'classnames';

import { trailSchema } from './trailForm.schema';
import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';

import Styles from './trailForm.module.scss';

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
            <div className={cn(Styles['form'], Styles['trail-form--user'])}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['trail-form-label']} htmlFor="name">
                    Name
                  </label>
                  <div className={Styles['trail-form-field']}>
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
                    <FormikErrorMessage
                      name="name"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['trail-form-label']} htmlFor="slug">
                    URL Slug
                  </label>
                  <div className={Styles['trail-form-field']}>
                    <Field
                      type="text"
                      id="slug"
                      name="slug"
                      onChange={(e) => {
                        formikProps.setFieldValue(
                          'slug',
                          e.target.value.replace(' ', '-'),
                        );
                      }}
                    />
                    <br />
                    <small>
                      4-playersofcolorado.org/trail/
                      <strong>{formikProps.values.slug}</strong>
                    </small>
                    <FormikErrorMessage
                      name="slug"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['trail-form-label']}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className={Styles['trail-form-field']}>
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

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['trail-form-label']}
                    htmlFor="trailheadCoords"
                  >
                    Trailhead Coordinates (Longitude, Latitude)
                  </label>
                  <div className={Styles['trail-form-field']}>
                    <Field
                      type="text"
                      id="trailheadCoords"
                      name="trailheadCoords"
                      placeholder="Ex: 40.811850,-105.590210"
                    />
                    <FormikErrorMessage
                      name="trailheadCoords"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['trail-form-label']}
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <div className={Styles['trail-form-field']}>
                    <Field type="text" id="address" name="address" />
                    <FormikErrorMessage
                      name="address"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-footer']}>
                  <Button
                    type="submit"
                    disabled={
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting ||
                      loading
                    }
                  >
                    {submitLabel}
                  </Button>
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
