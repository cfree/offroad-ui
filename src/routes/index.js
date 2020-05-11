import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import {
  // isAdmin,
  // isSelf,
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
import TrailsPage from '../pages/admin/TrailsPage';
import ProfilePage from '../pages/private/ProfilePage';
import EventsPage from '../pages/private/EventsPage';
import EventPage from '../pages/private/EventPage';
// import TrailPage from '../pages/private/TrailPage';
import SettingsPage from '../pages/private/SettingsPage';
// Admin
// import EditProfilePage from '../pages/admin/EditProfilePage';
import EditEventPage from '../pages/admin/EditEventPage';
import EditTrailPage from '../pages/admin/EditTrailPage';
import CreateEventPage from '../pages/admin/CreateEventPage';
import CreateTrailPage from '../pages/admin/CreateTrailPage';
// Public
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import SignupPage from '../pages/public/SignupPage';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage';
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
      {/* <GuardedRoute exact path="/profile/edit" component={EditProfilePage} /> */}
      <GuardedRoute
        path="/profile/:username"
        component={ProfilePage}
        typeCheck={isMember}
        statusCheck={isActive}
        selfCheck
      />
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
      <GuardedRoute path="/settings" component={SettingsPage} />
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
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/unauthorized" component={UnauthorizedPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
