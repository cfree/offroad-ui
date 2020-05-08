import React from 'react';

import Styles from './officers.module.scss';

const Officers = () => {
  return (
    <div>
      <h3>Officers</h3>

      <p>
        Over the years, many members have donated their time by holding officer
        positions on the Executive Committee.{' '}
      </p>

      <p>
        Our records are incomplete, so if you can provide some missing details,
        please contact the{' '}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <div className={Styles['officers-content']}>
        <div className={Styles['officers-lists']}>
          <h4 id="c-2020">2020</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tom Eskridge</td>
                <td>President</td>
              </tr>
              <tr>
                <td>Craig Freeman</td>
                <td>Vice President</td>
              </tr>
              <tr>
                <td>Jacob Adkisson</td>
                <td>Secretary</td>
              </tr>
              <tr>
                <td>Jason Heaton</td>
                <td>Treasurer</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2019">2019</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tom Eskridge</td>
                <td>President</td>
              </tr>
              <tr>
                <td>Craig Freeman</td>
                <td>Vice President</td>
              </tr>
              <tr>
                <td>Ryan Taylor</td>
                <td>Secretary</td>
              </tr>
              <tr>
                <td>Jason Heaton</td>
                <td>Treasurer</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2018">2018</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gary Lameris</td>
                <td>
                  President <small>(Jan-Sept)</small>
                </td>
              </tr>
              <tr>
                <td>Tom Eskridge</td>
                <td>
                  President <small>(Sept-Dec)</small>
                  <br />
                  Vice President <small>(Jan-Sept)</small>
                </td>
              </tr>
              <tr>
                <td>Ryan Taylor</td>
                <td>Secretary</td>
              </tr>
              <tr>
                <td>Greg Foskey</td>
                <td>Treasurer</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2017">2017</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gary Lameris</td>
                <td>President</td>
              </tr>
              <tr>
                <td>Tom Eskridge</td>
                <td>Vice President</td>
              </tr>
              <tr>
                <td>Ryan Taylor</td>
                <td>
                  Secretary <small>(Sept-Dec)</small>
                </td>
              </tr>
              <tr>
                <td>Todd Jones</td>
                <td>
                  Secretary <small>(Jan-Sept)</small>
                </td>
              </tr>
              <tr>
                <td>Greg Foskey</td>
                <td>Treasurer</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2016">2016</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gary Lameris</td>
                <td>President</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2015">2015</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gary Lameris</td>
                <td>President</td>
              </tr>
            </tbody>
          </table>

          <h4 id="c-2014">2014</h4>

          <table className={Styles['officers-list']}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <aside className={Styles['aside']}>
          <div className={Styles['aside-content']}>
            <ul className={Styles['aside-list']}>
              <li>
                <a href="#c-2020">2020</a>
              </li>
              <li>
                <a href="#c-2019">2019</a>
              </li>
              <li>
                <a href="#c-2018">2018</a>
              </li>
              <li>
                <a href="#c-2017">2017</a>
              </li>
              <li>
                <a href="#c-2016">2016</a>
              </li>
              <li>
                <a href="#c-2015">2015</a>
              </li>
              <li>
                <a href="#c-2014">2014</a>
              </li>
              <li>2015</li>
              <li>2014</li>
              <li>2013</li>
              <li>2012</li>
              <li>2011</li>
              <li>2010</li>
              <li>2009</li>
              <li>2008</li>
              <li>2007</li>
              <li>2006</li>
              <li>2005</li>
              <li>2004</li>
              <li>2003</li>
              <li>2002</li>
              <li>2001</li>
              <li>2000</li>
              <li>1999</li>
              <li>1998</li>
              <li>1997</li>
              <li>1996</li>
              <li>1995</li>
              <li>1994</li>
              <li>1993</li>
              <li>1992</li>
              <li>1991</li>
              <li>1990</li>
              <li>1989</li>
              <li>1988</li>
              <li>1987</li>
              <li>1986</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Officers;
