import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import differenceInYears from 'date-fns/differenceInYears';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import { PROFILE_QUERY } from './profile.graphql';
import ErrorMessage from '../../utility/ErrorMessage';
import Filter from '../../login/Filter';
import {
  getPhoneNumber,
  isAtLeastBoardMember,
  isAtLeastRunLeader,
} from '../../../lib/utils';

import Styles from './profile.module.scss';

const Profile = ({ username, isSelf }) => {
  const { loading, error, data } = useQuery(PROFILE_QUERY, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { user } = data;

  return (
    <div className={Styles['profile']}>
      {user && (
        <main>
          <div className={Styles['user-details']}>
            <div>
              <h3>
                Details
                {isSelf && (
                  <small>
                    <Link to="/settings/profile">Edit</Link>
                  </small>
                )}
              </h3>

              <dl className={Styles['details-list']}>
                {user.firstName && user.lastName && (
                  <>
                    <dt>Name</dt>
                    <dd>
                      {user.firstName} {user.lastName}
                    </dd>
                  </>
                )}

                {user.birthdate && (
                  <Filter role={isAtLeastBoardMember}>
                    <dt>Age</dt>
                    <dd>
                      {differenceInYears(new Date(), new Date(user.birthdate))}
                    </dd>
                  </Filter>
                )}

                {user.email && (
                  <>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </dd>
                  </>
                )}

                {get(user, 'contactInfo.phone') &&
                  get(user, 'contactInfo.showPhoneNumber', true) && (
                    <>
                      <dt>Phone</dt>
                      <dd>{getPhoneNumber(user.contactInfo.phone)}</dd>
                    </>
                  )}

                {get(user, 'contactInfo.street') &&
                  get(user, 'contactInfo.city') &&
                  get(user, 'contactInfo.state') &&
                  get(user, 'contactInfo.zip') && (
                    <Filter
                      selfCheck={user.username}
                      roleCheck={isAtLeastRunLeader}
                    >
                      <>
                        <dt>Address</dt>
                        <dd>
                          <address>
                            {user.contactInfo.street}
                            <br />
                            {user.contactInfo.city}, {user.contactInfo.state}{' '}
                            {user.contactInfo.zip}
                          </address>
                        </dd>
                      </>
                    </Filter>
                  )}

                {get(user, 'preferences.emergencyContactName') &&
                  get(user, 'preferences.emergencyContactPhone') && (
                    <Filter
                      selfCheck={user.username}
                      roleCheck={isAtLeastRunLeader}
                    >
                      <>
                        <dt>Emergency Contact</dt>
                        <dd>
                          {user.preferences.emergencyContactName}{' '}
                          <small>
                            {getPhoneNumber(
                              user.preferences.emergencyContactPhone,
                            )}
                          </small>
                        </dd>
                      </>
                    </Filter>
                  )}
              </dl>
            </div>
          </div>

          {(user.comfortLevel || get(user, 'preferences.photoPermissions')) && (
            <Filter selfCheck={user.username} roleCheck={isAtLeastRunLeader}>
              <div>
                <h3>Preferences</h3>
                <dl>
                  {user.comfortLevel && (
                    <>
                      <dt>Comfort Level</dt>
                      <dd>{user.comfortLevel}</dd>
                    </>
                  )}

                  {get(user, 'preferences.photoPermissions') &&
                    (isSelf || isAtLeastRunLeader(user.role)) && (
                      <>
                        <dt>Okay to be in photos?</dt>
                        <dd>
                          {user.preferences.photoPermissions ? 'Yes' : 'No'}
                        </dd>
                      </>
                    )}
                </dl>
              </div>
            </Filter>
          )}
        </main>
      )}
    </div>
  );
};

export default Profile;
