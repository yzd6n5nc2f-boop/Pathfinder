import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { baseVoucher, firstMealOffers, firstMealPartners, Voucher } from "../data/firstMeal";
import { readStoredUser, writeStoredUser } from "../utils/auth";

type StoredVoucher = Voucher & {
  code: string;
  redeemedAt: string;
};

const vouchersKey = "pf_vouchers";

const generateVoucherCode = () => {
  const chunk = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PF-${chunk()}-${chunk()}`;
};

const readStoredVouchers = (): StoredVoucher[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(vouchersKey);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as StoredVoucher[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredVouchers = (vouchers: StoredVoucher[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(vouchersKey, JSON.stringify(vouchers));
};

const FirstMeal = () => {
  const { showToast } = useToast();
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [confirmingPartnerId, setConfirmingPartnerId] = useState<string | null>(null);
  const [redeemedVoucher, setRedeemedVoucher] = useState<StoredVoucher | null>(null);

  useEffect(() => {
    const stored = readStoredVouchers();
    if (stored.length > 0) {
      setRedeemedVoucher(stored[stored.length - 1]);
      setSelectedPartnerId(stored[stored.length - 1].partnerId);
    }
  }, []);

  const selectedPartner = useMemo(
    () => firstMealPartners.find((partner) => partner.id === selectedPartnerId) || null,
    [selectedPartnerId]
  );

  const sponsoredOffers = useMemo(
    () => firstMealOffers.filter((offer) => offer.sponsored),
    []
  );

  const handleRedeemClick = (partnerId: string) => {
    setConfirmingPartnerId(partnerId);
    setSelectedPartnerId(partnerId);
  };

  const handleConfirmRedeem = () => {
    if (!selectedPartnerId) {
      return;
    }
    const now = new Date().toISOString();
    const newVoucher: StoredVoucher = {
      ...baseVoucher,
      id: `voucher-${Date.now()}`,
      partnerId: selectedPartnerId,
      status: "redeemed",
      code: generateVoucherCode(),
      redeemedAt: now
    };

    const existing = readStoredVouchers();
    writeStoredVouchers([...existing, newVoucher]);
    setRedeemedVoucher(newVoucher);
    setConfirmingPartnerId(null);

    const user = readStoredUser();
    if (user) {
      writeStoredUser({
        ...user,
        lastVoucherId: newVoucher.id,
        lastVoucherRedeemedAt: now
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-muted">Your First Meal on Release</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Choose a partner and redeem your £5 meal voucher.
        </h2>
        <p className="mt-2 text-sm text-muted">
          Voucher includes a meal and drink. Alcohol excluded.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-full border border-line bg-app px-2 py-1">Example partners</span>
          <span className="rounded-full border border-line bg-app px-2 py-1">Subject to availability</span>
          <span className="rounded-full border border-line bg-app px-2 py-1">Supported by sponsors</span>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Sponsored Partner</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">Start again with a warm meal.</h3>
        <p className="mt-2 text-sm text-muted">Pret A Manger — Supporting fresh starts</p>
        <Button className="mt-4 w-full" variant="amber" onClick={() => showToast("Sponsor information saved.")}
        >
          Learn more
        </Button>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm uppercase tracking-wide text-muted">Your £5 Meal Voucher</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">Redeem in-store today</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>• Choose a partner below.</li>
          <li>• Redeem your voucher in-store.</li>
          <li>• Includes meal + drink.</li>
          <li>• No alcohol.</li>
        </ul>
        <Button
          className="mt-5 w-full"
          variant="secondary"
          onClick={() => showToast("Open the voucher guide for step-by-step support.")}
        >
          How it works
        </Button>
      </div>

      {confirmingPartnerId && selectedPartner ? (
        <div className="rounded-3xl border border-line bg-brand-50 p-6 text-sm text-brand shadow-card">
          <h3 className="text-lg font-semibold text-ink">Confirm voucher redemption</h3>
          <p className="mt-2 text-sm text-muted">
            You are redeeming your £5 voucher with <span className="font-semibold">{selectedPartner.name}</span>.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button className="w-full" variant="primary" onClick={handleConfirmRedeem}>
              Confirm & generate voucher
            </Button>
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => setConfirmingPartnerId(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {redeemedVoucher && selectedPartner ? (
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-muted">Voucher confirmation</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">Voucher ready to redeem</h3>
          <p className="mt-2 text-sm text-muted">
            Show this code at <span className="font-semibold">{selectedPartner.name}</span>.
          </p>
          <div className="mt-4 rounded-2xl border border-dashed border-line bg-app p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted">Voucher code</p>
            <p className="mt-2 text-lg font-semibold text-ink">{redeemedVoucher.code}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-line bg-white p-6 text-center text-xs text-muted">
            QR code placeholder
          </div>
          <p className="mt-3 text-xs text-muted">
            Redeemed on {new Date(redeemedVoucher.redeemedAt).toLocaleString("en-GB")}.
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">Partner marketplace</h3>
          <span className="text-xs text-muted">UK-centric, sponsor-ready</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {firstMealPartners.map((partner) => (
            <div key={partner.id} className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-app text-[10px] font-semibold text-muted">
                    {partner.logoUrl}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{partner.name}</p>
                    <p className="text-xs text-muted">{partner.description}</p>
                  </div>
                </div>
                {partner.sponsored ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                    Sponsored
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-xs text-muted">{partner.coverage}</p>
              <Button
                className="mt-4 w-full"
                variant={partner.sponsored ? "amber" : "secondary"}
                onClick={() => handleRedeemClick(partner.id)}
              >
                Redeem voucher
              </Button>
            </div>
          ))}
        </div>
      </div>

      {sponsoredOffers.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-ink">Sponsored Offers</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {sponsoredOffers.map((offer) => {
              const partner = firstMealPartners.find((item) => item.id === offer.partnerId);
              return (
                <div key={offer.id} className="rounded-2xl bg-white p-4 shadow-card">
                  <p className="text-xs uppercase tracking-wide text-accent">{partner?.name}</p>
                  <h4 className="mt-2 text-sm font-semibold text-ink">{offer.title}</h4>
                  <p className="mt-1 text-xs text-muted">{offer.description}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted">Paid promotional slots for partner offers.</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
        <p className="font-semibold text-ink">One meal can prevent a relapse or reoffence.</p>
        <p className="mt-2">
          This programme is supported by corporate and community partners.
        </p>
      </div>
    </div>
  );
};

export default FirstMeal;
