import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { ToastProvider } from "./components/Toast";
import Community from "./pages/Community";
import Comms from "./pages/Comms";
import Dashboard from "./pages/Dashboard";
import Employers from "./pages/Employers";
import FirstMeal from "./pages/FirstMeal";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import ResourceDetail from "./pages/ResourceDetail";
import Resources from "./pages/Resources";
import Sponsor from "./pages/Sponsor";
import Travel from "./pages/Travel";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout>
                <Dashboard />
              </PageLayout>
            }
          />
          <Route
            path="/messages"
            element={
              <PageLayout>
                <Messages />
              </PageLayout>
            }
          />
          <Route
            path="/community"
            element={
              <PageLayout>
                <Community />
              </PageLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <PageLayout>
                <Resources />
              </PageLayout>
            }
          />
          <Route
            path="/resources/:id"
            element={
              <PageLayout showTabs={false}>
                <ResourceDetail />
              </PageLayout>
            }
          />
          <Route
            path="/sponsor"
            element={
              <PageLayout showTabs={false}>
                <Sponsor />
              </PageLayout>
            }
          />
          <Route
            path="/first-meal"
            element={
              <PageLayout showTabs={false}>
                <FirstMeal />
              </PageLayout>
            }
          />
          <Route
            path="/comms"
            element={
              <PageLayout showTabs={false}>
                <Comms />
              </PageLayout>
            }
          />
          <Route
            path="/travel"
            element={
              <PageLayout showTabs={false}>
                <Travel />
              </PageLayout>
            }
          />
          <Route
            path="/jobs"
            element={
              <PageLayout showTabs={false}>
                <Jobs />
              </PageLayout>
            }
          />
          <Route
            path="/employers"
            element={
              <PageLayout showTabs={false}>
                <Employers />
              </PageLayout>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
