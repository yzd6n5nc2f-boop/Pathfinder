import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Tabs from "./Tabs";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/";

  useEffect(() => {
    if (!isDashboard) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDashboard]);

  return (
    <div
      className={
        isDashboard
          ? "h-[100dvh] overflow-hidden bg-brand px-0 py-0"
          : "min-h-screen bg-app px-3 py-6 text-ink sm:px-6"
      }
    >
      <div
        className={`mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-device border border-line bg-surface shadow-phone md:max-w-[760px] md:rounded-[24px] md:shadow-card lg:max-w-[1024px] ${
          isDashboard ? "h-[100dvh]" : ""
        }`}
      >
        <TopBar />
        <Tabs />
        <main
          className={
            isDashboard
              ? "flex w-full flex-1 flex-col overflow-hidden px-4 py-3"
              : "flex w-full flex-1 flex-col gap-4 px-4 py-5 md:px-6 md:py-6 lg:px-8"
          }
        >
          {children}
        </main>
        {!isDashboard && <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
