import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { REGISTRATION_QUERY, SIGNUP_MUTATION } from './signupForm.graphql';
import { userSchema } from './signupForm.schema';
import Loading from '../../utility/Loading';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import { dateEighteenYearsAgo } from '../../../utilities/dates';
import Button from '../../common/Button';
import { useQueryParams } from '../../../hooks/useQueryParams';

import Styles from './signupForm.module.scss';

const SignupForm = () => {
  const { token } = useQueryParams();

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(REGISTRATION_QUERY, {
    variables: {
      token: token || 'fail',
    },
    skip: !token,
  });

  const [
    signUp,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(SIGNUP_MUTATION);

  if (!token) {
    return <ErrorMessage error={{ message: 'No token specified.' }} />;
  }

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  if (queryLoading || !queryData.getRegistration) {
    return 'Loading...';
  }

  const { email, firstName, lastName } = queryData.getRegistration;

  return (
    <>
      <h2>Sign Up for a Guest Account</h2>

      {mutationData && mutationData.signUp && (
        <SuccessMessage message={mutationData.signUp.message} />
      )}
      {queryData && queryData.getRegistration && (
        <Formik
          initialValues={{
            email,
            firstName,
            lastName,
            username: '',
            gender: 'MALE',
            birthdate: '',
            token,
          }}
          validationSchema={userSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await signUp(values);
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <div className={`${Styles['form']} profile-form--user`}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="firstName">
                    First Name
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      disabled
                      type="text"
                      onChange={formikProps.handleChange}
                      id="firstName"
                      name="firstName"
                    />
                    <FormikErrorMessage
                      name="firstName"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="lastName">
                    Last Name
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      disabled
                      type="text"
                      onChange={formikProps.handleChange}
                      id="lastName"
                      name="lastName"
                    />
                    <FormikErrorMessage
                      name="lastName"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="email">
                    Email
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      disabled
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
                  <label className={Styles['form-label']} htmlFor="username">
                    Username
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      type="text"
                      onChange={formikProps.handleChange}
                      id="username"
                      name="username"
                    />
                    <FormikErrorMessage
                      name="username"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="gender">
                    Gender
                  </label>
                  <div className={Styles['form-field']}>
                    <Field component="select" name="gender" id="gender">
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                      <option value="UNDISCLOSED">Prefer not to say</option>
                    </Field>
                    <FormikErrorMessage
                      name="gender"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

                <div className={Styles['form-field-wrapper']}>
                  <label className={Styles['form-label']} htmlFor="birthdate">
                    Birthdate
                  </label>
                  <div className={Styles['form-field']}>
                    <Field
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      max={dateEighteenYearsAgo}
                    />
                    <FormikErrorMessage
                      name="birthdate"
                      component={FormErrorMessage}
                    />
                  </div>
                </div>

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
                  <div />
                  <div>
                    <Field type="hidden" id="token" name="token" />

                    <Button
                      type="submit"
                      disabled={
                        !formikProps.dirty ||
                        !formikProps.isValid ||
                        formikProps.isSubmitting ||
                        mutationLoading
                      }
                    >
                      Sign Up
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

export default SignupForm;
