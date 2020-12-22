import React, { useState, useCallback } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import debounce from 'lodash/debounce';

import {
  roles,
  accountTypes,
  accountStatuses,
  offices,
} from '../../../lib/constants';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';

import {
  UPDATE_ACCOUNT_STATUS_MUTATION,
  UPDATE_ACCOUNT_TYPE_MUTATION,
  UPDATE_OFFICE_MUTATION,
  UPDATE_ROLE_MUTATION,
  ALL_USERS_QUERY,
} from './roles.graphql';

class UserProperty extends React.Component {
  state = {
    selectedProperty: this.props.currentProperty || 'NONE',
  };

  handleChange = (e, updateCallback) => {
    this.setState(
      {
        selectedProperty:
          this.props.allowNone && e.target.value === 'NONE'
            ? null
            : e.target.value,
      },
      updateCallback,
    );
  };

  render() {
    const {
      userId,
      userProperty,
      currentProperty,
      properties,
      allowNone = false,
    } = this.props;
    let mutation;

    switch (userProperty) {
      case 'role':
        mutation = UPDATE_ROLE_MUTATION;
        break;
      case 'accountType':
        mutation = UPDATE_ACCOUNT_TYPE_MUTATION;
        break;
      case 'accountStatus':
        mutation = UPDATE_ACCOUNT_STATUS_MUTATION;
        break;
      case 'office':
      default:
        mutation = UPDATE_OFFICE_MUTATION;
        break;
    }

    return (
      <Mutation
        mutation={mutation}
        variables={{
          [userProperty]: this.state.selectedProperty,
          userId,
        }}
      >
        {(updateProperty, { loading, error }) => (
          <label htmlFor={`${userProperty}-${userId}`}>
            <select
              name={`${userProperty}-${userId}`}
              id={`${userProperty}-${userId}`}
              onChange={(e) => {
                this.handleChange(e, updateProperty);
              }}
              defaultValue={currentProperty}
            >
              {allowNone && (
                <option key={0} value="NONE">
                  None
                </option>
              )}
              {Object.entries(properties).map((property) => {
                return (
                  <option key={property[0]} value={property[0]}>
                    {property[1]}
                  </option>
                );
              })}
            </select>
            <Loading loading={loading} />
            <ErrorMessage error={error} />
          </label>
        )}
      </Mutation>
    );
  }
}

const UserRole = (props) => (
  <UserProperty properties={roles} userProperty="role" {...props} />
);

const UserAccountType = (props) => (
  <UserProperty
    properties={accountTypes}
    userProperty="accountType"
    {...props}
  />
);

const UserAccountStatus = (props) => (
  <UserProperty
    properties={accountStatuses}
    userProperty="accountStatus"
    {...props}
  />
);

const UserOffice = (props) => (
  <UserProperty
    properties={offices}
    userProperty="office"
    {...props}
    allowNone
  />
);

const MemberTable = ({ allUsers }) => {
  const [userList, setUserList] = useState(allUsers);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSetUserList = debounce((user) => {
    setUserList(user);
    setLoading(false);
  }, 500);

  const filterUsers = useCallback(
    (e) => {
      const keyword = e.target.value.toString();
      setKeyword(keyword);
      setLoading(true);

      if (keyword) {
        debouncedSetUserList(
          allUsers.filter(
            (user) =>
              user.firstName.toUpperCase().includes(keyword.toUpperCase()) ||
              user.lastName.toUpperCase().includes(keyword.toUpperCase()),
          ),
        );
      } else {
        debouncedSetUserList(allUsers);
      }
    },
    [debouncedSetUserList, setKeyword, setLoading, allUsers],
  );

  return (
    <>
      <div>
        <h3>Filter Results</h3>
        <input value={keyword} type="search" onChange={filterUsers} />
        <Loading loading={loading} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                <UserRole userId={user.id} currentProperty={user.role} />
              </td>
              <td>
                <UserAccountType
                  userId={user.id}
                  currentProperty={user.accountType}
                />
              </td>
              <td>
                <UserAccountStatus
                  userId={user.id}
                  currentProperty={user.accountStatus}
                />
              </td>
              <td>
                <UserOffice userId={user.id} currentProperty={user.office} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const MemberPermissions = (props) => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        }

        return (
          <>
            <ErrorMessage error={error} />
            <h2>Manage Permissions</h2>
            {data.users && <MemberTable allUsers={data.users} />}
          </>
        );
      }}
    </Query>
  );
};

export default MemberPermissions;
