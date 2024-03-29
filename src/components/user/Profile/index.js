import React from 'react';
import { useQuery } from '@apollo/client';
import differenceInYears from 'date-fns/differenceInYears';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import ReactTooltip from 'react-tooltip';
import format from 'date-fns/format';

import { PROFILE_QUERY } from './profile.graphql';
import ErrorMessage from '../../utility/ErrorMessage';
import Filter from '../../login/Filter';
import {
  getPhoneNumber,
  isAtLeastBoardMember,
  isAtLeastRunLeader,
} from '../../../lib/utils';
import { trailDifficulties, dateFormat } from '../../../lib/constants';
import Icon from '../../common/Icon';

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

                <Filter role={isAtLeastBoardMember}>
                  {user.birthdate && (
                    <>
                      <dt>
                        Age{' '}
                        <Icon
                          data-tip="Only visible to yourself and admin"
                          icon="lock"
                        />
                      </dt>
                      <dd>
                        {differenceInYears(
                          new Date(),
                          new Date(user.birthdate),
                        )}{' '}
                      </dd>
                    </>
                  )}
                </Filter>

                {user.email && (
                  <>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </dd>
                  </>
                )}

                {user.joined && (
                  <>
                    <dt>Joined</dt>
                    <dd>{format(new Date(user.joined), dateFormat)}</dd>
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
                        <dt>
                          Address{' '}
                          <Icon
                            data-tip="Only visible to yourself and admin"
                            icon="lock"
                          />
                        </dt>
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
                        <dt>
                          ICE{' '}
                          <Icon
                            data-tip="Your emergency contact. Only visible to yourself, run leaders, and admin"
                            icon="lock"
                          />
                        </dt>
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
                      <dd>{trailDifficulties[user.comfortLevel]}</dd>
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
      <ReactTooltip place="right" type="dark" effect="solid" />
    </div>
  );
};

export default Profile;
