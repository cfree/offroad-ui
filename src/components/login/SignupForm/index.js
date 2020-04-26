import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { useHistory } from 'react-router-dom';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { SIGNUP_MUTATION } from './signupForm.graphql';
import { userSchema } from './signupForm.schema';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import { dateEighteenYearsAgo } from '../../../utilities/dates';
import Button from '../../common/Button';

import Styles from './signupForm.module.scss';

const SignupForm = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    gender: 'MALE',
    birthdate: null,
  });

  return (
    <>
      <h2>Sign Up for an Account</h2>
      <Mutation mutation={SIGNUP_MUTATION}>
        {(
          signUp,
          {
            error: mutationError,
            loading: mutationLoading,
            data: mutationData,
          },
        ) =>
          mutationData ? (
            <>{mutationData && mutationData.signUp.message}</>
          ) : (
            <Formik
              initialValues={userInfo}
              validationSchema={userSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setUserInfo(values);
                setSubmitting(true);
                await signUp(values);
                history.push('/settings/profile');
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
                        <FormikErrorMessage name="email" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['form-label']}
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <div className={Styles['form-field']}>
                        <Field
                          type="text"
                          onChange={formikProps.handleChange}
                          id="firstName"
                          name="firstName"
                        />
                        <FormikErrorMessage name="firstName" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['form-label']}
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <div className={Styles['form-field']}>
                        <Field
                          type="text"
                          onChange={formikProps.handleChange}
                          id="lastName"
                          name="lastName"
                        />
                        <FormikErrorMessage name="lastName" component="div" />
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
                        <FormikErrorMessage name="gender" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['form-label']}
                        htmlFor="birthdate"
                      >
                        Birthdate
                      </label>
                      <div className={Styles['form-field']}>
                        <Field
                          type="date"
                          id="birthdate"
                          name="birthdate"
                          max={dateEighteenYearsAgo}
                        />
                        <FormikErrorMessage name="birthdate" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['form-label']}
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <div className={Styles['form-field']}>
                        <Field
                          type="text"
                          onChange={formikProps.handleChange}
                          id="username"
                          name="username"
                        />
                        <FormikErrorMessage name="username" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-field-wrapper']}>
                      <label
                        className={Styles['form-label']}
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className={Styles['form-field']}>
                        <Field
                          type="password"
                          onChange={formikProps.handleChange}
                          id="password"
                          name="password"
                        />
                        <FormikErrorMessage name="password" component="div" />
                      </div>
                    </div>

                    <div className={Styles['form-footer']}>
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
                  </form>
                </div>
              )}
            </Formik>
          )
        }
      </Mutation>
    </>
  );
};

export default SignupForm;
