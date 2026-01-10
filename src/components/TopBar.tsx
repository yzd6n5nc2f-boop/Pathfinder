import React from "react";
import { useNavigate } from "react-router-dom";
import { clearStoredUser, readStoredUser } from "../utils/auth";

type TopBarProps = {
  showUser?: boolean;
};

const TopBar = ({ showUser = true }: TopBarProps) => {
  const navigate = useNavigate();
  const storedUser = readStoredUser();
  const displayName = storedUser?.name.trim() ? storedUser.name.trim() : "Guest";
  const initial = displayName.slice(0, 1).toUpperCase() || "G";

  return (
    <header className="bg-brand-gradient text-white">
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
        {showUser ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">Welcome, {displayName}!</p>
              <button
                type="button"
                className="text-xs font-semibold text-white/80 transition hover:text-white"
                onClick={() => {
                  clearStoredUser();
                  navigate("/login", { replace: true });
                }}
              >
                Sign out
              </button>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-sm font-semibold">
              {initial}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default TopBar;
