import React from 'react';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useQuery } from '@apollo/react-hooks';
import format from 'date-fns/format';

import { ACCOUNT_FORM_QUERY } from './accountForm.graphql.js';
// import Switch from '../../common/Switch';
import ChangeEmail from '../../login/ChangeEmail';
import ChangePassword from '../../login/ChangePassword';
import Filter from '../../login/Filter';
import ErrorMessage from '../../utility/ErrorMessage';
import Icon from '../../common/Icon';
import Badge from '../../common/Badge';
import {
  isEmeritusMember,
  // isMember,
  isAtLeastAssociateMember, // Full && Associate
  isActive,
  isPastDue,
  isDelinquent,
  isInactive,
  hasResigned,
  wasRemoved,
  isGuestMember,
  isLocked,
  isLimited,
  isDeceasedMember,
  // isActiveOrPastDue,
} from '../../../lib/utils';
import { accountTypes, accountStatuses } from '../../../lib/constants';

import Styles from './accountForm.module.scss';

const AccountForm = ({ token = null }) => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(ACCOUNT_FORM_QUERY);

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  if (queryLoading) {
    return 'Loading...';
  }

  const { myself, logItems } = queryData;
  const { accountType, accountStatus, email } = myself;

  return (
    <div className={Styles['account-form']}>
      <div className={Styles['account-section-wrapper']}>
        <section className={Styles['account-section']}>
          <h3 className={Styles['account-heading']}>Account Details</h3>
          <div className={Styles['account-content']}>
            <div className={Styles['account-details']}>
              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={isActive}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="success">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>

                  <p>Your account is in good standing.</p>
                </>
              </Filter>

              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={isPastDue}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="caution">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Past Due</h3> */}
                    Happy New Year! It's {new Date().getFullYear()} and that
                    means it's time to pay your membership dues. Please pay
                    before March 31st to remain on the membership roster.
                    <a
                      href="http://www.paypal.me/4playersco/20.91"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pay Dues
                    </a>
                  </p>
                </>
              </Filter>

              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={isDelinquent}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="warning">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Lapsed</h3> */}
                    We had to suspend your account because your membership dues
                    had not been received by March 31st. If you would like to
                    reactivate your membership, send the{' '}
                    <a href="mailto:board@4-playersofcolorado.org">Board</a> a
                    quick email.
                  </p>
                </>
              </Filter>

              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={isInactive}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="failure">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Inactive</h3> */}
                    Your membership has lapsed due to non-payment. If you would
                    like to become a member again, send the{' '}
                    <a href="mailto:board@4-playersofcolorado.org">Board</a> a
                    quick email.
                  </p>
                </>
              </Filter>

              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={hasResigned}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="failure">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Resigned</h3> */}
                    You have resigned from membership. Sorry to see you go! If
                    you would like to become a member again, send the{' '}
                    <a href="mailto:board@4-playersofcolorado.org">Board</a> a
                    quick email.
                  </p>
                </>
              </Filter>

              <Filter
                typeCheck={isAtLeastAssociateMember}
                statusCheck={wasRemoved}
              >
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="failure">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Removed</h3> */}
                    You have been removed from membership. If you have any
                    questions, please contact the{' '}
                    <a href="mailto:board@4-playersofcolorado.org">Board</a>.
                  </p>
                </>
              </Filter>

              <Filter typeCheck={isGuestMember} statusCheck={isActive}>
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="neutral">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Guest</h3> */}
                    You are a guest.
                    <br /> Runs Attended: 2 <br />
                    Meetings Attended: 0<br />
                    You must attend 1 run and run regular meeting before you are
                    eligible for membership. If you have any questions, please
                    contact the{' '}
                    <a href="mailto:board@4-playersofcolorado.org">Board</a>.
                  </p>
                </>
              </Filter>

              <Filter typeCheck={isGuestMember} statusCheck={isLimited}>
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="warning">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Limited</h3> */}
                    You are a guest. Runs Attended: 3{' '}
                    <small>
                      You are allowed to attend 3 runs before we ask that you
                      become a member
                    </small>
                    Meetings Attended: 1 Congratulations! You are eligible for
                    membership. If you have any questions, please contact the
                    <a href="mailto:board@4-playersofcolorado.org">Board</a>.
                  </p>
                </>
              </Filter>

              <Filter typeCheck={isEmeritusMember}>
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="neutral">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* Account Type: Emeritus */}
                    {/* <h3>Limited</h3> */}
                    You are an Emeritus Member. You have all the perks of full
                    membership, except you do not have to pay annual dues and
                    you cannot vote on club business.
                  </p>
                </>
              </Filter>

              <Filter typeCheck={isGuestMember} statusCheck={isLocked}>
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']} type="failure">
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Locked</h3> */}
                    Welcome! Your account is being reviewed. Please make sure
                    your profile is filled out. If you have any questions,
                    please contact the{' '}
                    <a href="mailto:webmaster@4-playersofcolorado.org">
                      Webmaster
                    </a>
                    .
                  </p>
                </>
              </Filter>

              <Filter typeCheck={isDeceasedMember}>
                <>
                  <h4>
                    {accountTypes[accountType]} Member{' '}
                    <Badge className={Styles['badge']}>
                      {accountStatuses[accountStatus]}
                    </Badge>
                  </h4>
                  <p>
                    {/* <h3>Locked</h3> */}
                    This account belonged to a club member who has passed away.
                    It is being maintained for historical records.
                  </p>
                </>
              </Filter>
            </div>
          </div>
        </section>

        <Filter typeCheck={isAtLeastAssociateMember}>
          <section className={Styles['account-section']}>
            <h3 className={Styles['account-heading']}>Annual Dues</h3>

            <div className={Styles['account-content']}>
              {logItems && logItems.length > 0 ? (
                <>
                  {logItems.map((item) => (
                    <div key={item.id} className={Styles['account-details']}>
                      <Icon className={Styles['icon']} icon="success" /> Paid{' '}
                      {format(new Date(item.time), 'MM/dd/yyyy')}
                    </div>
                  ))}
                </>
              ) : (
                <div className={Styles['account-details']}>
                  <h4>No record of dues received</h4>
                </div>
              )}
            </div>
          </section>
        </Filter>

        {/* <div>
          <div>
            <h3>Notifications</h3>
          </div>

          <div>
            <div>
              <h4>General Newsletter</h4>
              <p>
                Get notified of upcoming events, announcements, and other
                club-related updates.
              </p>
              <p>Switch</p>
            </div>

            <Filter typeCheck={isMember} statusCheck={isActive}>
              <div>
                <h4>Member Newsletter</h4>
                <p>
                  Get notified of meeting minutes, votes, and other club-related
                  business.
                </p>
                <p>Switch</p>
              </div>
            </Filter>

            <Filter statusCheck={isActiveOrPastDue}>
              <div>
                <h4>Event Announcements</h4>
                <p>Get notified of upcoming club events.</p>
                <p>Switch</p>
              </div>
            </Filter>
          </div>
        </div> */}
      </div>

      {/* 
        <NotificationPreferences /> 

        Campaigns:
        - Member Newsletter
        - Club Announcements
        - Event Announcements

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

      <div className={Styles['email-actions']}>
        <ChangeEmail email={email} />
        <ChangePassword />
      </div>
      {/* <DeleteAccount /> */}
    </div>
  );
};

export default AccountForm;
