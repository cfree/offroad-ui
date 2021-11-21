import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as yup from 'yup';

import { CHANGE_EMAIL_MUTATION } from './changeEmail.graphql';
import Loading from '../../utility/Loading';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';

import Styles from './changeEmail.module.scss';

const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const ChangeEmail = ({ email }) => {
  const [changeEmail, { error, loading, data }] = useMutation(
    CHANGE_EMAIL_MUTATION,
    {
      refetchQueries: ['CURRENT_USER_QUERY'],
    },
  );

  return (
    <div className={Styles['change-email']}>
      <h3>Change your email address</h3>

      {data && data.changeEmail && (
        <SuccessMessage message={data.changeEmail.message} />
      )}

      <Formik
        initialValues={{ email }}
        validationSchema={emailSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await changeEmail({ variables: values });
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <div className={`${Styles['form']} profile-form--user`}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="email">
                  Email
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="email"
                    name="email"
                  />
                  <FormikErrorMessage
                    name="email"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <div />
                <div>
                  <Button
                    type="submit"
                    disabled={
                      !formikProps.dirty ||
                      !formikProps.isValid ||
                      formikProps.isSubmitting ||
                      loading
                    }
                  >
                    Change
                  </Button>
                  <Loading loading={loading} />
                  <ErrorMessage error={error} />
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ChangeEmail;
