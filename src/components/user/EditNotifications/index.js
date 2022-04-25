import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import toast from 'react-hot-toast';

import {
  NEWSLETTER_PREFS_QUERY,
  EDIT_NEWSLETTER_PREFS_MUTATION,
} from './editNotifications.graphql.js';

import Loading from '../../utility/Loading';
import Switch from '../../common/Switch';
import Filter from '../../login/Filter';
import { isActiveOrPastDue, isMember } from '../../../lib/utils';

import Styles from './editNotifications.module.scss';

const EditNotifications = () => {
  const { data: queryData, loading: queryLoading } = useQuery(
    NEWSLETTER_PREFS_QUERY,
  );
  const [
    editNewsletterPreferences,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(EDIT_NEWSLETTER_PREFS_MUTATION);

  const [isSubscribedToMembers, setIsSubscribedToMembers] = useState();
  const [isSubscribedToGeneral, setIsSubscribedToGeneral] = useState();

  useEffect(() => {
    if (queryData) {
      setIsSubscribedToGeneral(queryData.generalPref.status === 'SUBSCRIBE');
      setIsSubscribedToMembers(queryData.membersPref.status === 'SUBSCRIBE');
    }
  }, [queryData]);

  useEffect(() => {
    if (mutationData) {
      toast.success(mutationData.editNewsletterPreferences.message);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error(mutationError.message);
    }
  }, [mutationError]);

  const handleMembersListClick = async (checked) => {
    setIsSubscribedToMembers(checked);
    await editNewsletterPreferences({
      variables: {
        action: checked ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
        list: 'MEMBERS',
      },
    });
  };
  const handleGeneralListClick = (checked) => {
    setIsSubscribedToGeneral(checked);
    editNewsletterPreferences({
      variables: {
        action: checked ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
        list: 'GENERAL',
      },
    });
  };

  return (
    <div className={Styles['notifications-form']}>
      <div className={Styles['notifications-section-wrapper']}>
        <section className={Styles['notifications-section']}>
          <h3 className={Styles['notifications-heading']}>
            Notification Settings
          </h3>
          <div>
            <p>
              Our goal is to provide useful content and resources and we are
              committed to respecting your inbox. We’ll only email you according
              to the marketing categories to which you’ve opted-in.
            </p>

            <Filter statusCheck={isActiveOrPastDue} typeCheck={isMember}>
              <p>
                <strong>Members' Mailing List</strong>
                {queryLoading ? (
                  <Loading loading={mutationLoading} />
                ) : (
                  <Switch
                    offLabel="Unsubscribed"
                    onLabel="Subscribed"
                    onClick={handleMembersListClick}
                    onToStart={isSubscribedToMembers}
                  />
                )}
              </p>
            </Filter>
            <p>
              <strong>General Mailing List</strong>
              {queryLoading ? (
                <Loading loading={mutationLoading} />
              ) : (
                <Switch
                  offLabel="Unsubscribed"
                  onLabel="Subscribed"
                  onClick={handleGeneralListClick}
                  onToStart={isSubscribedToGeneral}
                />
              )}
            </p>

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
