import React from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { mealPartners } from "../data/mock";

const FirstMeal = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-slate-500">First meal on release</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">£5 meal voucher (no alcohol)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Choose a trusted sponsor to redeem your first meal safely.
        </p>
        <div className="mt-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
          Sponsored banner slot
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mealPartners.map((partner) => (
          <div key={partner.name} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">{partner.name}</p>
              {partner.sponsored ? (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">
                  Sponsored
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-slate-500">Tap to view nearby locations.</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4 text-sm text-brand-700">
        Sponsored offer slot
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-ink">How it works</h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          <li>1. Choose a sponsor or partner on release day.</li>
          <li>2. Show your voucher at the counter.</li>
          <li>3. Enjoy a warm meal before you travel onward.</li>
        </ol>
        <Button
          className="mt-5 w-full"
          variant="amber"
          onClick={() => showToast("Voucher ready — show this at the counter.")}
        >
          Redeem voucher
        </Button>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
        Sponsored partner slot
      </div>
    </div>
  );
};

export default FirstMeal;
