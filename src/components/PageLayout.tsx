import React from "react";
import TopBar from "./TopBar";
import Tabs from "./Tabs";

type PageLayoutProps = {
  showTabs?: boolean;
  children: React.ReactNode;
};

const PageLayout = ({ showTabs = true, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-calm">
      <TopBar />
      {showTabs ? <Tabs /> : null}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
