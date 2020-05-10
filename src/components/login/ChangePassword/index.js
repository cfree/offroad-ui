import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as yup from 'yup';

import { CHANGE_PASSWORD_MUTATION } from './changePassword.graphql';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';
import SuccessMessage from '../../utility/SuccessMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';

import Styles from './changePassword.module.scss';

const initialValues = { password: '', changePassword: '' };

const passwordSchema = yup.object().shape({
  password: yup.string().min(8).required('Must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const [changePassword, { error, loading, data }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      refetchQueries: ['CURRENT_USER_QUERY'],
    },
  );

  return (
    <div className={Styles['change-password']}>
      <h3>Change your password</h3>

      {data && data.changePassword && (
        <SuccessMessage message={data.changePassword.message} />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={passwordSchema}
        onSubmit={async (values) => {
          await changePassword({ variables: values });
        }}
      >
        {(formikProps) => (
          <div className={`${Styles['form']} profile-form--user`}>
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
                  <Button
                    type="submit"
                    disabled={
                      !formikProps.dirty || !formikProps.isValid || loading
                    }
                  >
                    Change
                  </Button>
                  <Loading loading={loading} />
                </div>
              </div>
              <ErrorMessage error={error} />
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
