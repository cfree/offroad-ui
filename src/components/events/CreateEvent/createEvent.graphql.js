import { gql } from 'apollo-boost';

export const SETUP_NEW_EVENT_QUERY = gql`
  query SETUP_NEW_EVENT_QUERY {
    myself {
      id
      username
      firstName
      lastName
    }
    runLeaders: getRunLeaders {
      id
      username
      firstName
      lastName
    }
    trails: getTrails {
      id
      name
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $type: String!
    $title: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime!
    $address: String
    $trailDifficulty: TrailDifficulty
    $trailNotes: String
    $rallyAddress: String
    $membersOnly: Boolean
    $maxAttendees: Int
    $maxRigs: Int
    $changeDisabled: Boolean
    $host: String!
    $trail: String
    $featuredImage: String #publicId
    $newFeaturedImage: CloudinaryImageInput
  ) {
    createEvent(
      event: {
        type: $type
        title: $title
        description: $description
        startTime: $startTime
        endTime: $endTime
        address: $address
        trailDifficulty: $trailDifficulty
        trailNotes: $trailNotes
        rallyAddress: $rallyAddress
        membersOnly: $membersOnly
        maxAttendees: $maxAttendees
        maxRigs: $maxRigs
        changeDisabled: $changeDisabled
        host: $host
        trail: $trail
        featuredImage: $featuredImage #publicId
        newFeaturedImage: $newFeaturedImage
      }
    ) {
      message
    }
  }
`;
