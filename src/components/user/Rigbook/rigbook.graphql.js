import { gql } from 'apollo-boost';

export const RIGBOOK_QUERY = gql`
  query RIGBOOK_QUERY {
    president: getOfficer(office: PRESIDENT) {
      username
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      rig {
        image {
          id
          url
        }
      }
      joined
      titles
      office
      accountType
      vehicle {
        id
        make
        model
        year
        trim
      }
    }
    vicePresident: getOfficer(office: VICE_PRESIDENT) {
      username
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      rig {
        image {
          id
          url
        }
      }
      joined
      titles
      office
      accountType
      vehicle {
        id
        make
        model
        year
        trim
      }
    }
    secretary: getOfficer(office: SECRETARY) {
      username
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      rig {
        image {
          id
          url
        }
      }
      joined
      titles
      office
      accountType
      vehicle {
        id
        make
        model
        year
        trim
      }
    }
    treasurer: getOfficer(office: TREASURER) {
      username
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      rig {
        image {
          id
          url
        }
      }
      joined
      titles
      office
      accountType
      vehicle {
        id
        make
        model
        year
        trim
      }
    }
    membership: getMembers(
      accountTypes: [FULL, ASSOCIATE, EMERITUS]
      accountStatuses: [ACTIVE, PAST_DUE]
    ) {
      username
      id
      email
      firstName
      lastName
      avatar {
        id
        url
      }
      rig {
        image {
          id
          url
        }
      }
      joined
      titles
      accountType
      vehicle {
        id
        make
        model
        year
        trim
      }
    }
  }
`;
