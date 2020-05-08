import React from 'react';

import Styles from './inMemoriam.module.scss';

const InMemoriam = () => {
  return (
    <div className={Styles['in-memoriam']}>
      <h3>In Memoriam</h3>

      <p>
        Here we honor the amazing lives of our members and alumni who have
        passed away.
      </p>

      <p>
        To notify us of a death of a member, please send an obituary to the{' '}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <table className={Styles['in-memoriam-list']}>
        <tbody>
          <tr>
            <td>Kenny Tenbensal</td>
            <td>
              d: 27 Mar 1991. His ashes were spread at the cabin, for whom it is
              named after
            </td>
          </tr>
          <tr>
            <td>Sam Nelson</td>
            <td>d: 6 Mar 2017. Emeritus Member, Charter Member</td>
          </tr>
          <tr>
            <td>Ashley Johnson</td>
            <td>d: 12 Sept 2019. Charter Member</td>
          </tr>
          <tr>
            <td>Rich Reynolds</td>
            <td>d: 25 Sept 2019. Charter Member</td>
          </tr>
          <tr>
            <td>Mark Reddemann</td>
            <td>Ashes at Kenny's Cabin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InMemoriam;
