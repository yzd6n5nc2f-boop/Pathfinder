import React from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { MapIcon } from "../components/Icons";
import { travelLinks } from "../data/mock";

const Travel = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-muted">Travel</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Plan travel to probation/appointments
        </h2>
        <p className="mt-2 text-sm text-muted">
          Ask about a 2-day Travelcard if you need time to settle in.
        </p>
        <Button
          className="mt-5 w-full"
          onClick={() => showToast("Travel support request logged.")}
        >
          Get travel support
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {travelLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
          >
            <span className="text-sm font-semibold text-ink">{link.name}</span>
            <MapIcon className="h-5 w-5 text-brand" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Travel;
