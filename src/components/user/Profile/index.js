import React from 'react';
import { Query } from '@apollo/react-components';
import { format, differenceInYears } from 'date-fns';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import { PROFILE_QUERY } from './profile.graphql';
import ErrorMessage from '../../utility/ErrorMessage';
import Calendar from '../../events/Calendar';
import Filter from '../../login/Filter';
import {
  accountTypes as types,
  offices,
  titles,
  outfitLevel,
  DEFAULT_AVATAR_SRC,
  DEFAULT_RIG_SRC,
} from '../../../lib/constants';
import {
  sortByDateDesc,
  getPhoneNumber,
  isAtLeastBoardMember,
  isAtLeastRunLeader,
} from '../../../lib/utils';

import Styles from './profile.module.scss';

const Profile = ({ username }) => {
  const isSelf = username === undefined;

  return (
    <Query query={PROFILE_QUERY} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { user } = data;
        const convertedTitles = get(titles, 'user.title', []);
        const RIG_SRC = get(user, 'rig.image.url', DEFAULT_RIG_SRC);
        const AVATAR_SRC = get(user, 'avatar.url', DEFAULT_AVATAR_SRC);
        const { vehicle } = user;
        const vehicleInfo = [
          get(vehicle, 'year', ''),
          get(vehicle, 'make', ''),
          get(vehicle, 'model', ''),
          get(vehicle, 'trim', ''),
        ]
          .filter((detail) => !!detail)
          .join(' ');

        return (
          <div className={Styles['profile']}>
            <header>
              <div
                aria-label={"User's Vehicle"}
                className={Styles['user-vehicle']}
                style={{
                  'background-image': `url(${RIG_SRC})`,
                }}
              />

              {user ? (
                <div className={Styles['user-header']}>
                  <div className={Styles['user-demographics']}>
                    <img src={AVATAR_SRC} height="130" alt="Avatar" />
                    <div className={Styles['user-name-info']}>
                      <div className={Styles['user-name']}>
                        <h2 className={Styles['user-full-name']}>
                          {user.firstName} {user.lastName}
                        </h2>
                      </div>
                      <ul className={Styles['user-info']}>
                        {user.foundingMember && <li>Founding Member</li>}
                        <li>{types[user.accountType]} Member</li>
                        {(user.office || convertedTitles.length > 0) && (
                          <li>
                            {[offices[user.office], ...convertedTitles].join(
                              ', ',
                            )}
                          </li>
                        )}
                        <li>
                          Joined {format(new Date(user.joined), 'm/d/yyyy')}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className={Styles['user-actions']}>
                    {isSelf && (
                      <li>
                        <Link to="/settings/profile">Edit Profile</Link>
                      </li>
                    )}
                    {!isSelf && (
                      <Filter role={isAtLeastBoardMember}>
                        <li>
                          <Link to={`admin-profile/${user.username}`}>
                            Edit Profile
                          </Link>
                        </li>
                      </Filter>
                    )}
                    {!isSelf && isAtLeastRunLeader(user.role) && (
                      <li>
                        <Link
                          to={{
                            pathname: 'message',
                            query: { to: user.username },
                          }}
                        >
                          Send Message
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <h3>No user information</h3>
              )}
            </header>

            {user && (
              <main>
                <div className={Styles['user-details']}>
                  <div>
                    <h3>Information</h3>

                    <dl>
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
                            {differenceInYears(
                              new Date(),
                              new Date(user.birthdate),
                            )}
                          </dd>
                        </Filter>
                      )}

                      {user.email && (isSelf || isAtLeastRunLeader(user.role)) && (
                        <>
                          <dt>Email</dt>
                          <dd>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </dd>
                        </>
                      )}

                      {get(user, 'contactInfo.phone') &&
                        (get(user, 'contactInfo.showPhoneNumber', true) ||
                          isSelf ||
                          isAtLeastRunLeader(user.role)) && (
                          <>
                            <dt>Phone</dt>
                            <dd>{getPhoneNumber(user.contactInfo.phone)}</dd>
                          </>
                        )}

                      {get(user, 'contactInfo.street') &&
                        get(user, 'contactInfo.city') &&
                        get(user, 'contactInfo.state') &&
                        get(user, 'contactInfo.zip') &&
                        (isSelf || isAtLeastBoardMember(user.role)) && (
                          <>
                            <dt>Address</dt>
                            <dd>
                              <address>
                                {user.contactInfo.street}
                                <br />
                                {user.contactInfo.city},{' '}
                                {user.contactInfo.state} {user.contactInfo.zip}
                              </address>
                            </dd>
                          </>
                        )}

                      {get(user, 'preferences.emergencyContactName') &&
                        get(user, 'preferences.emergencyContactPhone') &&
                        (isSelf || isAtLeastRunLeader(user.role)) && (
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
                        )}
                    </dl>
                  </div>

                  {vehicle ? (
                    <div className={Styles['user-garage']}>
                      <h3>{user.firstName}'s Garage</h3>
                      <dl>
                        {vehicleInfo && (
                          <>
                            <dt>Vehicle</dt>
                            <dd>{vehicleInfo}</dd>
                          </>
                        )}

                        {vehicle.name && (
                          <>
                            <dt>Name</dt>
                            <dd>{vehicle.name}</dd>
                          </>
                        )}

                        {vehicle.outfitLevel && (
                          <>
                            <dt>Outfit Level</dt>
                            <dd>{outfitLevel[vehicle.outfitLevel]}</dd>
                          </>
                        )}

                        {vehicle.mods && (
                          <>
                            <dt>Mods</dt>
                            <dd>{vehicle.mods.join(', ')}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  ) : (
                    <div>No vehicle found. Add something to your garage.</div>
                  )}
                </div>

                {(user.comfortLevel ||
                  get(user, 'preferences.photoPermissions')) && (
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
                )}

                {(get(user, 'eventsRSVPd', []).length > 0 ||
                  get(user, 'trailsVisited', []).length > 0 ||
                  get(user, 'bandaids', []).length > 0 ||
                  get(user, 'runReportsLogged', []).length > 0) && (
                  <div className={Styles['user-data']}>
                    <div className={Styles['user-data__section']}>
                      <h3>Events Attended</h3>
                      {get(user, 'eventsRSVPd', []).length > 0 ? (
                        <ul>
                          {user.eventsRSVPd
                            .filter((event) => event.status === 'GOING')
                            .map((rsvp) => (
                              <li key={rsvp.event.id}>
                                {format(
                                  new Date(rsvp.event.startTime),
                                  'm/d/yyyy',
                                )}
                                {' - '}
                                <Link to={`/event/${rsvp.event.id}`}>
                                  {rsvp.event.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <span>No events found...</span>
                      )}
                    </div>

                    <div className={Styles['user-data__section']}>
                      <h3>Trails Visited</h3>
                      {get(user, 'trailsVisited', []).length > 0 ? (
                        <ul>
                          {user.trailsVisited.map((trail) => (
                            <li key={trail.id}>{trail.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No trails found...</span>
                      )}
                    </div>

                    {/* <div className={Styles["user-data__section"]}>
                      <h3>Bandaids</h3>
                      {get(user, 'bandaids', []).length > 0 ? (
                        <ul>
                          {user.bandaids.map(bandaid => (
                            <li key={bandaid.id}>
                              {format(new Date(bandaid.occurred), 'm/d/yyyy')}
                              {' '}
                              {bandaid.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No bandaids found...</span>
                      )}
                    </div>
                    
                    <div className={Styles["user-data__section"]}>
                      <h3>Run Reports</h3>
                      {get(user, 'runReportsLogged', []).length > 0 ? (
                        <ul>
                          {user.runReportsLogged.map(report => (
                            <li key={report.id}>
                              {format(new Date(report.reportFiled), 'm/d/yyyy')}
                              {' '}
                              {report.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No run reports found...</span>
                      )}
                    </div> */}
                  </div>
                )}

                {(isSelf || isAtLeastBoardMember(user.role)) && (
                  <>
                    <h3>Activity Log</h3>
                    <section>
                      <div className={Styles['user-logs']}>
                        <div className={Styles['activity-log']}>
                          {user.activityLog && user.activityLog.length > 0 ? (
                            <ul>
                              {user.activityLog
                                .sort(sortByDateDesc('time'))
                                .map((entry) => (
                                  <li key={entry.id}>
                                    <Calendar date={entry.time} />
                                    {entry.message}

                                    {entry.link && (
                                      <Link to={entry.link}>></Link>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <span>No items found...</span>
                          )}
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </main>
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default Profile;
