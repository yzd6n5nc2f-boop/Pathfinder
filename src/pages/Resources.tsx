import React from "react";
import { Link } from "react-router-dom";
import { resourceCards } from "../data/mock";

const Resources = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-ink">Helpful Numbers & Resources</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {resourceCards.map((resource) => (
          <Link
            key={resource.id}
            to={`/resources/${resource.id}`}
            className="rounded-2xl bg-white p-4 shadow-card transition hover:-translate-y-0.5"
          >
            <p className="text-sm font-semibold text-ink">{resource.title}</p>
            <p className="text-sm text-slate-500">{resource.summary}</p>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">
        If you need urgent help, use your sponsor or case worker straight away.
      </div>
    </div>
  );
};

export default Resources;
