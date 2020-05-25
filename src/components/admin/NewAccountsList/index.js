import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import differenceInYears from 'date-fns/differenceInYears';

import {
  NEW_ACCOUNTS_QUERY,
  NEW_ACCOUNTS_MUTATION,
} from './newAccountsList.graphql';
import Button from '../../common/Button';
import Loading from '../../utility/Loading';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import { genders } from '../../../lib/constants';

const NewAccountsList = () => {
  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(NEW_ACCOUNTS_QUERY);
  const [
    unlockNewAccount,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(NEW_ACCOUNTS_MUTATION);

  const handleUnlock = useCallback(
    (id) => {
      unlockNewAccount({
        variables: { userId: id },
      });
    },
    [unlockNewAccount],
  );

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
      {mutationError && <ErrorMessage error={mutationError} />}
      {mutationData && (
        <SuccessMessage message={mutationData.unlockNewAccount.message} />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Unlock/Notify</th>
          </tr>
        </thead>
        {users && (
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
                    <Link to={`/profile/${username}`}>
                      {firstName} {lastName}
                    </Link>
                  </td>
                  <td>{age}</td>
                  <td>{genders[gender]}</td>
                  <th>
                    <Loading loading={mutationLoading} />
                    <Button onClick={() => handleUnlock(id)}>Unlock</Button>
                    {/* <Button>Remove</Button> */}
                  </th>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default NewAccountsList;
