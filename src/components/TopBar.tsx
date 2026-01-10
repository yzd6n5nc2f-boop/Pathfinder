import React from "react";

const TopBar = () => {
  return (
    <header className="bg-gradient-to-r from-brandBlue-start to-brandBlue-end text-white">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <rect x="4" y="5" width="12" height="14" rx="2" fill="white" />
              <path d="M17.5 12l-3.5-2.5v5l3.5-2.5Z" fill="#e58a1f" />
            </svg>
          </div>
          <div className="text-sm font-semibold tracking-wide">Pathway Forward</div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold">Welcome, John!</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-sm font-semibold">
            J
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
