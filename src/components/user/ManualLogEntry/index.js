import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOG_MEMBERSHIP_ITEM_MUTATION } from './manualLogEntry.graphql';
import { MEMBERSHIP_LOG_QUERY } from '../MembershipLog/membershipLog.graphql';
import { membershipLogMessages } from '../../../lib/constants';
import Button from '../../common/Button';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';
import DatePicker from '../../utility/DatePicker';

import Styles from './manualLogEntry.module.scss';

const ManualLogEntry = ({ userId, username }) => {
  const [logMembershipEntry, { error, loading, data }] = useMutation(
    LOG_MEMBERSHIP_ITEM_MUTATION,
    {
      refetchQueries: [
        { query: MEMBERSHIP_LOG_QUERY, variables: { username } },
      ],
    },
  );

  const types = ['DUES_PAID', 'MEMBERSHIP_ELIGIBLE', 'GUEST_RESTRICTED'];
  const [date, setDate] = useState(new Date());
  const [code, setCode] = useState(types[0]);
  const [amt, setAmt] = useState(process.env.REACT_APP_FULL_MEMBERSHIP_DUES);

  // Refetch
  const handleChange = useCallback(() => {
    const asyncFn = async () => {
      let message;

      if (amt) {
        message = membershipLogMessages[code](amt);
      } else {
        message = membershipLogMessages[code]();
      }

      await logMembershipEntry({
        variables: {
          date,
          message,
          code,
          userId,
        },
      });
    };

    asyncFn();
  }, [logMembershipEntry, date, code, userId, amt]);

  return (
    <>
      <div className={Styles['form']}>
        <div className={Styles['form-field-wrapper']}>
          <label className={Styles['form-label']} htmlFor="msg">
            Message Code
          </label>
          <div className={Styles['form-field']}>
            <select name="msg" onChange={(e) => setCode(e.target.value)}>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={Styles['form-field-wrapper']}>
          <label className={Styles['form-label']} htmlFor="date">
            Date
          </label>
          <div>
            <DatePicker
              value={date}
              onChange={setDate}
              className={Styles['date-field']}
            />
          </div>
        </div>

        {code === 'DUES_PAID' && (
          <div className={Styles['form-field-wrapper']}>
            <label className={Styles['form-label']} htmlFor="amt">
              $ Amount
            </label>
            <div className={Styles['form-field']}>
              <input
                type="number"
                name="amt"
                value={amt}
                required
                onChange={(e) => setAmt(e.target.value)}
                className={Styles['form-field']}
              />
            </div>
          </div>
        )}

        <div className={Styles['form-footer']}>
          <Button
            onClick={handleChange}
            disabled={
              loading || !code || !date || (code === 'DUES_PAID' && !amt)
            }
          >
            Log
          </Button>
          <Loading loading={loading} />
          <ErrorMessage error={error} />
          {data && <SuccessMessage message={data.message} />}
        </div>
      </div>
    </>
  );
};

export default ManualLogEntry;
