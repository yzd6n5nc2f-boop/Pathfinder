import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { ToastProvider } from "./components/Toast";
import Community from "./pages/Community";
import Comms from "./pages/Comms";
import Dashboard from "./pages/Dashboard";
import Employers from "./pages/Employers";
import EmployerDetail from "./pages/EmployerDetail";
import FirstMeal from "./pages/FirstMeal";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import ResourceDetail from "./pages/ResourceDetail";
import Resources from "./pages/Resources";
import Sponsor from "./pages/Sponsor";
import Travel from "./pages/Travel";
import TravelDetail from "./pages/TravelDetail";
import { readStoredUser } from "./utils/auth";

type ProtectedPageProps = {
  children: React.ReactNode;
  showTabs?: boolean;
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const user = readStoredUser();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

const ProtectedPage = ({ children, showTabs }: ProtectedPageProps) => {
  return (
    <RequireAuth>
      <PageLayout showTabs={showTabs}>{children}</PageLayout>
    </RequireAuth>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedPage>
                <Messages />
              </ProtectedPage>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedPage>
                <Community />
              </ProtectedPage>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedPage>
                <Resources />
              </ProtectedPage>
            }
          />
          <Route
            path="/resources/:id"
            element={
              <ProtectedPage showTabs={false}>
                <ResourceDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/sponsor"
            element={
              <ProtectedPage showTabs={false}>
                <Sponsor />
              </ProtectedPage>
            }
          />
          <Route
            path="/first-meal"
            element={
              <ProtectedPage showTabs={false}>
                <FirstMeal />
              </ProtectedPage>
            }
          />
          <Route
            path="/comms"
            element={
              <ProtectedPage showTabs={false}>
                <Comms />
              </ProtectedPage>
            }
          />
          <Route
            path="/travel"
            element={
              <ProtectedPage showTabs={false}>
                <Travel />
              </ProtectedPage>
            }
          />
          <Route
            path="/travel/:id"
            element={
              <ProtectedPage showTabs={false}>
                <TravelDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedPage showTabs={false}>
                <Jobs />
              </ProtectedPage>
            }
          />
          <Route
            path="/employers"
            element={
              <ProtectedPage showTabs={false}>
                <Employers />
              </ProtectedPage>
            }
          />
          <Route
            path="/employers/:id"
            element={
              <ProtectedPage showTabs={false}>
                <EmployerDetail />
              </ProtectedPage>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
