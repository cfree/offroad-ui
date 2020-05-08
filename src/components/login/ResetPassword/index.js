import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as yup from 'yup';

import { RESET_MUTATION } from './resetPassword.graphql';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import SuccessMessage from '../../utility/SuccessMessage';
import Button from '../../common/Button';
import Captcha from '../../common/Captcha';

import Styles from './resetPassword.module.scss';

const resetSchema = yup.object().shape({
  password: yup.string().min(8).max(100).required(),
  confirmPassword: yup
    .string()
    .required('confirm password is a required field')
    .oneOf([yup.ref('password'), null], 'passwords must match'),
});

const ResetPassword = ({ token }) => {
  const [validRecaptcha, setValidRecaptcha] = useState(false);
  const [
    resetPassword,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(RESET_MUTATION, {
    refetchQueries: ['CURRENT_USER_QUERY'],
  });
  const history = useHistory();
  const handleCaptchaChange = useCallback(
    (isValid) => {
      setValidRecaptcha(isValid);
    },
    [setValidRecaptcha],
  );

  return (
    <>
      <h2>Reset Your Password</h2>

      {mutationData && mutationData.resetPassword ? (
        <SuccessMessage message={mutationData.resetPassword.message} />
      ) : (
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
            resetToken: token,
          }}
          validationSchema={resetSchema}
          onSubmit={async (
            { password, confirmPassword, resetToken },
            { setSubmitting },
          ) => {
            setSubmitting(true);
            await resetPassword({
              variables: {
                password,
                confirmPassword,
                resetToken,
              },
            });
            setSubmitting(false);
            history.push('/');
          }}
        >
          {(formikProps) => (
            <div className={Styles['form']}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="password">
                    Password
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      type="password"
                      onChange={formikProps.handleChange}
                      id="password"
                      name="password"
                    />
                    <FormikErrorMessage
                      name="password"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['form-label']}
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      type="password"
                      onChange={formikProps.handleChange}
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                    <FormikErrorMessage
                      name="confirmPassword"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <div />
                  <div>
                    <Field type="hidden" id="token" name="token" />

                    <div className={Styles['recaptcha']}>
                      <Captcha onChange={handleCaptchaChange} />
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        !formikProps.dirty ||
                        !formikProps.isValid ||
                        formikProps.isSubmitting ||
                        mutationLoading ||
                        !validRecaptcha
                      }
                    >
                      Reset
                    </Button>
                    <Loading loading={mutationLoading} />
                    <ErrorMessage error={mutationError} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default ResetPassword;
