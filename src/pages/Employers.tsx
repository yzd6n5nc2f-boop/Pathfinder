import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { areaOptions, employers, employersFilters, employmentSupport } from "../data/mock";
import { readStoredArea, writeStoredArea } from "../utils/area";

const Employers = () => {
  const storedArea = readStoredArea();
  const [area, setArea] = useState(storedArea?.area ?? areaOptions[0]);
  const [postcode, setPostcode] = useState(storedArea?.postcode ?? "");
  const [location, setLocation] = useState(employersFilters.locations[0]);
  const [training, setTraining] = useState(false);
  const [noExperience, setNoExperience] = useState(false);

  useEffect(() => {
    writeStoredArea({ area, postcode: postcode.trim() || undefined });
  }, [area, postcode]);

  const filteredEmployers = useMemo(() => {
    return employers.filter((employer) => {
      const matchesArea = !area || employer.areas.includes(area);
      const matchesLocation =
        location === "All locations" || employer.areas.includes(location);
      const matchesTraining = !training || employer.tags.includes("Training");
      const matchesNoExperience =
        !noExperience || employer.tags.includes("Entry-level");

      return matchesArea && matchesLocation && matchesTraining && matchesNoExperience;
    });
  }, [area, location, training, noExperience]);

  const filteredSupport = useMemo(() => {
    return employmentSupport.filter((support) =>
      area ? support.areas.includes(area) : true
    );
  }, [area]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Employers directory</h2>
        <p className="mt-1 text-sm text-muted">
          UK-friendly employers and support organisations. Examples only — no formal
          partnerships claimed.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Your area
            <select
              value={area}
              onChange={(event) => setArea(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            >
              {areaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Postcode (optional)
            <input
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              placeholder="e.g. SE1"
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Location
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            >
              {employersFilters.locations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-line px-3 py-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={training}
              onChange={(event) => setTraining(event.target.checked)}
              className="h-4 w-4"
            />
            Training provided
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-line px-3 py-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={noExperience}
              onChange={(event) => setNoExperience(event.target.checked)}
              className="h-4 w-4"
            />
            No experience needed
          </label>
        </div>
        <p className="mt-3 text-xs text-muted">
          Filters are examples only. Roles vary by location.
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">Employers (examples)</h3>
          <span className="text-xs font-semibold text-accent">Examples only</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredEmployers.map((employer) => (
            <div
              key={employer.id}
              className="flex h-full flex-col justify-between rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{employer.name}</p>
                    <p className="text-xs text-muted">{employer.sector}</p>
                  </div>
                  {postcode.trim() ? (
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-accent">
                      Near you
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-muted">{employer.description}</p>
                <p className="text-xs text-muted">Roles vary by location.</p>
                <div className="flex flex-wrap gap-2">
                  {employer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/employers/${employer.id}`}
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:opacity-95"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
        {filteredEmployers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
            No example employers listed for this area yet. Try a nearby location.
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">Getting work support</h3>
          <span className="text-xs font-semibold text-accent">Examples only</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredSupport.map((support) => (
            <div
              key={support.id}
              className="flex h-full flex-col justify-between rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-ink">{support.name}</p>
                <p className="text-xs text-muted">{support.sector}</p>
                <p className="text-xs text-muted">{support.description}</p>
                <div className="flex flex-wrap gap-2">
                  {support.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/employers/${support.id}`}
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-gradient px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:opacity-95"
              >
                View support
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">
        Need more options? Ask your adviser to add local employers to your plan.
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 text-xs text-muted">
        Examples only. This directory does not claim official partnerships.
      </div>
    </div>
  );
};

export default Employers;
