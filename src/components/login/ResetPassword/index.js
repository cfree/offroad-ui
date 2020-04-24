import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// import { TOKEN_QUERY, RESET_MUTATION } from './resetPassword.graphql';
import { RESET_MUTATION } from './resetPassword.graphql';
import Error from '../../utility/ErrorMessage';

// import Styles from './resetPassword.module.scss';

class ResetPassword extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
  };
  static defaultProps = {
    token: '',
  };
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // console.log('token', token);
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.token,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={['CURRENT_USER_QUERY']}
      >
        {(resetPassword, { error, loading, called }) => (
          <form
            className="form"
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await resetPassword();
              this.props.history.push('/');
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your password</h2>
              {called && !error && <p>One moment...</p>}
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

              <button type="submit">Reset</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(ResetPassword);
