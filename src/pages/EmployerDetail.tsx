import React from "react";
import { Link, useParams } from "react-router-dom";
import { employers, employmentSupport, jobOpportunities } from "../data/mock";

const EmployerDetail = () => {
  const { id } = useParams();
  const employer = employers.find((item) => item.id === id);
  const support = employmentSupport.find((item) => item.id === id);
  const detail = employer ?? support;
  const openRoles = employer
    ? jobOpportunities.filter((job) => job.employerId === employer.id)
    : [];

  if (!detail) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-ink">Employer details</h2>
        <p className="text-sm text-muted">We could not find that listing.</p>
        <Link
          to="/employers"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
        >
          Back to employers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Examples only
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{detail.name}</h2>
        <p className="mt-1 text-sm text-muted">{detail.sector}</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">About this employer</h3>
        <p className="mt-2 text-sm text-muted">{detail.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {detail.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          Areas: {detail.areas.join(", ")}
        </p>
        {detail.website ? (
          <a
            href={detail.website}
            className="mt-2 inline-flex text-xs font-semibold text-brand"
            target="_blank"
            rel="noreferrer"
          >
            Visit employer site
          </a>
        ) : null}
      </div>

      {openRoles.length > 0 ? (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="text-sm font-semibold text-ink">Open roles (examples)</h3>
          <ul className="mt-3 space-y-2">
            {openRoles.map((job) => (
              <li key={job.id}>
                <Link
                  to={`/jobs/${job.id}`}
                  className="flex items-center justify-between rounded-xl border border-line px-3 py-2 text-sm text-muted"
                >
                  <span className="font-semibold text-ink">{job.title}</span>
                  <span className="text-xs text-muted">
                    {job.area} · {job.type}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">How to apply</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          {detail.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      {detail.notes ? (
        <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">
          {detail.notes}
        </div>
      ) : null}

      <div className="rounded-2xl border border-line bg-white p-4 text-xs text-muted">
        Examples only. Ask your case worker or support contact for up-to-date guidance.
      </div>
    </div>
  );
};

export default EmployerDetail;
