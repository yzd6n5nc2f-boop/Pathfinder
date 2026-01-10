import React from "react";
import { NavLink } from "react-router-dom";
import { CommunityIcon, HomeIcon, MessageIcon, ResourceIcon } from "./Icons";

const tabs = [
  { label: "Dashboard", to: "/", icon: HomeIcon },
  { label: "Messages", to: "/messages", icon: MessageIcon },
  { label: "Community", to: "/community", icon: CommunityIcon },
  { label: "Resources", to: "/resources", icon: ResourceIcon }
];

const Tabs = () => {
  return (
    <nav className="border-b border-line bg-white">
      <div className="grid grid-cols-4 px-2 py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.label}
              to={tab.to}
              className={({ isActive }) =>
                `relative flex h-16 flex-col items-center justify-center gap-1 px-2 text-[12px] font-semibold transition ${
                  isActive
                    ? "text-brandBlue-end"
                    : "text-muted hover:bg-app"
                } ${index < tabs.length - 1 ? "border-r border-line" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-lg transition " +
                      (isActive ? "bg-app" : "")
                    }
                  >
                    <Icon className="h-5 w-5 text-brandBlue-end" />
                  </span>
                  {tab.label}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Tabs;
