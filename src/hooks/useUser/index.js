import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from './useUser.graphql';

const useUser = () => {
  return useQuery(CURRENT_USER_QUERY);
};

export default useUser;
