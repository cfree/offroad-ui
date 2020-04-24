import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = () => (
  <Helmet>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/img/icon.png" />
    <title>Offroad Club</title>
  </Helmet>
);

export default Meta;
