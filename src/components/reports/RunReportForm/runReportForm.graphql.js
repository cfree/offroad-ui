import { gql } from 'apollo-boost';

export const RUN_REPORT_QUERY = gql`
  query RUN_REPORT_QUERY($eventId: ID!) {
    event: runReportInfo(eventId: $eventId) {
      id
      type
      title
      host {
        id
        firstName
        lastName
      }
      rsvps {
        id
        member {
          id
          firstName
          lastName
        }
      }
      trailDifficulty
      trail {
        id
        name
      }
    }
    # users: runReportUsers {
    #   id
    #   firstName
    #   lastName
    # }
  }
`;

export const SUBMIT_RUN_REPORT_MUTATION = gql`
  mutation SUBMIT_RUN_REPORT_MUTATION(
    $id: ID!
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
    $host: String!
    $trail: String
    $featuredImage: String #publicId
    $newFeaturedImage: CloudinaryImageInput
    $maxAttendees: Int
    $maxRigs: Int
  ) {
    updateEvent(
      id: $id
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
        host: $host
        trail: $trail
        featuredImage: $featuredImage #publicId
        newFeaturedImage: $newFeaturedImage
        maxAttendees: $maxAttendees
        maxRigs: $maxRigs
      }
    ) {
      message
    }
  }
`;
