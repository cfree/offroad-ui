import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';
import Loading from '../../utility/Loading';

import { CHANGE_PASSWORD_MUTATION } from './changePassword.graphql';
// import Form from './styles/Form';
import Error from '../../utility/ErrorMessage';

import './changePassword.module.scss';

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={CHANGE_PASSWORD_MUTATION}
        variables={{
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={['CURRENT_USER_QUERY']}
      >
        {(changePassword, { error, loading, data }) => {
          console.log('data', data);

          return (
            <form
              className="form"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await changePassword();
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Change your password</h2>
                {loading && <p>One moment...</p>}
                {data && data.changePassword && (
                  <p>{data.changePassword.message}</p>
                )}
                <Error error={error} />
                <label htmlFor="password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <Loading loading={loading} />
                <button type="submit">Change</button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default ChangePassword;
