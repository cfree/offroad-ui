import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import cn from 'classnames';

import {
  MEMBER_ADMIN_PROFILE_QUERY,
  USER_ADMIN_UPDATE_PROFILE_MUTATION,
} from './adminProfileForm.graphql';
import { userSchema } from './adminProfileForm.schema';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import {
  titles,
  offices,
  roles,
  accountStatuses,
  accountTypes,
} from '../../../lib/constants';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Button from '../../common/Button';

import Styles from './adminProfileForm.module.scss';
import SuccessMessage from '../../utility/SuccessMessage';

const AdminProfileForm = ({ username }) => {
  const [userAdminForm, setUserAdminForm] = useState({});

  const isSelf = !username || username === 'self';
  // const QUERY = isSelf ? ADMIN_SELF_PROFILE_QUERY : ADMIN_MEMBER_PROFILE_QUERY;

  const [
    updateUserAdminProfile,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(USER_ADMIN_UPDATE_PROFILE_MUTATION, {
    refetchQueries: ['PROFILE_QUERY'],
    variables: userAdminForm,
  });

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(MEMBER_ADMIN_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  if (queryLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { user } = queryData;

  {
    /* isOnSponsorList: user.isOnSponsorList ? 'yes' : 'no', */
  }

  const userAdminFormValues = {
    titles: user.titles || [],
    office: user.office,
    role: user.role,
    accountType: user.accountType,
    accountStatus: user.accountStatus,
  };

  return (
    <Formik
      initialValues={userAdminFormValues}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setUserAdminForm({
          id: user.id,
          ...values,
          titles: values.titles.length === 0 ? null : values.titles,
          office: values.office === 'None' ? null : values.office,
        });

        setSubmitting(true);
        await updateUserAdminProfile();
        setSubmitting(false);
      }}
      render={(formikProps) => {
        return (
          <div className={cn(Styles['form'], Styles['profile-form--user'])}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['profile-form-label']}>Titles</label>
                <div className={Styles['profile-form-field']}>
                  {Object.keys(titles).map((title) => (
                    <label>
                      <Field
                        type="checkbox"
                        name="titles"
                        id="titles"
                        value={title}
                        checked={formikProps.values.titles.includes(title)}
                        onChange={(event) => {
                          const value = event.target.value;
                          const wasChecked = event.target.checked;

                          if (wasChecked) {
                            formikProps.setFieldValue('titles', [
                              ...formikProps.values.titles,
                              value,
                            ]);
                          } else {
                            formikProps.setFieldValue('titles', [
                              ...formikProps.values.titles.filter(
                                (title) => title !== value,
                              ),
                            ]);
                          }
                        }}
                      />{' '}
                      {titles[title]}
                    </label>
                  ))}
                  <FormikErrorMessage
                    name="titles"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              {/* <div className={Styles['form-field-wrapper']}>
              <label className={Styles['profile-form-label']} htmlFor="titles">
                Titles
              </label>
              <div className={Styles['profile-form-field']}>
                <Field
                  component="select"
                  name="titles"
                  id="titles"
                  defaultValue={(user.titles && user.titles[0]) || null}
                >
                  <option value={null}>None</option>
                  {Object.entries(titles).map((title, idx) => (
                    <option key={idx} value={title[0]}>
                      {title[1]}
                    </option>
                  ))}
                </Field>
                <FormikErrorMessage
                  name="titles"
                  component={FormErrorMessage}
                />
              </div>
            </div> */}

              {/* <div className={Styles['form-field-wrapper']}>
                <div className={Styles['profile-form-label']}>
                  Is On Sponsor List? (4wd.com, etc.)
                </div>
                <div className={Styles['profile-form-field']}>
                  <label htmlFor="isOnSponsorList">
                    <Field
                      type="radio"
                      id="isOnSponsorListYes"
                      name="isOnSponsorList"
                      value="yes"
                      checked={
                        formikProps.values.isOnSponsorList === 'yes'
                      }
                    />
                    Yes
                  </label>
                  <label htmlFor="isOnSponsorListNo">
                    <Field
                      type="radio"
                      id="isOnSponsorListNo"
                      name="isOnSponsorList"
                      value="no"
                      checked={
                        formikProps.values.isOnSponsorList === 'no'
                      }
                    />
                    No
                  </label>
                  <FormikErrorMessage
                    name="isOnSponsorList"
                    component={FormErrorMessage}
                  />
                </div>
              </div> */}

              <div className={Styles['form-field-wrapper']}>
                <label
                  className={Styles['profile-form-label']}
                  htmlFor="office"
                >
                  Office
                </label>
                <div className={Styles['profile-form-field']}>
                  <Field
                    component="select"
                    name="office"
                    id="office"
                    defaultValue={user.office || null}
                  >
                    <option value={null}>None</option>
                    {Object.entries(offices).map((office, idx) => (
                      <option key={idx} value={office[0]}>
                        {office[1]}
                      </option>
                    ))}
                  </Field>
                  <FormikErrorMessage
                    name="office"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label className={Styles['profile-form-label']} htmlFor="role">
                  Role
                </label>
                <div className={Styles['profile-form-field']}>
                  <Field
                    component="select"
                    name="role"
                    id="role"
                    defaultValue={user.role}
                  >
                    {Object.entries(roles).map((role, idx) => (
                      <option key={idx} value={role[0]}>
                        {role[1]}
                      </option>
                    ))}
                  </Field>
                  <FormikErrorMessage
                    name="role"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label
                  className={Styles['profile-form-label']}
                  htmlFor="accountStatus"
                >
                  Account Status
                </label>
                <div className={Styles['profile-form-field']}>
                  <Field
                    component="select"
                    name="accountStatus"
                    id="accountStatus"
                    defaultValue={user.accountStatus}
                  >
                    {Object.entries(accountStatuses).map(
                      (accountStatus, idx) => (
                        <option key={idx} value={accountStatus[0]}>
                          {accountStatus[1]}
                        </option>
                      ),
                    )}
                  </Field>
                  <FormikErrorMessage
                    name="accountStatus"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-field-wrapper']}>
                <label
                  className={Styles['profile-form-label']}
                  htmlFor="accountType"
                >
                  Account Type
                </label>
                <div className={Styles['profile-form-field']}>
                  <Field
                    component="select"
                    name="accountType"
                    id="accountType"
                    defaultValue={user.accountType}
                  >
                    {Object.entries(accountTypes).map((accountType, idx) => (
                      <option key={idx} value={accountType[0]}>
                        {accountType[1]}
                      </option>
                    ))}
                  </Field>
                  <FormikErrorMessage
                    name="accountType"
                    component={FormErrorMessage}
                  />
                </div>
              </div>

              <div className={Styles['form-footer']}>
                <Button
                  type="submit"
                  disabled={
                    formikProps.errors.length === 0 ||
                    !formikProps.dirty ||
                    !formikProps.isValid ||
                    formikProps.isSubmitting ||
                    mutationLoading
                  }
                >
                  Update
                </Button>
                <Loading loading={mutationLoading} />
                <ErrorMessage error={mutationError} />
                {mutationData && (
                  <SuccessMessage
                    message={
                      mutationData.updateUserAdminProfileSettings.message
                    }
                  />
                )}
              </div>
            </form>
          </div>
        );
      }}
    />
  );
};

export default AdminProfileForm;
