import React from 'react';

import Page from '../../components/layout/Page';

const DocumentsPage = () => {
  return (
    <Page>
      <h2>Documents</h2>

      <h3>Club Operations</h3>
      <ul>
        <li>
          <a href="/files/bylaws.pdf" download>
            Bylaws
          </a>
        </li>
        <li>
          <a href="/files/sors.pdf" download>
            Standard Operating Rules
          </a>
        </li>
      </ul>

      {/* <h3>Monthly Archives</h3>
<strong>2019</strong>
<dl>
  <dt>November</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>

  <dt>October (Moab)</dt>
  <dd>
    <a href="">Minutes</a>
  </dd>

  <dt>September</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>

  <dt>August</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>

  <dt>July</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>

  <dt>June</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>

  <dt>May</dt>
  <dd>
    <a href="">Minutes</a>
    <br />
    <a href="">Newsletter</a>
  </dd>
</dl> */}
    </Page>
  );
};

export default DocumentsPage;
