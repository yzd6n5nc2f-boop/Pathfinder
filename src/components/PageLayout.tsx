import React from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Tabs from "./Tabs";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-app px-3 py-6 text-ink sm:px-6">
      <div className="mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-device border border-line bg-surface shadow-phone md:max-w-[760px] md:rounded-[24px] md:shadow-card lg:max-w-[1024px]">
        <TopBar />
        <Tabs />
        <main className="flex w-full flex-1 flex-col gap-4 px-4 py-5 md:px-6 md:py-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
