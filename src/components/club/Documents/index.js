import React from 'react';

import Hr from '../../common/Hr';

import Styles from './documents.module.scss';

const Documents = () => {
  return (
    <div>
      <h2>Club Documents</h2>

      <h3>Operations</h3>

      <ul>
        <li>
          <a href="/docs/bylaws.pdf" download>
            Bylaws
          </a>{' '}
          (2019 rev)
        </li>
        <li>
          <a href="/docs/sors.pdf" download>
            Standard Operating Rules
          </a>{' '}
          (2020 rev)
        </li>
      </ul>

      <Hr />

      <h3>Monthly Archives</h3>

      <p>
        Our records are incomplete, so if you can provide some missing details,
        please contact the{' '}
        <a href="mailto:webmaster@4-playersofcolorado.org">webmaster</a>.
      </p>

      <div className={Styles['archive-content']}>
        <div className={Styles['archive-lists']}>
          <section>
            <h4 id="c-2019">2019</h4>

            <dl className={Styles['archive-list']}>
              <dt>November</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>

              <dt>October (Moab)</dt>
              <dd>
                <a href="/">Minutes</a>
              </dd>

              <dt>September</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>

              <dt>August</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>

              <dt>July</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>

              <dt>June</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>

              <dt>May</dt>
              <dd>
                <a href="/">Minutes</a>
                <br />
                <a href="/">Newsletter</a>
              </dd>
            </dl>
          </section>
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

export default Documents;
