import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

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

import './adminProfileForm.module.scss';

class AdminProfileForm extends Component {
  state = {
    userAdminForm: {},
  };

  render() {
    return (
      <Query
        query={MEMBER_ADMIN_PROFILE_QUERY}
        variables={{ username: this.props.member }}
      >
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
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
            title: user.title,
            isCharterMember: user.isCharterMember ? 'yes' : 'no',
            office: user.office,
            role: user.role,
            accountType: user.accountType,
            accountStatus: user.accountStatus,
          };

          return (
            <Mutation
              mutation={USER_ADMIN_UPDATE_PROFILE_MUTATION}
              variables={this.state.userAdminForm}
              refetchQueries={['PROFILE_QUERY']}
            >
              {(
                updateUserAdminProfile,
                {
                  error: mutationError,
                  loading: mutationLoading,
                  data: mutationData,
                },
              ) => (
                <Formik
                  initialValues={userAdminFormValues}
                  validationSchema={userSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log('VALUES', values);
                    this.setState(
                      {
                        userAdminForm: {
                          id: user.id,
                          ...values,
                          isCharterMember: values.isCharterMember === 'yes',
                          title: values.title === 'None' ? null : values.title,
                          office:
                            values.office === 'None' ? null : values.office,
                        },
                      },
                      () => {
                        setSubmitting(true);
                        updateUserAdminProfile();
                        setSubmitting(false);
                      },
                    );
                  }}
                  render={(formikProps) => (
                    <div className="form profile-form--user">
                      <form onSubmit={formikProps.handleSubmit}>
                        <div className="form-field">
                          <label className="profile-form-label" htmlFor="title">
                            Title
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="title"
                              id="title"
                              defaultValue={user.title || null}
                            >
                              <option value={null}>None</option>
                              {Object.entries(titles).map((title, idx) => (
                                <option key={idx} value={title[0]}>
                                  {title[1]}
                                </option>
                              ))}
                            </Field>
                            <FormikErrorMessage name="title" component="div" />
                          </div>
                        </div>

                        <div className="form-field">
                          <div className="profile-form-label">
                            Is Charter Member?
                          </div>
                          <div className="profile-form-field">
                            <label htmlFor="isCharterMemberYes">
                              <Field
                                type="radio"
                                id="isCharterMemberYes"
                                name="isCharterMember"
                                value="yes"
                                checked={
                                  formikProps.values.isCharterMember === 'yes'
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="isCharterMemberNo">
                              <Field
                                type="radio"
                                id="isCharterMemberNo"
                                name="isCharterMember"
                                value="no"
                                checked={
                                  formikProps.values.isCharterMember === 'no'
                                }
                              />
                              No
                            </label>
                            <FormikErrorMessage
                              name="isCharterMember"
                              component="div"
                            />
                          </div>
                        </div>

                        {/* <div className="form-field">
                          <div className="profile-form-label">
                            Is On Sponsor List? (4wd.com, etc.)
                          </div>
                          <div className="profile-form-field">
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
                              component="div"
                            />
                          </div>
                        </div> */}

                        <div className="form-field">
                          <label
                            className="profile-form-label"
                            htmlFor="office"
                          >
                            Office
                          </label>
                          <div className="profile-form-field">
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
                            <FormikErrorMessage name="office" component="div" />
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="profile-form-label" htmlFor="role">
                            Role
                          </label>
                          <div className="profile-form-field">
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
                            <FormikErrorMessage name="role" component="div" />
                          </div>
                        </div>

                        <div className="form-field">
                          <label
                            className="profile-form-label"
                            htmlFor="accountStatus"
                          >
                            Account Status
                          </label>
                          <div className="profile-form-field">
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
                              component="div"
                            />
                          </div>
                        </div>

                        <div className="form-field">
                          <label
                            className="profile-form-label"
                            htmlFor="accountType"
                          >
                            Account Type
                          </label>
                          <div className="profile-form-field">
                            <Field
                              component="select"
                              name="accountType"
                              id="accountType"
                              defaultValue={user.accountType}
                            >
                              {Object.entries(accountTypes).map(
                                (accountType, idx) => (
                                  <option key={idx} value={accountType[0]}>
                                    {accountType[1]}
                                  </option>
                                ),
                              )}
                            </Field>
                            <FormikErrorMessage
                              name="accountType"
                              component="div"
                            />
                          </div>
                        </div>

                        <div className="form-footer">
                          <button
                            type="submit"
                            disabled={
                              formikProps.errors.length === 0 ||
                              !formikProps.dirty ||
                              formikProps.isSubmitting ||
                              mutationLoading
                            }
                          >
                            Update
                          </button>
                          <Loading loading={mutationLoading} />
                          <ErrorMessage error={mutationError} />
                          {mutationData &&
                            mutationData.updateUserAdminProfileSettings.message}
                        </div>
                      </form>
                    </div>
                  )}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AdminProfileForm;
