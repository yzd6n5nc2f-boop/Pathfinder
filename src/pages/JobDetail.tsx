import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { employers, jobOpportunities } from "../data/mock";

const JobDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const job = jobOpportunities.find((item) => item.id === id);
  const employer = employers.find((item) => item.id === job?.employerId);

  if (!job) {
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
        <h2 className="mt-2 text-2xl font-semibold text-ink">{job.title}</h2>
        <p className="text-sm text-muted">
          {job.area} · {job.type}
        </p>
        {employer ? (
          <p className="mt-2 text-sm text-muted">Employer: {employer.name}</p>
        ) : null}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <p className="text-sm text-muted">{job.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-semibold text-ink">What you’ll do</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-semibold text-ink">What you’ll need</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">Support available</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.supportAvailable.map((item) => (
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
          {job.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="amber" onClick={() => showToast("Application saved (prototype).")}>
          Apply (prototype)
        </Button>
        {employer ? (
          <Link
            to={`/employers/${employer.id}`}
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
