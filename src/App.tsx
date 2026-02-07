import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { ToastProvider } from "./components/Toast";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Comms from "./pages/Comms";
import ContactDetail from "./pages/ContactDetail";
import Contacts from "./pages/Contacts";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Employers from "./pages/Employers";
import EmployerDetail from "./pages/EmployerDetail";
import FirstMeal from "./pages/FirstMeal";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import PrivacySafety from "./pages/PrivacySafety";
import ResourceDetail from "./pages/ResourceDetail";
import Resources from "./pages/Resources";
import Sponsor from "./pages/Sponsor";
import TopicDetail from "./pages/TopicDetail";
import Travel from "./pages/Travel";
import TravelDetail from "./pages/TravelDetail";
import { readStoredUser } from "./utils/auth";

type ProtectedPageProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const user = readStoredUser();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  return (
    <RequireAuth>
      <PageLayout>{children}</PageLayout>
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
            path="/privacy-safety"
            element={
              <ProtectedPage>
                <PrivacySafety />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
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
            path="/community/:id"
            element={
              <ProtectedPage>
                <TopicDetail />
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
              <ProtectedPage>
                <ResourceDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/sponsor"
            element={
              <ProtectedPage>
                <Sponsor />
              </ProtectedPage>
            }
          />
          <Route
            path="/first-meal"
            element={
              <ProtectedPage>
                <FirstMeal />
              </ProtectedPage>
            }
          />
          <Route
            path="/comms"
            element={
              <ProtectedPage>
                <Comms />
              </ProtectedPage>
            }
          />
          <Route
            path="/travel"
            element={
              <ProtectedPage>
                <Travel />
              </ProtectedPage>
            }
          />
          <Route
            path="/travel/:id"
            element={
              <ProtectedPage>
                <TravelDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedPage>
                <Contacts />
              </ProtectedPage>
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <ProtectedPage>
                <ContactDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedPage>
                <Jobs />
              </ProtectedPage>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedPage>
                <JobDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedPage>
                <Courses />
              </ProtectedPage>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedPage>
                <CourseDetail />
              </ProtectedPage>
            }
          />
          <Route
            path="/employers"
            element={
              <ProtectedPage>
                <Employers />
              </ProtectedPage>
            }
          />
          <Route
            path="/employers/:id"
            element={
              <ProtectedPage>
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
