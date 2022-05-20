import { gql } from 'apollo-boost';

export const DELETE_EVENT_MUTATION = gql`
  mutation DELETE_EVENT_MUTATION($id: ID!) {
    deleteEvent(id: $id) {
      message
    }
  }
`;
