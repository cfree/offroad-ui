import React from 'react';
import { format, startOfToday } from 'date-fns';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import cn from 'classnames';

import { eventSchema } from './eventForm.schema';
import RichTextArea from '../../utility/RichTextArea';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import { eventTypes, trailDifficulties } from '../../../lib/constants';
// import EventImageUploader from '../EventImageUploader';
import UploadImagePreview from '../../common/UploadImagePreview';

import Styles from './eventForm.module.scss';

const EventForm = ({
  initialValues,
  onSubmit,
  runLeaders = [],
  trails = [],
  loading = '',
  error,
  submitLabel = 'Submit',
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={eventSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => {
          return (
            <div className={cn(Styles['form'], Styles['event-form--user'])}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['event-form-label']} htmlFor="type">
                    Event Type
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      component="select"
                      name="type"
                      id="type"
                      defaultValue={formikProps.initialValues.type}
                    >
                      {Object.entries(eventTypes).map((diff, idx) => (
                        <option value={diff[0]} key={idx}>
                          {diff[1]}
                        </option>
                      ))}
                    </Field>
                    <FormikErrorMessage
                      name="type"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['event-form-label']} htmlFor="title">
                    Title
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field type="text" id="title" name="title" />
                    <FormikErrorMessage
                      name="title"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field id="description" name="description">
                      {({ field }) => (
                        <RichTextArea
                          defaultText={formikProps.initialValues.description}
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                    <FormikErrorMessage
                      name="description"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="startDate"
                  >
                    Start Date
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      min={format(startOfToday(), 'yyyy-MM-dd')}
                      onChange={(e) => {
                        formikProps.setFieldValue('endDate', e.target.value);
                        formikProps.handleChange(e);
                      }}
                    />{' '}
                    <Field type="time" id="startTime" name="startTime" />
                    <small>Mountain Timezone</small>
                    <FormikErrorMessage
                      name="startDate"
                      component={FormErrorMessage}
                    />
                    <FormikErrorMessage
                      name="startTime"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="endTime"
                  >
                    End Date
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      min={formikProps.values.startDate}
                    />

                    <Field type="time" id="endTime" name="endTime" />
                    <small>Mountain Timezone</small>
                    <FormikErrorMessage
                      name="endDate"
                      component={FormErrorMessage}
                    />
                    <FormikErrorMessage
                      name="endTime"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                {formikProps.values.type === 'RUN' ? (
                  <div className={Styles['form-field-wrapper']}>
                    <label
                      className={Styles['event-form-label']}
                      htmlFor="rallyAddress"
                    >
                      Rally Place
                    </label>
                    <div className={Styles['event-form-field']}>
                      <Field
                        type="text"
                        id="rallyAddress"
                        name="rallyAddress"
                      />
                      <FormikErrorMessage
                        name="rallyAddress"
                        component={FormErrorMessage}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={Styles['form-field-wrapper']}>
                    <label
                      className={Styles['event-form-label']}
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <div className={Styles['event-form-field']}>
                      <Field type="text" id="address" name="address" />{' '}
                      <small>
                        <i>(optional)</i>
                      </small>
                      <FormikErrorMessage
                        name="address"
                        component={FormErrorMessage}
                      />
                    </div>
                  </div>
                )}

                {/* <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="trailNotes"
                  >
                    Trail Notes
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      type="text"
                      onChange={formikProps.handleChange}
                      id="trailNotes"
                      name="trailNotes"
                    />
                    <FormikErrorMessage
                      name="trailNotes"
                      component={FormErrorMessage}
                    />
                  </div>
                </div> */}

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="rallyTime"
                  >
                    Rally Time
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field type="time" id="rallyTime" name="rallyTime" />
                    <FormikErrorMessage
                      name="rallyTime"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="membersOnly"
                  >
                    Members Only?
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      type="checkbox"
                      id="membersOnly"
                      name="membersOnly"
                      value={true}
                    />
                    <FormikErrorMessage
                      name="membersOnly"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['event-form-label']} htmlFor="host">
                    Run Leader
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      component="select"
                      name="host"
                      id="host"
                      disabled={runLeaders.length === 1}
                      defaultValue={formikProps.initialValues.host}
                    >
                      {runLeaders.map((leader, idx) => (
                        <option value={leader.username} key={leader.username}>
                          {leader.firstName} {leader.lastName}
                        </option>
                      ))}
                    </Field>
                    <FormikErrorMessage
                      name="host"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                {formikProps.values.type === 'RUN' ? (
                  <>
                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['event-form-label']}
                        htmlFor="trail"
                      >
                        Trail
                      </label>
                      <div className={Styles['event-form-field']}>
                        <Field
                          component="select"
                          name="trail"
                          id="trail"
                          defaultValue={formikProps.initialValues.trail}
                        >
                          {trails.map((trail) => (
                            <option value={trail.id} key={trail.id}>
                              {trail.name}
                            </option>
                          ))}
                        </Field>
                        <FormikErrorMessage
                          name="trail"
                          component={FormErrorMessage}
                        />
                      </div>
                    </div>
                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['event-form-label']}
                        htmlFor="trailDifficulty"
                      >
                        Difficulty
                      </label>
                      <div className={Styles['event-form-field']}>
                        <Field
                          component="select"
                          name="trailDifficulty"
                          id="trailDifficulty"
                          defaultValue={
                            formikProps.initialValues.trailDifficulty
                          }
                        >
                          {Object.entries(trailDifficulties).map(
                            (diff, idx) => (
                              <option value={diff[0]} key={idx}>
                                {diff[1]}
                              </option>
                            ),
                          )}
                        </Field>
                        <FormikErrorMessage
                          name="trailDifficulty"
                          component={FormErrorMessage}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={Styles['form-field-wrapper']}>
                    {formikProps.values.newImage && (
                      <UploadImagePreview file={formikProps.values.newImage} />
                    )}

                    {!formikProps.values.newImage && initialValues.image && (
                      <img src={initialValues.image} alt="" width="400" />
                    )}
                    <label
                      className={Styles['event-form-label']}
                      htmlFor="newImage"
                    >
                      Featured Image
                    </label>
                    <div className={Styles['event-form-field']}>
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
                      <FormikErrorMessage
                        name="newImage"
                        component={FormErrorMessage}
                      />
                    </div>
                  </div>
                )}

                <div className={Styles['form-footer']}>
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

export default EventForm;
