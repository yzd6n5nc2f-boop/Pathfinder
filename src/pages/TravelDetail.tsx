import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { travelLinks } from "../data/mock";

const TravelDetail = () => {
  const { id } = useParams();
  const link = travelLinks.find((item) => item.id === id);

  if (!link) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-ink">Travel link</h2>
        <p className="text-sm text-muted">We could not find that link.</p>
        <Link
          to="/travel"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
        >
          Back to travel
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
        <h2 className="mt-2 text-2xl font-semibold text-ink">{link.name}</h2>
        <p className="mt-1 text-sm text-muted">{link.description}</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">What this link is for</h3>
        <p className="mt-2 text-sm text-muted">
          Use this link to plan routes and check local transport updates. Always
          confirm times on the provider website.
        </p>
        <Button
          className="mt-4 w-full"
          onClick={() => window.open(link.href, "_blank", "noreferrer")}
        >
          Open in browser
        </Button>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 text-xs text-muted">
        Examples only. These links are provided for convenience.
      </div>
    </div>
  );
};

export default TravelDetail;
