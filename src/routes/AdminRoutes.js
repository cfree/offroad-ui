import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { isActive, isAtLeastBoardMember } from '../lib/utils';

// import GuardedRoute from './GuardedRoute';
import DashboardPage from '../pages/admin/DashboardPage';
// import EventPage from '../pages/admin/EventPage';
import PermissionsPage from '../pages/admin/PermissionsPage';
import RosterPage from '../pages/admin/RosterPage';
import MeetingPage from '../pages/admin/MeetingPage';
import TrailsPage from '../pages/admin/TrailsPage';
import InvitePage from '../pages/admin/InvitePage';

const AdminRoutes = () => {
  return (
    <Switch>
      {/* <Route
        path="/admin/events"
        component={EventsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      /> */}
      <Route
        path="/admin/permissions"
        component={PermissionsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path="/admin/roster"
        component={RosterPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path="/admin/meeting"
        component={MeetingPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path="/admin/trails"
        component={TrailsPage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route
        path="/admin/invite"
        component={InvitePage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Route path="/" exact component={DashboardPage} />
    </Switch>
  );
};

export default AdminRoutes;
