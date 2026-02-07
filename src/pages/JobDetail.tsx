import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { employers, jobOpportunities } from "../data/mock";
import { fetchManagedJob, type ManagedJob } from "../utils/jobsApi";

type DisplayJob = {
  id: string;
  title: string;
  area: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  supportAvailable: string[];
  howToApply: string[];
  employerName?: string;
  employerId?: string;
};

const JobDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [managedJob, setManagedJob] = useState<ManagedJob | null>(null);
  const [loading, setLoading] = useState(false);

  const mockJob = useMemo(() => jobOpportunities.find((item) => item.id === id), [id]);

  useEffect(() => {
    let isMounted = true;

    const loadManagedJob = async () => {
      if (!id || mockJob) {
        return;
      }
      setLoading(true);
      try {
        const fetched = await fetchManagedJob(id);
        if (!isMounted) {
          return;
        }
        setManagedJob(fetched);
      } catch {
        if (!isMounted) {
          return;
        }
        setManagedJob(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadManagedJob();

    return () => {
      isMounted = false;
    };
  }, [id, mockJob]);

  if (loading) {
    return <p className="text-sm text-muted">Loading job details...</p>;
  }

  const employer = employers.find((item) => item.id === mockJob?.employerId);

  const displayJob: DisplayJob | null = mockJob
    ? {
        id: mockJob.id,
        title: mockJob.title,
        area: mockJob.area,
        type: mockJob.type,
        summary: mockJob.summary,
        responsibilities: mockJob.responsibilities,
        requirements: mockJob.requirements,
        supportAvailable: mockJob.supportAvailable,
        howToApply: mockJob.howToApply,
        employerName: employer?.name,
        employerId: employer?.id
      }
    : managedJob
      ? {
          id: managedJob.id,
          title: managedJob.title,
          area: managedJob.area,
          type: managedJob.type,
          summary: managedJob.summary,
          responsibilities: managedJob.responsibilities,
          requirements: managedJob.requirements,
          supportAvailable: managedJob.supportAvailable,
          howToApply: managedJob.howToApply,
          employerName: managedJob.employerName ?? undefined
        }
      : null;

  if (!displayJob) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">Job not found.</p>
        <Link to="/jobs" className="text-sm font-semibold text-brand">
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/jobs" className="text-sm font-semibold text-muted hover:text-ink">
        ← Back to jobs
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Job opportunity
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{displayJob.title}</h2>
        <p className="text-sm text-muted">
          {displayJob.area} · {displayJob.type}
        </p>
        {displayJob.employerName ? (
          <p className="mt-2 text-sm text-muted">Employer: {displayJob.employerName}</p>
        ) : null}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <p className="text-sm text-muted">{displayJob.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-semibold text-ink">What you&apos;ll do</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {displayJob.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-semibold text-ink">What you&apos;ll need</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {displayJob.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">Support available</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {displayJob.supportAvailable.map((item) => (
            <span
              key={item}
              className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">How to apply</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
          {displayJob.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="amber" onClick={() => showToast("Application step saved.")}>
          Save application step
        </Button>
        {displayJob.employerId ? (
          <Link
            to={`/employers/${displayJob.employerId}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line px-4 py-2 text-sm font-semibold text-muted"
          >
            View employer
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default JobDetail;
