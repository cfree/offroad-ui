import { gql } from 'apollo-boost';

export const RSVP_MUTATION = gql`
  mutation RSVP_MUTATION($rsvp: RSVPInput) {
    setRSVP(rsvp: $rsvp) {
      id
      message
    }
  }
`;
