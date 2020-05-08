import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Styles from './tabs.module.scss';

const Tabs = ({ tabs }) => {
  const tabStyles = tabs.map((tab) =>
    cn({
      [Styles['active']]: tab.activeStyles,
    }),
  );

  return (
    <nav className={Styles['tabs']}>
      <ul>
        {tabs.map((tab, index) => (
          <li>
            <Link className={tabStyles[index]} to={tab.link}>
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
