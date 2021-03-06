import React, { Component } from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import { format } from 'date-fns';

import { dateFormatForm } from '../../../lib/constants';
import AddOffice from '../AddOffice';

const ELECTION_CANDIDATES_QUERY = gql`
  query ELECTION_CANDIDATES_QUERY($id: ID!) {
    getElection(id: $id) {
      id
      electionName
      startTime
      endTime
      races {
        id
        title
        desc
        candidates {
          id
          firstName
          lastName
          avatar {
            url
          }
        }
        results {
          candidate {
            id
          }
          count
        }
      }
    }
    electionCandidates(accountType: FULL, accountStatus: ACTIVE) {
      id
      firstName
      lastName
      avatar {
        url
      }
    }
  }
`;

const SUBMIT_ELECTION_MUTATION = gql`
  mutation SUBMIT_ELECTION_MUTATION($election: ElectionInput!) {
    editElection(election: $election) {
      id
    }
  }
`;

const REMOVE_ELECTION_MUTATION = gql`
  mutation REMOVE_ELECTION_MUTATION($id: ID!) {
    removeElection(id: $id) {
      successMessage
    }
  }
`;

class EditElection extends Component {
  state = {
    title: '',
    startTime: '',
    endTime: '',
    races: [],
  };

  updateOffices = (office) => {
    office.id = Date.now();
    this.setState({ races: [...this.state.races, office] });
  };

  updateState = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (submit) => {
    await submit();
    // @TODO Show update message
  };

  handleRemove = async (remove) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      await remove();
      // @TODO Show remove message
    }
  };

  render() {
    return (
      <Query
        query={ELECTION_CANDIDATES_QUERY}
        variables={{ id: this.props.election }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { electionCandidates, getElection } = data;

          return (
            <>
              <h3>Edit {getElection.electionName}</h3>

              <p>
                <label htmlFor="title">
                  Title&nbsp;
                  <input
                    name="title"
                    id="title"
                    value={this.state.title || getElection.electionName}
                    onChange={this.updateState}
                    type="text"
                  />
                </label>
              </p>

              <p>
                <label htmlFor="startDate">
                  Start Time&nbsp;
                  <input
                    name="startDate"
                    id="startDate"
                    defaultValue={
                      this.state.startTime ||
                      format(new Date(getElection.startTime), dateFormatForm)
                    }
                    min={format(Date.now(), dateFormatForm)}
                    onChange={this.updateState}
                    type="date"
                    id="startDate"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  />
                </label>

                <label htmlFor="endDate">
                  End Date&nbsp;
                  <input
                    name="endDate"
                    id="endDate"
                    defaultValue={
                      this.state.endTime ||
                      format(new Date(getElection.endTime), dateFormatForm)
                    }
                    onChange={this.updateState}
                    type="date"
                    id="endDate"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  />
                </label>
              </p>

              {this.state.races.map((race) => (
                <div key={race.id}>
                  {race.title}
                  {race.candidates.map((candidate) => (
                    <span key={candidate.id}>{candidate.firstName}</span>
                  ))}
                </div>
              ))}

              <AddOffice
                candidates={electionCandidates}
                handleSubmit={this.updateOffices}
              />

              <button>Cancel</button>

              <Mutation
                mutation={SUBMIT_ELECTION_MUTATION}
                variables={{
                  election: {
                    electionName: this.state.title,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    races: this.state.races.map((race) => {
                      delete race.id;
                      race.candidates = race.candidates.map((candidate) => ({
                        id: candidate.id,
                      }));
                      return race;
                    }),
                  },
                }}
              >
                {(editElection) => (
                  <button
                    type="button"
                    onClick={() => this.handleSubmit(editElection)}
                  >
                    Update Election
                  </button>
                )}
              </Mutation>

              <Mutation
                mutation={REMOVE_ELECTION_MUTATION}
                variables={{ id: getElection.id }}
              >
                {(removeElection) => (
                  <button
                    type="button"
                    onClick={() => this.handleRemove(removeElection)}
                  >
                    Delete Election
                  </button>
                )}
              </Mutation>
            </>
          );
        }}
      </Query>
    );
  }
}

export default EditElection;
