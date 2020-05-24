import { gql } from 'apollo-boost';

export const UPDATE_TRAIL = gql`
  mutation UPDATE_TRAIL($id: String!, $image: CloudinaryImageInput!) {
    updateTrailImage(id: $id, image: $image) {
      message
    }
  }
`;

// export const DELETE_RIG = gql`
//   mutation DELETE_RIG($rig: CloudinaryImageInput!) {
//     deleteRig(rig: $rig) {
//       message
//     }
//   }
// `;
