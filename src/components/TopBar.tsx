import React from "react";

const TopBar = () => {
  return (
    <header className="bg-brand-600 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              <path
                d="M5 12c2.5-4 5.5-6 7-6s4.5 2 7 6c-2.5 4-5.5 6-7 6s-4.5-2-7-6Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Pathway Forward</p>
            <p className="text-lg font-semibold">Welcome, John!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right text-xs text-white/70 sm:block">
            <p>Next check-in</p>
            <p className="text-sm text-white">Wednesday, 10:00</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
            J
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
