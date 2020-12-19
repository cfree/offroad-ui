import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

// import Profile from '../Profile';

import ProfileHeader from '../ProfileHeader';
// import Roles from '../../components/admin/Roles';
// import Gate from '../../components/login/Gate';
// import { isAtLeastBoardMember, isActive } from '../../lib/utils';
import AdminProfileForm from '../../user/AdminProfileForm';
import AdminOverview from '../../user/AdminOverview';
import ProfileForm from '../../user/ProfileForm';
import MembershipLog from '../../user/MembershipLog';
import useUser from '../../../hooks/useUser';

import Styles from '../../user/ProfileIndex/profileIndex.module.scss';

const ProfileIndex = () => {
  const query = useParams();
  const { username } = query;
  const { path } = useRouteMatch();
  const { error, loading, data } = useUser();

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const { myself } = data;
  const isSelf = myself.username === username;

  return (
    <div className={Styles['profile']}>
      <ProfileHeader username={username} />

      <Switch>
        <Route path={`${path}/membership-log`}>
          <MembershipLog username={username} />
        </Route>
        <Route path={`${path}/edit`}>
          <>
            <AdminProfileForm username={username} />
            <ProfileForm member={username} isAdmin={true} />
          </>
        </Route>
        <Route exact path={path}>
          <AdminOverview username={username} />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
};

export default ProfileIndex;
