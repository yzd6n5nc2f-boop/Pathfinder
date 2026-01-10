import React from "react";
import TopBar from "./TopBar";
import Tabs from "./Tabs";

type PageLayoutProps = {
  showTabs?: boolean;
  children: React.ReactNode;
};

const PageLayout = ({ showTabs = true, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-app px-3 py-6 text-ink sm:px-6">
      <div className="mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-device border border-line bg-surface shadow-phone">
        <TopBar />
        {showTabs ? <Tabs /> : null}
        <main className="flex w-full flex-1 flex-col gap-4 px-4 py-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
