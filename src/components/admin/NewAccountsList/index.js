import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import differenceInYears from 'date-fns/differenceInYears';

import {
  NEW_ACCOUNTS_QUERY,
  NEW_ACCOUNTS_APPROVE_MUTATION,
  NEW_ACCOUNTS_REJECT_MUTATION,
} from './newAccountsList.graphql';
import Button from '../../common/Button';
import Loading from '../../utility/Loading';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import { genders } from '../../../lib/constants';
import { SideModal } from '../../common/Modal';

import Styles from './newAccountsList.module.scss';

const NewAccountsList = () => {
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [rejectId, setRejectId] = useState();

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(NEW_ACCOUNTS_QUERY);
  const [
    unlockNewAccount,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(NEW_ACCOUNTS_APPROVE_MUTATION);

  const [
    rejectNewAccount,
    { error: rejectError, loading: rejectLoading, data: rejectData },
  ] = useMutation(NEW_ACCOUNTS_REJECT_MUTATION);

  const handleUnlock = useCallback(
    (id) => {
      unlockNewAccount({
        variables: { userId: id },
        refetchQueries: [{ query: NEW_ACCOUNTS_QUERY }],
      });
    },
    [unlockNewAccount],
  );

  const handleOpenModal = useCallback(
    (id) => {
      setRejectId(id);
      setReasonModalOpen(true);
    },
    [setRejectId, setReasonModalOpen],
  );

  const handleCloseModal = useCallback(() => {
    setRejectId();
    setReasonModalOpen(false);
  }, [setRejectId, setReasonModalOpen]);

  const handleReject = useCallback(() => {
    const fn = async () => {
      await rejectNewAccount({
        variables: { userId: rejectId, reason },
        refetchQueries: [{ query: NEW_ACCOUNTS_QUERY }],
      });

      handleCloseModal();
    };

    fn();
  }, [rejectNewAccount, handleCloseModal, reason, rejectId]);

  if (queryLoading) {
    return <Loading loading />;
  }

  if (queryError) {
    return <ErrorMessage error={queryError} />;
  }

  const { users } = queryData;

  return (
    <div>
      <h2>Locked New Accounts</h2>
      <p>
        <strong>
          Please add new user to "4-Players of Colorado" general email list on
          Mailchimp
        </strong>
      </p>
      {mutationError && <ErrorMessage error={mutationError} />}
      {rejectError && <ErrorMessage error={rejectError} />}
      {mutationData && (
        <SuccessMessage message={mutationData.unlockNewAccount.message} />
      )}
      {rejectData && (
        <SuccessMessage message={rejectData.rejectNewAccount.message} />
      )}
      <table className={Styles['new-accounts-table']}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Unlock/Notify</th>
          </tr>
        </thead>
        {users && users.length > 0 ? (
          <tbody>
            {users.map((user) => {
              const {
                id,
                firstName,
                lastName,
                birthdate,
                gender,
                username,
              } = user;
              const age = differenceInYears(new Date(), new Date(birthdate));

              return (
                <tr key={id}>
                  <td>
                    <Link to={`/admin/profile/${username}`}>
                      {firstName} {lastName}
                    </Link>
                  </td>
                  <td>{age}</td>
                  <td>{genders[gender]}</td>
                  <td>
                    <Loading loading={mutationLoading || rejectLoading} />
                    <Button onClick={() => handleUnlock(id)}>Unlock</Button>
                    <Button onClick={() => handleOpenModal(id)}>Reject</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colspan="4">No new accounts</td>
            </tr>
          </tbody>
        )}
      </table>
      <SideModal
        title="Reason for Reject"
        isOpen={reasonModalOpen}
        onClose={handleCloseModal}
      >
        <p>
          Please provide a reason for this account reject. An email will be sent
          to this user.
        </p>
        <input
          type="text"
          className={Styles['reason-input']}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button disabled={!reason} onClick={handleReject}>
          Confirm Rejection
        </Button>
      </SideModal>
    </div>
  );
};

export default NewAccountsList;
