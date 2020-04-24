import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';

import { SUBMIT_VOTE_MUTATION } from './race.graphql';
import RigbookCard from '../../user/RigbookCard';

class Race extends Component {
  state = {
    vote: '',
    isDisabled: this.props.userVotedFor,
    submissionMessage: '',
  };

  castBallot = async (e, vote) => {
    e.preventDefault();

    if (!this.state.vote) {
      return;
    }

    // Record vote
    await vote();

    // Disable form
    this.setState({ isDisabled: true });
  };

  abstain = (vote) => {
    // Remove selection
    this.setState(
      {
        vote: '',
        isDisabled: true,
      },
      vote,
    );
  };

  removeBallot = (message = '') => {
    this.setState({ submissionMessage: message });
  };

  handleSelection = (e) => {
    this.setState({ vote: e.target.value });
  };

  render() {
    return (
      <section className="race">
        <h2>{this.props.title}</h2>
        {this.props.decription && <p>{this.props.decription}</p>}

        <p>
          Click a candidate to select. When you are ready, click "Vote" button
          to record your selection. You may only vote for one candidate per race
          and you cannot change your vote. If you want to formally decline to
          vote for a particular race, click the "Abstain" button.
        </p>

        <Mutation
          mutation={SUBMIT_VOTE_MUTATION}
          variables={{
            vote: {
              ballot: this.props.id,
              dateTime: Date.now(),
              candidate: this.state.vote,
            },
          }}
        >
          {(submitVote, { data }) => {
            return (
              <form
                onSubmit={(e) => this.castBallot(e, submitVote)}
                method="post"
              >
                {data && data.submitVote.message && (
                  <h3>{data.submitVote.message}</h3>
                )}
                <fieldset
                  className="fieldset"
                  disabled={this.state.isDisabled}
                  aria-busy={this.state.isDisabled}
                >
                  <ul className="ballot-list">
                    {this.props.candidates.map((candidate) => {
                      const id = `${this.props.pollId}_${candidate.id}`;

                      return (
                        <li key={candidate.id}>
                          <div className="candidate">
                            <input
                              type="radio"
                              id={id}
                              name={this.props.pollId}
                              checked={
                                this.state.vote === candidate.id ||
                                this.props.userVotedFor === candidate.id
                              }
                              value={candidate.id}
                              onChange={this.handleSelection}
                            />
                            <label htmlFor={id}>
                              <RigbookCard user={candidate} />
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="vote-button"
                    type="submit"
                    disabled={!this.state.vote}
                  >
                    Vote
                  </button>
                  <button
                    className="abstain-button"
                    type="button"
                    onClick={() => this.abstain(submitVote)}
                  >
                    Abstain
                  </button>
                </fieldset>
              </form>
            );
          }}
        </Mutation>
      </section>
    );
  }
}

export default Race;
