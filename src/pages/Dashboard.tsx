import React from "react";
import { Link } from "react-router-dom";
import { MapIcon, PhoneIcon, ResourceIcon } from "../components/Icons";

const Dashboard = () => {
  const heroTiles = [
    {
      label: "Get Support",
      to: "/sponsor",
      icon: PhoneIcon,
      tone:
        "bg-brand-gradient text-white shadow-card hover:shadow-card focus-visible:ring-brand/40"
    },
    {
      label: "Find opportunities",
      to: "/jobs",
      icon: ResourceIcon,
      tone:
        "bg-amber-gradient text-white shadow-card hover:shadow-card focus-visible:ring-amber-300/60"
    },
    {
      label: "Learning & courses",
      to: "/courses",
      icon: ResourceIcon,
      tone:
        "bg-neutral-gradient text-white shadow-card hover:shadow-card focus-visible:ring-slate-200/60"
    },
    {
      label: "First meal voucher",
      to: "/first-meal",
      icon: ResourceIcon,
      tone:
        "border border-brand-100 bg-brand-50 text-brand shadow-card/40 hover:shadow-card focus-visible:ring-brand/30"
    },
    {
      label: "Phone credit",
      to: "/comms",
      icon: PhoneIcon,
      tone:
        "border border-amber-100 bg-amber-50 text-amber-900 shadow-card/40 hover:shadow-card focus-visible:ring-amber-200/70"
    },
    {
      label: "Travel support",
      to: "/travel",
      icon: MapIcon,
      tone:
        "border border-slate-200 bg-white text-ink shadow-card/40 hover:shadow-card focus-visible:ring-slate-200/70"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <section
        className="relative overflow-hidden rounded-[24px] px-5 py-6 text-center shadow-card"
        style={{
          backgroundImage:
            "radial-gradient(1200px 220px at 50% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0.65)), linear-gradient(180deg, rgba(35,74,115,0.18), rgba(35,74,115,0))"
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Your next steps
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-brand">
          Rebuild your future.
        </h1>
        <p className="mt-2 text-sm font-medium text-muted">
          Connect. Support. Thrive.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {heroTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.to}
                to={tile.to}
                className={`group flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-[18px] p-6 text-center text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 ${tile.tone}`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-current shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <span>{tile.label}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
