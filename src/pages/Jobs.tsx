import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { areaOptions, jobOpportunities } from "../data/mock";
import { readStoredArea, writeStoredArea } from "../utils/area";

const Jobs = () => {
  const storedArea = readStoredArea();
  const [area, setArea] = useState(storedArea?.area ?? areaOptions[0]);

  useEffect(() => {
    writeStoredArea({ area });
  }, [area]);

  const filteredJobs = useMemo(() => {
    if (!area) {
      return jobOpportunities;
    }
    return jobOpportunities.filter((job) => job.area === area);
  }, [area]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Job opportunities</h2>
          <p className="text-sm text-muted">Examples only. Ask your adviser for help.</p>
        </div>
        <Link to="/employers" className="text-sm font-semibold text-brand">
          Employers directory
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
          Area
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
      </div>

      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <div key={job.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">{job.title}</p>
                <p className="text-xs text-muted">
                  {job.area} · {job.type}
                </p>
              </div>
              <Link
                to={`/jobs/${job.id}`}
                className="text-xs font-semibold text-accent"
              >
                View details
              </Link>
            </div>
            <p className="mt-2 text-xs text-muted">{job.summary}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button className="sm:w-auto" variant="secondary">
                Save job
              </Button>
              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
              >
                Apply steps
              </Link>
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
            No example roles listed for this area yet. Try another location.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Jobs;
