import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import { resourceCards } from "../data/mock";

const ResourceDetail = () => {
  const { id } = useParams();
  const resource = resourceCards.find((item) => item.id === id);

  if (!resource) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Resource not found.</p>
        <Link to="/resources" className="text-sm font-semibold text-brand-700">
          Back to resources
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-ink">{resource.title}</h2>
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm text-slate-600">{resource.details}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p>Call local support line: 0800 000 000</p>
          <p>Call secondary support line: 0800 111 222</p>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button>Call</Button>
          <Button variant="secondary">Save</Button>
          <Link to="/resources" className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
