import { gql } from 'apollo-boost';

export const SUBMIT_VOTE_MUTATION = gql`
  mutation SUBMIT_VOTE_MUTATION($vote: VoteInput!) {
    submitVote(vote: $vote) {
      message
    }
  }
`;
