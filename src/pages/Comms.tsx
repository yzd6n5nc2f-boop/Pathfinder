import React from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { commsPartners } from "../data/mock";

const Comms = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-slate-500">Mobile credit</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">£5 data and call credit</h2>
        <p className="mt-2 text-sm text-slate-600">
          So you can call, text and email on release day.
        </p>
        <Button
          className="mt-5 w-full"
          onClick={() => showToast("Credit ready — show this at the desk.")}
        >
          Get £5 credit
        </Button>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-ink">Example partners</h3>
        <p className="mt-2 text-xs text-slate-500">
          Example partners only — no formal partnerships claimed.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {commsPartners.map((partner) => (
            <span
              key={partner}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comms;
