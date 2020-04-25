import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import {
  // isAdmin,
  isMember,
  isAtLeastGuestMember,
  isActive,
  isAtLeastRunMaster,
  isAtLeastBoardMember,
  // isFullMember,
} from '../lib/utils';

import GuardedRoute from './GuardedRoute';
import AdminRoutes from './AdminRoutes';

import DashboardPage from '../pages/private/DashboardPage';
import DocumentsPage from '../pages/private/DocumentsPage';
import HistoryPage from '../pages/private/HistoryPage';
import MessagePage from '../pages/private/MessagePage';
import RosterPage from '../pages/private/RosterPage';
// import VotePage from '../pages/private/VotePage';
// import ElectionsPage from '../pages/private/ElectionsPage';
// import GaragePage from '../pages/private/GaragePage';
import TrailsPage from '../pages/admin/TrailsPage';
import ProfilePage from '../pages/private/ProfilePage';
import EventsPage from '../pages/private/EventsPage';
import EventPage from '../pages/private/EventPage';
// import TrailPage from '../pages/private/TrailPage';
import SettingsGaragePage from '../pages/private/SettingsGaragePage';
import SettingsProfilePage from '../pages/private/SettingsProfilePage';
import SettingsAccountPage from '../pages/private/SettingsAccountPage';
// Admin
import EditProfilePage from '../pages/admin/EditProfilePage';
import EditEventPage from '../pages/admin/EditEventPage';
import EditTrailPage from '../pages/admin/EditTrailPage';
import CreateEventPage from '../pages/admin/CreateEventPage';
import CreateTrailPage from '../pages/admin/CreateTrailPage';
// Public
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ResetPasswordPage from '../pages/public/ResetPasswordPage';
// Util
import UnauthorizedPage from '../pages/util/UnauthorizedPage';
import ErrorPage from '../pages/util/ErrorPage';

const Routes = () => {
  return (
    <Switch>
      <GuardedRoute exact path="/" component={DashboardPage} />
      <GuardedRoute
        path="/documents"
        component={DocumentsPage}
        typeCheck={isMember}
        statusCheck={isActive}
      />
      <GuardedRoute
        path="/history"
        component={HistoryPage}
        typeCheck={isMember}
        statusCheck={isActive}
      />
      <GuardedRoute
        path="/message"
        component={MessagePage}
        typeCheck={isAtLeastGuestMember}
      />
      <GuardedRoute
        path="/roster"
        component={RosterPage}
        typeCheck={isMember}
        statusCheck={isActive}
      />
      {/* <GuardedRoute
        path="/elections"
        component={ElectionsPage}
        typeCheck={isFullMember}
        statusCheck={isActive}
      /> */}
      {/* <GuardedRoute
        path="/vote"
        component={VotePage}
        typeCheck={isFullMember}
      /> */}
      <GuardedRoute
        path="/profile/:username/edit"
        component={EditProfilePage}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <GuardedRoute
        path="/profile/:username"
        component={ProfilePage}
        typeCheck={isMember}
        statusCheck={isActive}
      />
      <GuardedRoute path="/profile" component={ProfilePage} />
      <GuardedRoute
        exact
        path="/event/new"
        component={CreateEventPage}
        statusCheck={isActive}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/events"
        component={EventsPage}
        statusCheck={isActive}
      />
      <GuardedRoute
        path="/event/:id/edit"
        component={EditEventPage}
        statusCheck={isActive}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/event/:id"
        component={EventPage}
        statusCheck={isActive}
      />
      {/* <GuardedRoute
        path="/garage"
        component={GaragePage}
        statusCheck={isActive}
      /> */}
      <GuardedRoute path="/settings/profile" component={SettingsProfilePage} />
      <GuardedRoute path="/settings/garage" component={SettingsGaragePage} />
      <GuardedRoute path="/settings/account" component={SettingsAccountPage} />
      <GuardedRoute
        path="/trails"
        component={TrailsPage}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        exact
        path="/trail/new"
        component={CreateTrailPage}
        statusCheck={isActive}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/trail/:slug/edit"
        component={EditTrailPage}
        statusCheck={isActive}
        roleCheck={isAtLeastRunMaster}
      />
      {/* <GuardedRoute
        path="/trail/:slug"
        component={TrailPage}
        statusCheck={isActive}
      /> */}
      <GuardedRoute
        path="/admin"
        component={AdminRoutes}
        statusCheck={isActive}
        roleCheck={isAtLeastBoardMember}
      />
      <Redirect from="/registration" to="/register" />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/unauthorized" component={UnauthorizedPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
