import { gql } from 'apollo-boost';

export const GLANCE_QUERY = gql`
  query GLANCE_QUERY {
    adminStats {
      activeFullMembers
      pastDueFullMembers
      delinquentFullMembers
      removedFullMembers
      resignedFullMembers
      inactiveFullMembers
      limitedGuestMembers
      lockedGuestMembers

      emeritusMembers
      deceasedMembers
      associateMembers
      guestMembers
      charterMembers

      fullMembersLastYear
      newFullMembersThisYear
      neededForQuorum
      neededToPassMotion
      neededToVoteOnNewMember
      newFullMembersAllowed
      fullMembersAllowed
    }
    activeMembersPerYear {
      year
      count
    }
    guestsWithLockedAccounts {
      firstName
      lastName
      username
      accountCreated
    }
    guestsAskedToJoin {
      firstName
      lastName
      username
    }
    guestsEligibleForMembership {
      firstName
      lastName
      username
    }
  }
`;
