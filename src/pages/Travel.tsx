import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { areaOptions, travelLinks } from "../data/mock";
import { readStoredArea, writeStoredArea } from "../utils/area";

const quickLinkIds = ["google-maps", "national-rail", "tfl-journey", "swr"];

const Travel = () => {
  const { showToast } = useToast();
  const storedArea = readStoredArea();
  const [area, setArea] = useState(storedArea?.area ?? areaOptions[0]);
  const [postcode, setPostcode] = useState(storedArea?.postcode ?? "");
  const [showPrompt, setShowPrompt] = useState(!storedArea?.area);

  useEffect(() => {
    writeStoredArea({ area, postcode: postcode.trim() || undefined });
    if (showPrompt && area) {
      setShowPrompt(false);
    }
  }, [area, postcode, showPrompt]);

  const quickLinks = useMemo(() => {
    return travelLinks.filter((link) => quickLinkIds.includes(link.id));
  }, []);

  const localLinks = useMemo(() => {
    return travelLinks.filter(
      (link) => link.areas?.includes(area) && !quickLinkIds.includes(link.id)
    );
  }, [area]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Travel hub</h2>
        <p className="mt-1 text-sm text-muted">
          Choose your area for local travel links. Examples only.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Postcode (optional)
            <input
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              placeholder="e.g. M1"
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>
        </div>
        {showPrompt ? (
          <p className="mt-3 text-xs text-accent">
            Choose your area for local links.
          </p>
        ) : null}
      </div>

      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-ink">Plan your journey</h3>
          <p className="mt-1 text-sm text-muted">
            Use these links to get to appointments, housing, or work.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">Quick links</h3>
          <span className="text-xs font-semibold text-accent">Examples only</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={`/travel/${link.id}`}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{link.name}</p>
                <p className="text-xs text-muted">{link.description}</p>
              </div>
              <span className="text-sm font-semibold text-brand">View</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">
            Local transport (based on your area)
          </h3>
          <span className="text-xs font-semibold text-accent">Examples only</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {localLinks.map((link) => (
            <Link
              key={link.id}
              to={`/travel/${link.id}`}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{link.name}</p>
                <p className="text-xs text-muted">{link.description}</p>
              </div>
              <span className="text-sm font-semibold text-brand">View</span>
            </Link>
          ))}
        </div>
        {localLinks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
            No local operators listed for {area} yet. Ask your adviser for local
            travel information.
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-base font-semibold text-ink">Travel support</h3>
        <p className="mt-2 text-sm text-muted">
          Ask about travel support (for example, a short-term pass) if you need time
          to settle in.
        </p>
        <Button
          className="mt-4 w-full"
          variant="amber"
          onClick={() =>
            showToast("Travel support request logged. Speak to your case worker.")
          }
        >
          I need travel help
        </Button>
      </section>
    </div>
  );
};

export default Travel;
