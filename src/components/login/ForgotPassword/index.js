import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';

import { REQUEST_RESET_MUTATION } from './forgotPassword.graphql';
import Loading from '../../utility/Loading';
import ErrorMessage from '../../utility/ErrorMessage';

import './forgotPassword.module.scss';

export default class ForgotPassword extends Component {
  state = { email: '' };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        refetchQueries={['CURRENT_USER_QUERY']}
      >
        {(requestReset, { data = {}, error, loading }) => {
          return (
            <form
              className="form"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await requestReset();
              }}
            >
              <h2>Forgot Password</h2>
              {data.requestReset && <p>{data.requestReset.message}</p>}
              <ErrorMessage error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset</button>
                <Loading loading={loading} />
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}
