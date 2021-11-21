import React from 'react';
import { useQuery } from '@apollo/client';
import { v4 as uuid } from 'uuid';

import { NOTIFICATIONS_FORM_QUERY } from './editNotifications.graphql.js';

import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import { notificationsSettings } from '../../../lib/constants';
import Filter from '../../login/Filter';
import { isActiveOrPastDue, isMember } from '../../../lib/utils';

import Styles from './editNotifications.module.scss';
import SettingsCheckbox from '../utils/SettingsCheckbox.js';

const EditNotifications = () => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(NOTIFICATIONS_FORM_QUERY);

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { notificationSettings } = queryData || {
    notificationSettings: {},
  };

  // const actualSettings = Object.entries(notificationSettings).filter(
  //   ([key]) => !!notificationsSettings[key],
  // );

  return (
    <div className={Styles['notifications-form']}>
      <div className={Styles['notifications-section-wrapper']}>
        <section className={Styles['notifications-section']}>
          <h3 className={Styles['notifications-heading']}>
            Notifications Settings
          </h3>
          <div>
            <p>
              Our goal is to provide useful content and resources and we are
              committed to respecting your inbox. We’ll only email you according
              to the marketing categories to which you’ve opted-in.
            </p>

            <p>Please allow 24-48 hours for changes to take place.</p>

            <ul>
              <Filter statusCheck={isActiveOrPastDue} typeCheck={isMember}>
                <li>
                  <a href="https://4-playersofcolorado.us7.list-manage.com/unsubscribe?u=d2e88ec9413b12a7090dcb7a2&id=d70003e0c1">
                    Click here to unsubscribe from the members mailing list
                  </a>
                </li>
              </Filter>
              <li>
                <a href="https://4-playersofcolorado.us7.list-manage.com/unsubscribe?u=d2e88ec9413b12a7090dcb7a2&id=e6d31628f9">
                  Click here to unsubscribe from the public mailing list
                </a>
              </li>
            </ul>

            {/* <div className={Styles['change-notifications']}>
              <div className={Styles['notifications-details']}>
                <h4 className={Styles['form-label']}>Subscriptions</h4>
                <table className={Styles['table']}>
                  <tbody>
                    {queryLoading ? (
                      <Loading loading={queryLoading} />
                    ) : (
                      <>
                        {actualSettings.length > 0 &&
                          actualSettings.map((setting) => (
                            <SettingsCheckbox key={uuid()} setting={setting} />
                          ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      {/* 
        Campaigns:
        - Member Newsletter
        - Announcements

        Transactional: 
        - Event Updates (if RSVP yes)
        - Event Cancellations (if RSVP yes)
        - Password reset
        - Account created
          - To admin/board
          - To user
        - Account status change
          - Account unlocked triggers automation
          - New full member
        - Post event: Minutes have been posted
        
        Automation:
        - Welcome
          - New account welcome
          - New account helpful tips

      */}
    </div>
  );
};

export default EditNotifications;
