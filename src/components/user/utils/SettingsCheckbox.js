import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

import { NOTIFICATIONS_FORM_MUTATION } from '../EditNotifications/editNotifications.graphql.js';

import { notificationsSettings } from '../../../lib/constants';
import Loading from '../../utility/Loading';

const SettingsCheckbox = ({ setting }) => {
  const [key, value] = setting;
  const [
    setNotifications,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(NOTIFICATIONS_FORM_MUTATION);

  const handleChange = useCallback(
    (settingName, value) => {
      const fn = async () => {
        try {
          await setNotifications({
            variables: {
              settings: {
                [settingName]: value,
              },
            },
          });

          toast.success(
            `${notificationsSettings[settingName]} setting successfully updated`,
          );
        } catch (e) {
          toast.error(e.message.replace('GraphQL error: ', ''));
        }
      };

      fn();
    },
    [setNotifications],
  );

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          defaultChecked={value}
          disabled={mutationLoading}
          onChange={(e) => {
            handleChange(key, e.target.checked);
          }}
        />
      </td>
      <td>{notificationsSettings[key]}</td>
    </tr>
  );
};

export default SettingsCheckbox;
