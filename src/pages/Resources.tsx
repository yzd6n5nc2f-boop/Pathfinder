import React from "react";
import { Link } from "react-router-dom";
import { resourceCards } from "../data/mock";

const Resources = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-ink">Helpful numbers and support</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {resourceCards.map((resource) => (
          <Link
            key={resource.id}
            to={`/resources/${resource.id}`}
            className="rounded-2xl bg-white p-4 shadow-card transition supports-[hover:hover]:hover:-translate-y-0.5"
          >
            <p className="text-sm font-semibold text-ink">{resource.title}</p>
            <p className="text-sm text-muted">{resource.summary}</p>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">
        If you need urgent help, contact your sponsor or caseworker straight away.
      </div>
    </div>
  );
};

export default Resources;
