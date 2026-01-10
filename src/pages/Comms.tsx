import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { commsPartners, commsSponsoredOffers } from "../data/mock";

type StoredCredit = {
  id: string;
  partnerId: string;
  value: number;
  currency: "GBP";
  status: "available" | "used";
  createdAt: string;
  code: string;
};

const creditsKey = "pf_credits";

const generateCreditCode = () => {
  const chunk = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PF-COMMS-${chunk}`;
};

const readStoredCredits = (): StoredCredit[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(creditsKey);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as StoredCredit[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredCredits = (credits: StoredCredit[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(creditsKey, JSON.stringify(credits));
};

const Comms = () => {
  const { showToast } = useToast();
  const [activeCredit, setActiveCredit] = useState<StoredCredit | null>(null);

  useEffect(() => {
    const storedCredits = readStoredCredits();
    if (storedCredits.length > 0) {
      setActiveCredit(storedCredits[storedCredits.length - 1]);
    }
  }, []);

  const selectedPartner = useMemo(
    () => commsPartners.find((partner) => partner.id === activeCredit?.partnerId) ?? null,
    [activeCredit]
  );

  const handleRedeem = (partnerId: string) => {
    const now = new Date().toISOString();
    const newCredit: StoredCredit = {
      id: `credit-${Date.now()}`,
      partnerId,
      value: 5,
      currency: "GBP",
      status: "available",
      createdAt: now,
      code: generateCreditCode()
    };

    const existing = readStoredCredits();
    writeStoredCredits([...existing, newCredit]);
    setActiveCredit(newCredit);
    showToast("£5 credit generated. Show your code to redeem.");
  };

  const handleMarkUsed = () => {
    if (!activeCredit) {
      return;
    }
    const updatedCredit = { ...activeCredit, status: "used" as const };
    const existing = readStoredCredits();
    const updatedCredits = existing.map((credit) =>
      credit.id === activeCredit.id ? updatedCredit : credit
    );
    writeStoredCredits(updatedCredits);
    setActiveCredit(updatedCredit);
    showToast("Credit marked as used.");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex items-center justify-between text-xs">
          <p className="font-semibold uppercase tracking-wide text-accent">Sponsored partner</p>
          <span className="text-[10px] text-muted">Example sponsor</span>
        </div>
        <h2 className="mt-3 text-xl font-semibold text-ink">Stay connected on day one.</h2>
        <p className="mt-2 text-sm text-muted">O2 — supporting fresh starts.</p>
        <Button
          className="mt-4 w-full"
          variant="amber"
          onClick={() => showToast("Sponsor details saved.")}
        >
          Learn more
        </Button>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-muted">Phone credit</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">£5 phone/data credit</h2>
        <p className="mt-2 text-sm text-muted">
          So you can call, text and email on release day.
        </p>
        <p className="mt-2 text-sm text-muted">
          Many people leave custody without an active plan or credit—this helps you make a call straight away.
        </p>
        <div className="mt-4 rounded-2xl bg-app p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">How it works</p>
          <ol className="mt-2 space-y-1 text-sm text-muted">
            <li>1) Choose a network partner</li>
            <li>2) Show voucher/code in-store or online (prototype)</li>
            <li>3) Get £5 credit</li>
          </ol>
        </div>
      </div>

      {activeCredit && selectedPartner ? (
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-muted">Credit confirmation</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">£5 credit ready</h3>
          <p className="mt-2 text-sm text-muted">
            Partner: <span className="font-semibold text-ink">{selectedPartner.name}</span>
          </p>
          <div className="mt-4 rounded-2xl border border-dashed border-line bg-app p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted">Code</p>
            <p className="mt-2 text-lg font-semibold text-ink">{activeCredit.code}</p>
          </div>
          <div className="mt-4 flex justify-center rounded-2xl border border-dashed border-line bg-white p-6">
            <svg
              viewBox="0 0 120 120"
              className="h-24 w-24"
              role="img"
              aria-label="QR placeholder"
            >
              <rect width="120" height="120" fill="#eef2f6" />
              <rect x="18" y="18" width="84" height="84" fill="#d9e2ec" />
            </svg>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              className="w-full"
              variant="amber"
              onClick={handleMarkUsed}
              disabled={activeCredit.status === "used"}
            >
              {activeCredit.status === "used" ? "Marked as used" : "Mark as used"}
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => setActiveCredit(null)}>
              Close
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Created {new Date(activeCredit.createdAt).toLocaleString("en-GB")}.
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">Partner network</h3>
            <p className="text-xs text-muted">Example partners only — no formal partnerships claimed.</p>
          </div>
          <span className="text-xs text-muted">Sponsor-ready marketplace</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {commsPartners.map((partner) => (
            <div key={partner.id} className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">{partner.name}</p>
                {partner.sponsored ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    Sponsored
                  </span>
                ) : (
                  <span className="rounded-full border border-line bg-app px-2 py-0.5 text-[10px] font-semibold text-muted">
                    Partner
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted">{partner.coverage}</p>
              <Button className="mt-4 w-full" onClick={() => handleRedeem(partner.id)}>
                Get £5 credit
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">Sponsored offers</h3>
          <span className="text-xs text-muted">Example offers</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {commsSponsoredOffers.map((offer) => (
            <div key={offer.id} className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-card">
              <div>
                <p className="text-sm font-semibold text-ink">{offer.title}</p>
                <p className="mt-2 text-xs text-muted">{offer.description}</p>
              </div>
              <Button
                className="mt-4 w-full"
                variant="secondary"
                onClick={() => showToast("Offer saved.")}
              >
                View offer
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-white p-5 text-sm text-muted shadow-card">
        Staying connected can help you reach support, housing, and work.
      </div>
    </div>
  );
};

export default Comms;
