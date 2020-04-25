import { gql } from 'apollo-boost';

export const RIGBOOK_QUERY = gql`
  query RIGBOOK_QUERY(
    $president: Office!
    $vicePresident: Office!
    $secretary: Office!
    $treasurer: Office!
  ) {
    president: getOfficer(office: $president) {
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
      title
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
    vicePresident: getOfficer(office: $vicePresident) {
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
      title
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
    secretary: getOfficer(office: $secretary) {
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
      title
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
    treasurer: getOfficer(office: $treasurer) {
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
      title
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
    membership: getMembers(accountTypes: [FULL, EMERITUS]) {
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
      title
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
