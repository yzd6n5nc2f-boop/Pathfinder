import React, { useState } from "react";
import Button from "../components/Button";
import { employers, employersFilters } from "../data/mock";

const Employers = () => {
  const [location, setLocation] = useState(employersFilters.locations[0]);
  const [training, setTraining] = useState(false);
  const [noExperience, setNoExperience] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Employers Directory</h2>
        <p className="mt-1 text-sm text-slate-500">
          UK-friendly employers. Examples only — no formal partnerships claimed.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Location
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              {employersFilters.locations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={training}
              onChange={(event) => setTraining(event.target.checked)}
              className="h-4 w-4"
            />
            Training provided
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={noExperience}
              onChange={(event) => setNoExperience(event.target.checked)}
              className="h-4 w-4"
            />
            No experience
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Filters are a prototype only (no live results yet).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {employers.map((employer) => (
          <div key={employer.name} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-semibold text-ink">{employer.name}</p>
            <p className="text-xs text-slate-500">{employer.focus}</p>
            <p className="mt-2 text-xs text-slate-400">{employer.location}</p>
            <Button className="mt-3" variant="secondary">
              View roles
            </Button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">
        More employers coming soon.
      </div>
    </div>
  );
};

export default Employers;
