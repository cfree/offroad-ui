import { useLocation } from 'react-router-dom';

import { convertQueryParams } from '../lib/utils';

export const useQueryParams = () => convertQueryParams(useLocation().search);
