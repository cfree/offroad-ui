import { gql } from 'apollo-boost';

export const UPDATE_EVENT_IMAGE = gql`
  mutation UPDATE_EVENT_IMAGE($data: ImageUpdateInput!) {
    updateAvatar(data: $data) {
      message
    }
  }
`;

export const DELETE_EVENT_IMAGE = gql`
  mutation DELETE_EVENT_IMAGE($avatar: CloudinaryImageInput!) {
    deleteAvatar(avatar: $avatar) {
      message
    }
  }
`;
