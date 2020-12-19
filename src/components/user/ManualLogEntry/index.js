import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LOG_MEMBERSHIP_ITEM_MUTATION } from './manualLogEntry.graphql';
import { MEMBERSHIP_LOG_QUERY } from '../MembershipLog/membershipLog.graphql';
import { membershipLogMessages } from '../../../lib/constants';
import Button from '../../common/Button';
import SuccessMessage from '../../utility/SuccessMessage';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';

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
      <div>
        <label htmlFor="msg">Message Code</label>
        <select name="msg" onChange={(e) => setCode(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <DatePicker selected={date} onChange={setDate} />
      </div>

      {code === 'DUES_PAID' && (
        <div>
          <label htmlFor="amt">$ Amount</label>
          <input
            type="number"
            name="amt"
            value={amt}
            required
            onChange={(e) => setAmt(e.target.value)}
          />
        </div>
      )}

      <Button
        onClick={handleChange}
        disabled={loading || !code || !date || (code === 'DUES_PAID' && !amt)}
      >
        Log
      </Button>
      <Loading loading={loading} />
      <ErrorMessage error={error} />
      {data && <SuccessMessage message={data.message} />}
    </>
  );
};

export default ManualLogEntry;
