import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { REGISTER_MUTATION } from './registerForm.graphql';
import { registerSchema } from './registerForm.schema';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import SuccessMessage from '../../utility/SuccessMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';
import Captcha from '../../common/Captcha';

import Styles from './registerForm.module.scss';

const RegisterForm = ({ source = 'website' }) => {
  const [validRecaptcha, setValidRecaptcha] = useState(false);
  const [register, { error, loading, data }] = useMutation(REGISTER_MUTATION);

  const registerInfo = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    source,
  };

  const handleCaptchaChange = useCallback(
    (isValid) => {
      setValidRecaptcha(isValid);
    },
    [setValidRecaptcha],
  );

  return data && data.register ? (
    <SuccessMessage message={data.register.message} />
  ) : (
    <Formik
      initialValues={registerInfo}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await register({ variables: { ...values } });
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const disabled =
          !validRecaptcha ||
          !formikProps.dirty ||
          !formikProps.isValid ||
          formikProps.isSubmitting ||
          loading;

        return (
          <div className={Styles['form']}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="firstName">
                  First Name
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="firstName"
                    name="firstName"
                  />
                  <FormikErrorMessage
                    name="firstName"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="lastName">
                  Last Name
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="lastName"
                    name="lastName"
                  />
                  <FormikErrorMessage
                    name="lastName"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

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
                  <FormikErrorMessage name="email" render={FormErrorMessage} />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['form-label']} htmlFor="confirmEmail">
                  Confirm Email
                </label>
                <div className={Styles['form-field']}>
                  <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="confirmEmail"
                    name="confirmEmail"
                  />
                  <FormikErrorMessage
                    name="confirmEmail"
                    render={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <div />
                <div>
                  <Field type="hidden" id="source" name="source" />

                  <div className={Styles['recaptcha']}>
                    <Captcha onChange={handleCaptchaChange} />
                  </div>

                  <Button type="submit" disabled={disabled}>
                    Register
                  </Button>
                  <Loading loading={loading} />
                  <ErrorMessage error={error} />
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
