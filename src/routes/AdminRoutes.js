import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { isActive, isAtLeastBoardMember } from '../lib/utils';

// import GuardedRoute from './GuardedRoute';
import DashboardPage from '../pages/admin/DashboardPage';
// import EventPage from '../pages/admin/EventPage';
import PermissionsPage from '../pages/admin/PermissionsPage';
import RosterPage from '../pages/admin/RosterPage';
import MeetingPage from '../pages/admin/MeetingPage';
import MeetingsPage from '../pages/admin/MeetingsPage';
import TrailsPage from '../pages/admin/TrailsPage';
import UnlockPage from '../pages/admin/UnlockPage';
import InvitePage from '../pages/admin/InvitePage';
import ProfilePage from '../pages/admin/ProfilePage';
import ErrorPage from '../pages/util/ErrorPage';

const AdminRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/`} exact component={DashboardPage} />
      {/* <Route
        path={`${path}/admin/events"
        component={EventsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      /> */}
      <Route
        path={`${path}/permissions`}
        component={PermissionsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/roster`}
        component={RosterPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/meeting/new`}
        component={MeetingPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/meeting/:id/edit`}
        component={MeetingPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/meeting/:id`}
        component={MeetingPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/meetings`}
        component={MeetingsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/trails`}
        component={TrailsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/unlock`}
        component={UnlockPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/invite`}
        component={InvitePage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path={`${path}/profile/:username`}
        component={ProfilePage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default AdminRoutes;
