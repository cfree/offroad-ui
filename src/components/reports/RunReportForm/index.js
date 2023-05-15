import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';

import {
  RUN_REPORT_QUERY,
  SUBMIT_RUN_REPORT_MUTATION,
} from './runReportForm.graphql';
import { runReportSchema } from './runReportForm.schema';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import SuccessMessage from '../../utility/SuccessMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';
import RichTextArea from '../../utility/RichTextArea';
import { trailConditions, trailDifficulties } from '../../../lib/constants';
import useUser from '../../../hooks/useUser';

import Styles from './runReportForm.module.scss';

const RunReportForm = () => {
  const { error: userError, loading: userLoading, data: userData } = useUser();
  const params = useParams();
  const eventId = params.id;

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(RUN_REPORT_QUERY, {
    variables: { eventId },
  });
  const [
    logReport,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(SUBMIT_RUN_REPORT_MUTATION);

  if (queryLoading || userLoading) {
    return <div>Loading...</div>;
  }
  if (queryError || userError) {
    return <ErrorMessage error={queryError} />;
  }

  const { event } = queryData;
  const { myself } = userData;

  if (myself.id !== event.host.id) {
    return <ErrorMessage message="Only the run leader can submit a report" />;
  }

  const initialValues = {
    eventName: event.title,
    eventId: event.ID,
    trailName: event.trail.title,
    trailId: event.trail.ID,
    runLeaderName: `${event.host.firstName} ${event.host.lastName}`,
    runLeaderId: event.host.ID,
    attendees: event.RSVPs, // component
    //   members
    //   guests
    //   rigs
    weather: null, // component / dropdown
    trailDifficulty: event.trailDifficulty,
    trailConditions: '', // dropdown
    description: '',
    bandaids: [], // component
    notifyBoard: '',
  };

  return mutationData && mutationData.register ? (
    <SuccessMessage message={mutationData.register.message} />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={runReportSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await logReport({ variables: { ...values } });
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const disabled =
          !formikProps.dirty ||
          !formikProps.isValid ||
          formikProps.isSubmitting ||
          mutationLoading;

        return (
          <div className={Styles['form']}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="eventName">
                  Event
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={event.title}
                    disabled
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="trailName">
                  Trail
                </label>
                <div className={Styles['form-field']}>
                  <Field type="text" id="trailName" name="trailName" disabled />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="runLeader">
                  Run Leader
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="text"
                    id="runLeader"
                    name="runLeader"
                    value={`${event.host.firstName} ${event.host.firstName}`}
                    disabled
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label
                  className={Styles['event-form-label']}
                  htmlFor="trailDifficulty"
                >
                  Actual Difficulty
                </label>
                <div className={Styles['event-form-field']}>
                  <p>Expected difficulty: {event.trailDifficulty}</p>
                  <p>Was the difficulty different than what was expected?</p>
                  <Field
                    component="select"
                    name="trailDifficulty"
                    id="trailDifficulty"
                    selected={event.trailDifficulty}
                  >
                    {Object.values(trailDifficulties).map(([key, value]) => {
                      return <option value={key}>{value}</option>;
                    })}
                  </Field>
                  <FormikErrorMessage
                    name="didDifficultytrailDifficultyMatch"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="lastName">
                  Attendees
                </label>
                <div className={Styles['form-field']}>
                  {/* <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="lastName"
                    name="lastName"
                  /> */}
                  <FormikErrorMessage
                    name="lastName"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="email">
                  Weather
                </label>
                <div className={Styles['form-field']}>
                  {/* <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="email"
                    name="email"
                  />
                  <FormikErrorMessage name="email" render={FormErrorMessage} /> */}
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label
                  className={Styles['form-label']}
                  htmlFor="trailConditions"
                >
                  Trail Conditions
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    component="select"
                    name="trailConditions"
                    id="trailConditions"
                  >
                    {Object.values(trailConditions).map(([key, value]) => {
                      return <option value={key}>{value}</option>;
                    })}
                  </Field>
                  <FormikErrorMessage
                    name="trailConditions"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="description">
                  Description of Event
                </label>
                <div className={Styles['form-field']}>
                  <p>
                    All club members will be able to see this, so please refrain
                    from including any sensitive information.
                  </p>
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
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="notifyBoard">
                  Notify the Board
                </label>
                <div className={Styles['form-field']}>
                  <p>
                    If there is anything administratively or operationally
                    relevant that the officers should know about, please
                    describe it below. This information is confidential.
                  </p>
                  <Field
                    type="textarea"
                    onChange={formikProps.handleChange}
                    id="notifyBoard"
                    name="notifyBoard"
                  />
                  <FormikErrorMessage
                    name="notifyBoard"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <div />
                <div>
                  <Button type="submit" disabled={disabled}>
                    Submit
                  </Button>
                  <Loading loading={mutationLoading} />
                  <ErrorMessage error={mutationError} />
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RunReportForm;
