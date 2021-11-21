import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import {
  // isAdmin,
  // isSelf,
  isMember,
  isAtLeastGuestMember,
  isActive,
  isActiveOrPastDue,
  isAtLeastRunLeader,
  isAtLeastRunMaster,
  isAtLeastBoardMember,
  // isFullMember,
} from '../lib/utils';

import GuardedRoute from './GuardedRoute';
import AdminRoutes from './AdminRoutes';

import DashboardPage from '../pages/private/DashboardPage';
import DocumentsPage from '../pages/private/DocumentsPage';
import HistoryPage from '../pages/private/HistoryPage';
// import MessagePage from '../pages/private/MessagePage';
import RosterPage from '../pages/private/RosterPage';
// import VotePage from '../pages/private/VotePage';
// import ElectionsPage from '../pages/private/ElectionsPage';
import TrailsPage from '../pages/admin/TrailsPage';
import ProfilePage from '../pages/private/ProfilePage';
import EventsPage from '../pages/private/EventsPage';
import EventReportPage from '../pages/private/EventReportPage';
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
        statusCheck={isActiveOrPastDue}
      />
      <GuardedRoute
        path="/history"
        component={HistoryPage}
        typeCheck={isMember}
        statusCheck={isActiveOrPastDue}
      />
      {/* <GuardedRoute
        path="/message"
        component={MessagePage}
        typeCheck={isAtLeastGuestMember}
      /> */}
      <GuardedRoute
        path="/roster"
        component={RosterPage}
        typeCheck={isMember}
        statusCheck={isActiveOrPastDue}
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
        statusCheck={isActiveOrPastDue}
        selfCheck
      />
      <GuardedRoute
        exact
        path="/event/new"
        component={CreateEventPage}
        statusCheck={isActiveOrPastDue}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/events"
        component={EventsPage}
        statusCheck={isActiveOrPastDue}
      />
      <GuardedRoute
        path="/event/:id/edit"
        component={EditEventPage}
        statusCheck={isActiveOrPastDue}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/event/:id/report"
        component={EventReportPage}
        statusCheck={isActiveOrPastDue}
        roleCheck={isAtLeastRunLeader}
      />
      {/* <GuardedRoute
        path="/event/:id/feedback"
        component={EventFeedbackPage}
        statusCheck={isActiveOrPastDue}
      /> */}
      <GuardedRoute
        path="/event/:id"
        component={EventPage}
        statusCheck={isActiveOrPastDue}
      />
      <GuardedRoute path="/settings" component={SettingsPage} />
      <GuardedRoute
        path="/trails"
        component={TrailsPage}
        roleCheck={isAtLeastRunMaster}
        statusCheck={isActiveOrPastDue}
      />
      <GuardedRoute
        exact
        path="/trail/new"
        component={CreateTrailPage}
        statusCheck={isActiveOrPastDue}
        roleCheck={isAtLeastRunMaster}
      />
      <GuardedRoute
        path="/trail/:slug/edit"
        component={EditTrailPage}
        statusCheck={isActiveOrPastDue}
        roleCheck={isAtLeastRunMaster}
      />
      {/* <GuardedRoute
        path="/trail/:slug"
        component={TrailPage}
        statusCheck={isActiveOrPastDue}
      /> */}
      <GuardedRoute
        path="/admin"
        component={AdminRoutes}
        statusCheck={isActiveOrPastDue}
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
