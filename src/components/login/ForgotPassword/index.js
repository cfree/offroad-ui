import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as yup from 'yup';

import { REQUEST_RESET_MUTATION } from './forgotPassword.graphql';
import Loading from '../../utility/Loading';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';
import Captcha from '../../common/Captcha';

import Styles from './forgotPassword.module.scss';

const forgotSchema = yup.object().shape({
  email: yup.string().email('email is a required field').required(),
});

const ForgotPassword = () => {
  const [validRecaptcha, setValidRecaptcha] = useState(false);
  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      refetchQueries: ['CURRENT_USER_QUERY'],
    },
  );
  const handleCaptchaChange = useCallback(
    (isValid) => {
      setValidRecaptcha(isValid);
    },
    [setValidRecaptcha],
  );

  return (
    <>
      <h2>Forgot Password</h2>

      <p>
        Please enter your email address and you'll receive an email with a reset
        link.
      </p>

      {data && data.requestReset ? (
        <SuccessMessage message={data.requestReset.message} />
      ) : (
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={forgotSchema}
          onSubmit={async ({ email }, { setSubmitting }) => {
            setSubmitting(true);
            await requestReset({
              variables: {
                email,
              },
            });
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <div className={Styles['form']}>
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
                    <div className={Styles['recaptcha']}>
                      <Captcha onChange={handleCaptchaChange} />
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        !formikProps.dirty ||
                        !formikProps.isValid ||
                        formikProps.isSubmitting ||
                        loading ||
                        !validRecaptcha
                      }
                    >
                      Request Reset
                    </Button>
                    <Loading loading={loading} />
                    <ErrorMessage error={error} />
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

export default ForgotPassword;
