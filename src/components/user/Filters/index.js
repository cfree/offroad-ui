import React from 'react';
import Select from 'react-select';

import {
  roles,
  accountStatuses,
  accountTypes,
  offices,
  titles,
} from '../../../lib/constants';
import { formatFilterSelect, formatFilterSelected } from '../../../lib/utils';

import './filters.module.scss';

const Filters = ({ activeFilters, onFilterUpdate }) => {
  return (
    <div className="filters">
      Roles
      <Select
        value={formatFilterSelected(activeFilters.role, roles)}
        placeholder="Select role"
        isMulti={true}
        options={formatFilterSelect(roles)}
        onChange={(e) => onFilterUpdate(e, 'role')}
      />
      Account Status
      <Select
        value={formatFilterSelected(
          activeFilters.accountStatus,
          accountStatuses,
        )}
        placeholder="Select account status"
        isMulti={true}
        options={formatFilterSelect(accountStatuses)}
        onChange={(e) => onFilterUpdate(e, 'accountStatus')}
      />
      Account Types
      <Select
        value={formatFilterSelected(activeFilters.accountType, accountTypes)}
        placeholder="Select account type"
        isMulti={true}
        options={formatFilterSelect(accountTypes)}
        onChange={(e) => onFilterUpdate(e, 'accountType')}
      />
      Offices
      <Select
        value={formatFilterSelected(activeFilters.office, offices)}
        placeholder="Select office"
        isMulti={true}
        options={formatFilterSelect(offices)}
        onChange={(e) => onFilterUpdate(e, 'office')}
      />
      Titles
      <Select
        value={formatFilterSelected(activeFilters.title, titles)}
        placeholder="Select title"
        isMulti={true}
        options={formatFilterSelect(titles)}
        onChange={(e) => onFilterUpdate(e, 'title')}
      />
      {/* <fieldset>
        <div>
          <label htmlFor="">
            <input checked type="radio" name="filterInclusion" value="AND" />{' '}
            AND - Search will find instances that match all filters
          </label>
        </div>
        <div>
          <label htmlFor="">
            <input type="radio" name="filterInclusion" value="OR" />{' '}
            OR - Search will find instances that match any filters
          </label>
        </div>
      </fieldset> */}
    </div>
  );
};

export default Filters;
