import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';

import { CHANGE_EMAIL_MUTATION } from './changeEmail.graphql';
import Loading from '../../utility/Loading';
import { CURRENT_USER_QUERY } from '../../user/User/user.graphql';
// import Form from './styles/Form';
import Error from '../../utility/ErrorMessage';

import './changeEmail.module.scss';

class ChangeEmail extends Component {
  state = {
    email: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // console.log('token', token);
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ error: queryError, loading: queryLoading, data: queryData }) => {
          if (queryError) {
            return <p>{queryError}</p>;
          }

          if (queryLoading) {
            return <p>One moment...</p>;
          }

          return (
            <Mutation
              mutation={CHANGE_EMAIL_MUTATION}
              variables={{
                email: this.state.email,
              }}
              refetchQueries={['CURRENT_USER_QUERY']}
            >
              {(changeEmail, { error, loading, data }) => {
                return (
                  <form
                    className="form"
                    method="post"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await changeEmail();
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Change your email address</h2>
                      {loading && <p>One moment...</p>}
                      {data && data.changeEmail && (
                        <p>{data.changeEmail.message}</p>
                      )}
                      <Error error={error} />
                      <label htmlFor="email">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          defaultValue={queryData.myself.email}
                          required
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
        }}
      </Query>
    );
  }
}

export default ChangeEmail;
