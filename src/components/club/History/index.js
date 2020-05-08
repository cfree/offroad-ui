import React from 'react';

import Styles from './history.module.scss';

const History = () => {
  return (
    <div>
      <h3>Details</h3>
      <p>
        Suspendisse eu ligula. Morbi ac felis. Sed augue ipsum, egestas nec,
        vestibulum et, malesuada adipiscing, dui. Phasellus gravida semper nisi.
      </p>
      <p>
        Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Fusce a quam.
        Phasellus nec sem in justo pellentesque facilisis. Praesent turpis.
      </p>
      <p>
        Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
        vitae euismod ligula urna in dolor. Curabitur vestibulum aliquam leo.
        Sed a libero. Nullam quis ante.
      </p>
      <h3>Charter Members</h3>
      <p>
        Though the club was officially incorporated in November of 1986, members
        who adopted and signed the Bylaws on or before June 1, 1986 are known as
        Charter members of the 4-Players of Colorado.
        <ul>
          <li>Jim Powell (Founder)</li>
          <li>Wilfred Clarkson</li>
          <li>David Faull</li>
          <li>Ashley Johnson</li>
          <li>Curtis Keele</li>
          <li>John Krasovich</li>
          <li>James Murphy</li>
          <li>Sam Nelson</li>
          <li>Rich Reynolds</li>
        </ul>
      </p>
      <p>
        If we are missing names, please inform the{' '}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <h3>Kenny's Cabin</h3>

      <p>
        <img
          className={Styles['img']}
          src="/img/kennys-cabin.jpg"
          width="400"
          alt="Kenny's Cabin map"
        />
        In the early days of the club, members went exploring for possible
        places to go four wheeling. There weren’t many maps or info available,
        unlike today with GPS coordinates etc. One Saturday, myself and a friend
        of mine, who was an expert on Colorado ghost towns, went searching for a
        settlement called 'LeMarti' up above Idaho Springs. We chanced upon an
        beautiful alpine meadow with a crumbling log building and a stream
        running down hill. Later, we would often stop there, have lunch and
        drive the shelf road and other trails in the area. During the 1980s,
        HIV/AIDS took many of our members. One was Kenn Tensenbel. On a
        beautiful summer day, we scattered his ashes in the meadow just below
        the cabin. Later, Mark Reddemann’s family and club members scattered his
        ashes there as well. Since then, Norm Bywater’s friend, Terry, and Willy
        C’s mom and stepdad have been placed there.{' '}
        <em>Provided by David ‘Daddy Dawg’ Faull</em>.
      </p>

      <p>
        The former members, friends, and family who rest on the hallowed ground
        known as Kenny’s Cabin:
        <table className={Styles['table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relation</th>
              <th>Story</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kenny Tenbensal</td>
              <td>Member</td>
              <td>d: 27 Mar 1991 (164 RMN)</td>
            </tr>
            <tr>
              <td>Mark Reddemann</td>
              <td>Member</td>
              <td>
                <em>Need Info</em>
              </td>
            </tr>
            <tr>
              <td>Terry</td>
              <td>Friend</td>
              <td>
                <em>Friend of Norm Bywaters</em>
              </td>
            </tr>
            <tr>
              <td>
                Jacquiline Page
                <a href="https://i1.wp.com/members.4-playersofcolorado.org/wp-content/uploads/2016/12/DSC00482.jpg">
                  <img
                    class="aligncenter size-thumbnail wp-image-3003"
                    src="https://i1.wp.com/members.4-playersofcolorado.org/wp-content/uploads/2016/12/DSC00482.jpg?resize=150%2C150"
                    alt="Jacqueline Page"
                    width="86"
                    height="86"
                  />
                </a>
              </td>
              <td>Family</td>
              <td>
                Willy Clark’s Mom
                <br />
                <blockquote>
                  <p>
                    Mom was from Worcester, Massachusetts. She was a great mom
                    and was always there for me. She was upset when the military
                    sent me to Vietnam but was excited when I got back. After my
                    dad passed away in December 1994, she was alone. She came
                    out to visit me and had a great time. Shortly thereafter,
                    she moved to Houston and remarried. My step dad Walter Page
                    died in 2000. My mom moved to Denver in September 2004. She
                    passed away in November 2007. Mom and Walter’s remains were
                    let free at Kenny’s Cabin in the summer of 2012.
                  </p>
                  <cite>Willy</cite>
                </blockquote>
              </td>
            </tr>
            <tr>
              <td>Walter Page</td>
              <td>Family</td>
              <td>Willy Clark’s Stepdad</td>
            </tr>
          </tbody>
        </table>
      </p>

      <h4>Location</h4>

      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=39.72940,+-105.63615&aq=&sll=38.997934,-105.550567
&sspn=5.361017,8.009033&vpsrc=6&ie=UTF8&ll=39.729164,-105.636289&spn=0.041455,0.062571&t=m&z=14"
        >
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=400x300&maptype=roadmap&markers=size:mid%7Ccolor:red%7C|39.729161,-105.636254&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
            alt="Map"
            className={Styles['map']}
          />
        </a>
        Forest Srv Rd, Arapaho National Forest, Idaho Springs, CO 80452
        <br />
        <br />
        GPS:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=39.729164,-105.636289&aq=&sll=38.997934,-105.550567
&sspn=5.361017,8.009033&vpsrc=6&ie=UTF8&ll=39.729164,-105.636289&spn=0.041455,0.062571&t=m&z=14"
        >
          39.729164, -105.636289
        </a>
      </p>

      <h4>Club Visits</h4>

      <ul>
        <li>13 Sept 2003</li>
        <li>1 Oct 2005</li>
        <li>26 Aug 2006</li>
        <li>June 2012</li>
        <li>25 July 2015</li>
        <li>15 Oct 2016</li>
        <li>14 Oct 2017</li>
        <li>7 Oct 2018</li>
        <li>13 Oct 2019</li>
        <li>July 2020</li>
      </ul>
    </div>
  );
};

export default History;
