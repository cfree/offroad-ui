import { gql } from 'apollo-boost';

export const UPDATE_AVATAR = gql`
  mutation UPDATE_AVATAR($data: ImageUpdateInput!) {
    updateAvatar(data: $data) {
      message
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation DELETE_AVATAR($avatar: CloudinaryImageInput!) {
    deleteAvatar(avatar: $avatar) {
      message
    }
  }
`;
