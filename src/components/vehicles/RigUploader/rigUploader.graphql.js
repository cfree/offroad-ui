import { gql } from 'apollo-boost';

export const UPDATE_RIG = gql`
  mutation UPDATE_RIG($data: ImageUpdateInput!) {
    updateRig(data: $data) {
      message
    }
  }
`;

export const DELETE_RIG = gql`
  mutation DELETE_RIG($rig: CloudinaryImageInput!) {
    deleteRig(rig: $rig) {
      message
    }
  }
`;
