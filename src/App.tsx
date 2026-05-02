import React, { type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import GreatHallLayout from './layouts/GreatHallLayout';
import Admin from './pages/Admin';
import Billing from './pages/Billing';
import Bookmarks from './pages/Bookmarks';
import Category from './pages/Category';
import Collections from './pages/Collections';
import DirectMessages from './pages/DirectMessages';
import Directory from './pages/Directory';
import GreatHallHome from './pages/GreatHallHome';
import GreatHallRooms from './pages/GreatHallRooms';
import GroupBuysLayout from './layouts/GroupBuysLayout';
import CreateGroupBuy from './pages/group-buys/CreateGroupBuy';
import GroupBuysHome from './pages/group-buys/GroupBuysHome';
import GroupBuyDetail from './pages/group-buys/GroupBuyDetail';
import GroupBuysRules from './pages/group-buys/GroupBuysRules';
import GroupBuysAdmin from './pages/group-buys/GroupBuysAdmin';
import Login from './pages/Login';
import MemberProfile from './pages/MemberProfile';
import MembersDirectory from './pages/MembersDirectory';
import Membership from './pages/Membership';
import Onboarding from './pages/Onboarding';
import RequestDetail from './pages/RequestDetail';
import RequestsHub from './pages/RequestsHub';
import ResourceDetail from './pages/ResourceDetail';
import RoomView from './pages/RoomView';
import Search from './pages/Search';
import Settings from './pages/Settings';
import SiteDetail from './pages/SiteDetail';
import SitesCategory from './pages/SitesCategory';
import SitesDirectory from './pages/SitesDirectory';
import Submit from './pages/Submit';
import SubmitSite from './pages/SubmitSite';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
    <h2>{title}</h2>
    <p style={{ marginLeft: 10 }}>This page is under construction.</p>
  </div>
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#050505' }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const RootRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#050505' }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to="/app" replace />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRouter />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/onboarding"
              element={(
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              )}
            />

            <Route
              path="/app"
              element={(
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              )}
            >
              <Route index element={<Directory />} />
              <Route path="categories/:slug" element={<Category />} />
              <Route path="resource/:id" element={<ResourceDetail />} />

              <Route path="sites" element={<SitesDirectory />} />
              <Route path="sites/categories/:slug" element={<SitesCategory />} />
              <Route path="sites/:id" element={<SiteDetail />} />
              <Route path="sites/submit" element={<SubmitSite />} />

              <Route path="search" element={<Search />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="collections" element={<Collections />} />
              <Route path="submit" element={<Submit />} />

              <Route path="great-hall" element={<GreatHallLayout />}>
                <Route index element={<GreatHallHome />} />
                <Route path="rooms" element={<GreatHallRooms />} />
                <Route path="rooms/:roomId" element={<RoomView />} />
                <Route path="requests" element={<RequestsHub />} />
                <Route path="requests/:requestId" element={<RequestDetail />} />
                <Route path="dm" element={<DirectMessages />} />
                <Route path="dm/:conversationId" element={<DirectMessages />} />
                <Route path="members" element={<MembersDirectory />} />
                <Route path="members/:memberId" element={<MemberProfile />} />
                <Route path="saved" element={<PlaceholderPage title="Saved" />} />
                <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
              </Route>

              <Route path="group-buys" element={<GroupBuysLayout />}>
                <Route index element={<GroupBuysHome />} />
                <Route path="requests" element={<PlaceholderPage title="Requests & Voting" />} />
                <Route path="voting" element={<PlaceholderPage title="Voting" />} />
                <Route path="scheduled" element={<PlaceholderPage title="Scheduled" />} />
                <Route path="active" element={<PlaceholderPage title="Active" />} />
                <Route path="completed" element={<PlaceholderPage title="Completed" />} />
                <Route path="mine" element={<PlaceholderPage title="My Group-Buys" />} />
                <Route path="payments" element={<PlaceholderPage title="Payments" />} />
                <Route path="rules" element={<GroupBuysRules />} />
                <Route path="new" element={<CreateGroupBuy />} />
                <Route path="admin" element={<GroupBuysAdmin />} />
                <Route path=":id" element={<GroupBuyDetail />} />
              </Route>

              <Route path="membership" element={<Membership />} />
              <Route path="billing" element={<Billing />} />
              <Route path="admin" element={<Admin />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
