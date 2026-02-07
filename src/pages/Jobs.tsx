import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { areaOptions, jobOpportunities } from "../data/mock";
import { readStoredArea, writeStoredArea } from "../utils/area";
import { fetchManagedJobs, type ManagedJob } from "../utils/jobsApi";

type ListedJob = {
  id: string;
  title: string;
  area: string;
  type: string;
  summary: string;
  source: "mock" | "db";
};

const Jobs = () => {
  const { showToast } = useToast();
  const storedArea = readStoredArea();
  const [area, setArea] = useState(storedArea?.area ?? areaOptions[0]);
  const [managedJobs, setManagedJobs] = useState<ManagedJob[]>([]);

  useEffect(() => {
    writeStoredArea({ area });
  }, [area]);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        const fetched = await fetchManagedJobs();
        if (!isMounted) {
          return;
        }
        setManagedJobs(fetched);
      } catch {
        if (!isMounted) {
          return;
        }
        setManagedJobs([]);
        showToast("Backend job feed unavailable. Showing example jobs only.");
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const filteredJobs = useMemo(() => {
    const baseJobs: ListedJob[] = jobOpportunities.map((job) => ({
      id: job.id,
      title: job.title,
      area: job.area,
      type: job.type,
      summary: job.summary,
      source: "mock"
    }));

    const customJobs: ListedJob[] = managedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      area: job.area,
      type: job.type,
      summary: job.summary,
      source: "db"
    }));

    const allJobs = [...customJobs, ...baseJobs];

    if (!area) {
      return allJobs;
    }

    return allJobs.filter((job) => job.area === area);
  }, [area, managedJobs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Job opportunities</h2>
          <p className="text-sm text-muted">Live roles from admin + example roles.</p>
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
          <div key={`${job.source}-${job.id}`} className="relative isolate rounded-2xl bg-white p-4 shadow-card">
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="relative z-10">
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
            <p className="relative z-10 mt-2 text-xs text-muted">{job.summary}</p>
            <div className="relative z-10 mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button className="sm:w-auto" variant="secondary">
                Save job
              </Button>
              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
              >
                Apply steps
              </Link>
              {job.source === "db" ? (
                <span className="text-xs font-semibold text-brand">Admin added</span>
              ) : null}
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
            No roles listed for this area yet. Try another location.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Jobs;
