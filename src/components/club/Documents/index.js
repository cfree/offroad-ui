import React from 'react';

const Documents = () => {
  return (
    <div>
      <h2>Club Documents</h2>

      <ul>
        <li>
          <a href="#club-operations">Club Operations</a>
        </li>
        <li>
          <a href="#monthly-archives">Monthly Archives</a>
        </li>
      </ul>

      <hr />

      <h3 id="club-operations">Club Operations</h3>
      <ul>
        <li>
          <a href="/files/bylaws.pdf" download>
            Bylaws (2019 rev)
          </a>
        </li>
        <li>
          <a href="/files/sors.pdf" download>
            Standard Operating Rules (2020 rev)
          </a>
        </li>
      </ul>

      <h3 id="monthly-archives">Monthly Archives</h3>
      <strong>2019</strong>
      <dl>
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
    </div>
  );
};

export default Documents;
