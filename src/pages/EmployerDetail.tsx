import React from "react";
import { Link, useParams } from "react-router-dom";
import { employers, employmentSupport } from "../data/mock";

const EmployerDetail = () => {
  const { id } = useParams();
  const employer = employers.find((item) => item.id === id);
  const support = employmentSupport.find((item) => item.id === id);
  const detail = employer ?? support;

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
        <h3 className="text-sm font-semibold text-ink">What roles might be available</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          {detail.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">How to apply</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          {detail.howToApply.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">
        {detail.supportNote}
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 text-xs text-muted">
        Examples only. Ask your case worker or support contact for up-to-date guidance.
      </div>
    </div>
  );
};

export default EmployerDetail;
