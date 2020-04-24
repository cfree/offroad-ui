import React from 'react';
import { Mutation } from '@apollo/react-components';

import { LOG_MEMBERSHIP_ITEM_MUTATION } from './manualLogEntry.graphql';
import { membershipLogMessageTypes } from '../../../lib/constants';

const ManualLogEntry = () => {
  return (
    <div>
      {() => (
        <>
          <div>
            <label htmlFor="">Time</label>
            <input type="time" />
          </div>

          <div>
            <label htmlFor="">Message Code</label>
            <select>
              {membershipLogMessageTypes.map((type) => (
                <select key={type} value={type}>
                  {type}
                </select>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default ManualLogEntry;
