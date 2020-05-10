import React from 'react';
import { Query } from '@apollo/react-components';

import { RIGBOOK_QUERY } from './rigbook.graphql';
import RigbookCard from '../RigbookCard';

import Styles from './rigbook.module.scss';

const Rigbook = () => {
  return (
    <div>
      <Query query={RIGBOOK_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <>
              <h2>Roster</h2>
              <h3>Officers</h3>
              <ul className={Styles['rigbook']}>
                {data.president.id && (
                  <RigbookCard key={data.president.id} user={data.president} />
                )}
                {data.vicePresident.id && (
                  <RigbookCard
                    key={data.vicePresident.id}
                    user={data.vicePresident}
                  />
                )}
                {data.secretary.id && (
                  <RigbookCard key={data.secretary.id} user={data.secretary} />
                )}
                {data.treasurer.id && (
                  <RigbookCard key={data.treasurer.id} user={data.treasurer} />
                )}
              </ul>

              <h3>Membership</h3>
              <ul className={Styles['rigbook']}>
                {data.membership &&
                  data.membership.map((member) => (
                    <RigbookCard key={member.id} user={member} />
                  ))}
              </ul>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default Rigbook;
