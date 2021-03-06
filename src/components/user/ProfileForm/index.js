import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';
// import { format } from 'date-fns';
import get from 'lodash/get';
import cn from 'classnames';

import {
  SELF_PROFILE_QUERY,
  USER_UPDATE_PROFILE_MUTATION,
  MEMBER_PROFILE_QUERY,
} from './profileForm.graphql';
import { userSchema } from './profileForm.schema';
import AvatarUploader from '../../common/AvatarUploader';
// import RigUploader from '../../common/RigUploader';
import ErrorMessage from '../../utility/ErrorMessage';
import SuccessMessage from '../../utility/SuccessMessage';
import FormErrorMessage from '../../utility/FormErrorMessage';
import Loading from '../../utility/Loading';
import Filter from '../../login/Filter';
import {
  dateFormatForm,
  states,
  DEFAULT_AVATAR_SRC,
  trailDifficulties,
} from '../../../lib/constants';
import { formatPhone, isAtLeastBoardMember } from '../../../lib/utils';
import { dateEighteenYearsAgo } from '../../../utilities/dates';
import Button from '../../common/Button';
import { DatePickerField } from '../../utility/DateFields';

import Styles from './profileForm.module.scss';

class ProfileForm extends Component {
  state = {
    userForm: {},
  };

  render() {
    const { member } = this.props;
    const isSelf = !member || member === 'self';
    const query = isSelf ? SELF_PROFILE_QUERY : MEMBER_PROFILE_QUERY;

    return (
      <Query query={query} variables={{ username: this.props.member }}>
        {({ loading: queryLoading, error: queryError, data: queryData }) => {
          if (queryLoading) {
            return <div>Loading...</div>;
          }
          if (queryError) {
            return <ErrorMessage error={queryError} />;
          }

          const { isAdmin = false } = this.props;
          const { user } = queryData;
          const isGuest =
            user.accountType === 'GUEST' ||
            (user.accountStatus !== 'ACTIVE' &&
              user.accountStatus !== 'PAST_DUE');

          const userFormValues = {
            id: queryData.user.id,
            firstName: queryData.user.firstName || '',
            lastName: queryData.user.lastName || '',
            username: queryData.user.username || '', // admin
            gender: queryData.user.gender || 'MALE',
            birthdate:
              (queryData.user.birthdate &&
                new Date(queryData.user.birthdate)) ||
              null, // admin
            email: queryData.user.email, // admin
            joined:
              (queryData.user.joined && new Date(queryData.user.joined)) ||
              null, // admin
            phone:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.phone &&
                formatPhone(queryData.user.contactInfo.phone)) ||
              '',
            street:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.street) ||
              '',
            city:
              (queryData.user.contactInfo && queryData.user.contactInfo.city) ||
              '',
            state:
              (queryData.user.contactInfo &&
                queryData.user.contactInfo.state) ||
              'CO',
            zip:
              (queryData.user.contactInfo && queryData.user.contactInfo.zip) ||
              '',
            preferencesId: get(queryData, 'user.preferences.id', null),
            contactInfoId: get(queryData, 'user.contactInfo.id', null),
            emergencyContactName:
              (queryData.user.preferences &&
                queryData.user.preferences.emergencyContactName) ||
              '',
            emergencyContactPhone:
              (queryData.user.preferences &&
                queryData.user.preferences.emergencyContactPhone &&
                formatPhone(
                  queryData.user.preferences.emergencyContactPhone,
                )) ||
              '',
            comfortLevel: queryData.user.comfortLevel || 'UNKNOWN',
          };

          return (
            <>
              {isSelf && (
                <AvatarUploader
                  image={queryData.user.avatar}
                  isGuest={isGuest}
                />
              )}

              <Mutation
                mutation={USER_UPDATE_PROFILE_MUTATION}
                variables={this.state.userForm}
                refetchQueries={['PROFILE_QUERY']}
              >
                {(
                  userUpdateProfile,
                  {
                    error: mutationError,
                    loading: mutationLoading,
                    data: mutationData,
                  },
                ) => (
                  <Formik
                    initialValues={userFormValues}
                    validationSchema={userSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      this.setState(
                        (prevProps) => ({
                          userForm: {
                            ...values,
                            joined: values.joined || null,
                            showPhoneNumber: values.showPhoneNumber === 'yes',
                            phone: values.phone.split('-').join(''),
                            emergencyContactPhone: values.emergencyContactPhone
                              .split('-')
                              .join(''),
                          },
                        }),
                        () => {
                          setSubmitting(true);
                          userUpdateProfile();
                          setSubmitting(false);
                        },
                      );
                    }}
                    render={(formikProps) => (
                      <div
                        className={cn(
                          Styles['form'],
                          Styles['profile-form--user'],
                        )}
                      >
                        <form onSubmit={formikProps.handleSubmit}>
                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="firstName"
                            >
                              First Name
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
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
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="lastName"
                            >
                              Last Name
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
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
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                type="text"
                                onChange={formikProps.handleChange}
                                id="username"
                                name="username"
                                disabled={!isAdmin}
                              />
                              <FormikErrorMessage
                                name="username"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                component="select"
                                name="gender"
                                id="gender"
                              >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                                <option value="UNDISCLOSED">
                                  Prefer not to say
                                </option>
                              </Field>
                              <FormikErrorMessage
                                name="gender"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="birthdate"
                            >
                              Birthdate
                            </label>
                            <div>
                              <DatePickerField
                                id="birthdate"
                                name="birthdate"
                                value={formikProps.values.birthdate}
                                maxDate={dateEighteenYearsAgo()}
                                disabled={!isAdmin}
                                disableCalendar={!isAdmin}
                                onChange={formikProps.setFieldValue}
                                className={cn(Styles['profile-date-field'], {
                                  [Styles[
                                    'profile-date-field--disabled'
                                  ]]: !isAdmin,
                                })}
                              />
                              <FormikErrorMessage
                                name="birthdate"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <Filter roleCheck={isAtLeastBoardMember}>
                            <div className={Styles['form-field-wrapper']}>
                              <label
                                className={Styles['profile-form-label']}
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <div className={Styles['profile-form-field']}>
                                <Field
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formikProps.values.email}
                                  disabled
                                />
                                <FormikErrorMessage
                                  name="email"
                                  component={FormErrorMessage}
                                />
                              </div>
                            </div>
                          </Filter>

                          {isAdmin && (
                            <div className={Styles['form-field-wrapper']}>
                              <label
                                className={Styles['profile-form-label']}
                                htmlFor="joined"
                              >
                                Joined
                              </label>
                              <div>
                                <DatePickerField
                                  id="joined"
                                  name="joined"
                                  value={formikProps.values.joined}
                                  maxDate={new Date()}
                                  disabled={!isAdmin}
                                  disableCalendar={!isAdmin}
                                  onChange={formikProps.setFieldValue}
                                  className={cn(Styles['profile-date-field'], {
                                    [Styles[
                                      'profile-date-field--disabled'
                                    ]]: !isAdmin,
                                  })}
                                />
                                <FormikErrorMessage
                                  name="joined"
                                  component={FormErrorMessage}
                                />
                              </div>
                            </div>
                          )}

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="phone"
                            >
                              Phone Number
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                type="text"
                                inputMode="text"
                                placeholder="ex: 303-555-5555"
                                id="phone"
                                name="phone"
                              />
                              <FormikErrorMessage
                                name="phone"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="street"
                            >
                              Street Address
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field type="text" id="street" name="street" />
                              <FormikErrorMessage
                                name="street"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="city"
                            >
                              City
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field type="text" id="city" name="city" />
                              <FormikErrorMessage
                                name="city"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="state"
                            >
                              State
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field component="select" id="state" name="state">
                                {Object.entries(states).map(
                                  ([abbrev, state]) => (
                                    <option key={abbrev} value={abbrev}>
                                      {state}
                                    </option>
                                  ),
                                )}
                              </Field>
                              <FormikErrorMessage
                                name="state"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="zip"
                            >
                              Zip Code
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                type="text"
                                placeholder="ex: 80206"
                                inputMode="numeric"
                                id="zip"
                                name="zip"
                              />
                              <FormikErrorMessage
                                name="zip"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="emergencyContactName"
                            >
                              Emergency Contact Name
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                type="text"
                                id="emergencyContactName"
                                name="emergencyContactName"
                              />
                              <FormikErrorMessage
                                name="emergencyContactName"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="emergencyContactPhone"
                            >
                              Emergency Contact Phone Number
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                type="text"
                                inputMode="text"
                                placeholder="ex: 303-555-5555"
                                id="emergencyContactPhone"
                                name="emergencyContactPhone"
                              />
                              <FormikErrorMessage
                                name="emergencyContactPhone"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-field-wrapper']}>
                            <label
                              className={Styles['profile-form-label']}
                              htmlFor="comfortLevel"
                            >
                              Trail Comfort Level
                            </label>
                            <div className={Styles['profile-form-field']}>
                              <Field
                                component="select"
                                name="comfortLevel"
                                id="comfortLevel"
                              >
                                {Object.keys(trailDifficulties).map(
                                  (difficulty, i) => (
                                    <option key={i} value={difficulty}>
                                      {trailDifficulties[difficulty]}
                                    </option>
                                  ),
                                )}
                              </Field>
                              <FormikErrorMessage
                                name="comfortLevel"
                                component={FormErrorMessage}
                              />
                            </div>
                          </div>

                          <div className={Styles['form-footer']}>
                            <div />
                            <div>
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
                                    mutationData.updateUserProfileSettings
                                      .message
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  />
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ProfileForm;
