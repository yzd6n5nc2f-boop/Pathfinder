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
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-4 gap-2 px-4 py-3 sm:px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.label}
              to={tab.to}
              className={({ isActive }) =>
                `flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-medium transition ${
                  isActive ? "bg-brand-50 text-brand-600" : "text-slate-500 hover:bg-slate-50"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Tabs;
