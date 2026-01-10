import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { PhoneIcon } from "../components/Icons";
import type { SponsorPlan } from "../utils/sponsorPlan";
import { readStoredSponsorPlan, writeStoredSponsorPlan } from "../utils/sponsorPlan";

const initialContacts = [
  { name: "Alex Patel", phone: "07 7000 00001" },
  { name: "Priya Singh", phone: "07 7000 00002" }
];

const defaultPlan: SponsorPlan = {
  reachOut: "I will reach out before I act.",
  checkInFrequency: "daily",
  backupContact: initialContacts[0]?.name ?? "",
  boundary: "We keep messages brief and focused on next steps."
};

const quickCheckFlags = [
  "Hungry",
  "Angry",
  "Lonely",
  "Tired",
  "Cravings",
  "Arguments",
  "Nowhere to stay",
  "Feeling overwhelmed"
];

const frequencyLabels: Record<string, string> = {
  daily: "daily",
  "3x week": "3x week",
  weekly: "weekly"
};

const Sponsor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState(initialContacts);
  const [plan, setPlan] = useState<SponsorPlan>(() => readStoredSponsorPlan() ?? defaultPlan);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [quickCheckState, setQuickCheckState] = useState<Record<string, boolean>>({});

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone) {
      return;
    }
    setContacts((prev) => [...prev, { name, phone }]);
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (!plan.backupContact && contacts[0]?.name) {
      setPlan((prev) => ({ ...prev, backupContact: contacts[0].name }));
    }
  }, [contacts, plan.backupContact]);

  const checkedCount = Object.values(quickCheckState).filter(Boolean).length;

  const handlePlanSave = () => {
    writeStoredSponsorPlan(plan);
    setIsEditingPlan(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-brand-50 p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Sponsor support</h2>
        <p className="mt-2 text-sm text-muted">
          If you feel at risk: 1) Call your sponsor 2) Call your caseworker 3) Use urgent support.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => (
            <div key={contact.name} className="rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-ink">{contact.name}</p>
              <p className="text-xs text-muted">{contact.phone}</p>
              <div className="mt-3 flex flex-col gap-2">
                <Button>
                  <PhoneIcon className="h-4 w-4" />
                  Call now
                </Button>
                <Button variant="secondary">Message</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Sponsor plan</h3>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h4 className="text-base font-semibold text-ink">If you feel at risk</h4>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-ink">Step 1: Call sponsor</span>
                <Button>Call sponsor</Button>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-ink">Step 2: Message sponsor</span>
                <Button variant="secondary">Message sponsor</Button>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-ink">Step 3: Open urgent support</span>
                <Button variant="amber" onClick={() => navigate("/resources")}>
                  Open urgent support
                </Button>
              </li>
            </ol>
            <p className="mt-4 text-xs text-muted">
              If sponsor isn&apos;t available, use your backup contact.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-ink">Agreement (simple)</h4>
              <Button
                type="button"
                variant="ghost"
                className="px-2"
                onClick={isEditingPlan ? handlePlanSave : () => setIsEditingPlan(true)}
              >
                {isEditingPlan ? "Save" : "Edit"}
              </Button>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-ink">•</span>
                {isEditingPlan ? (
                  <input
                    value={plan.reachOut}
                    onChange={(event) => setPlan((prev) => ({ ...prev, reachOut: event.target.value }))}
                    className="flex-1 rounded-xl border border-line px-3 py-2 text-sm"
                  />
                ) : (
                  <span>{plan.reachOut}</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-ink">•</span>
                {isEditingPlan ? (
                  <label className="flex flex-1 flex-col gap-2">
                    <span>We agree check-ins:</span>
                    <select
                      value={plan.checkInFrequency}
                      onChange={(event) =>
                        setPlan((prev) => ({ ...prev, checkInFrequency: event.target.value }))
                      }
                      className="rounded-xl border border-line px-3 py-2 text-sm"
                    >
                      <option value="daily">daily</option>
                      <option value="3x week">3x week</option>
                      <option value="weekly">weekly</option>
                    </select>
                  </label>
                ) : (
                  <span>We agree check-ins: {frequencyLabels[plan.checkInFrequency] ?? "daily"}.</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-ink">•</span>
                {isEditingPlan ? (
                  <label className="flex flex-1 flex-col gap-2">
                    <span>If no reply, I contact:</span>
                    <select
                      value={plan.backupContact}
                      onChange={(event) => setPlan((prev) => ({ ...prev, backupContact: event.target.value }))}
                      className="rounded-xl border border-line px-3 py-2 text-sm"
                    >
                      {contacts.map((contact) => (
                        <option key={contact.name} value={contact.name}>
                          {contact.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <span>If no reply, I contact: {plan.backupContact || "my backup contact"}.</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-ink">•</span>
                {isEditingPlan ? (
                  <input
                    value={plan.boundary}
                    onChange={(event) => setPlan((prev) => ({ ...prev, boundary: event.target.value }))}
                    className="flex-1 rounded-xl border border-line px-3 py-2 text-sm"
                  />
                ) : (
                  <span>{plan.boundary}</span>
                )}
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h4 className="text-base font-semibold text-ink">Quick self-check</h4>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              {quickCheckFlags.map((flag) => (
                <label key={flag} className="flex items-center gap-3 rounded-2xl border border-line p-3">
                  <input
                    type="checkbox"
                    checked={Boolean(quickCheckState[flag])}
                    onChange={(event) =>
                      setQuickCheckState((prev) => ({ ...prev, [flag]: event.target.checked }))
                    }
                    className="h-4 w-4"
                  />
                  <span>{flag}</span>
                </label>
              ))}
            </div>
            {checkedCount >= 2 && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                Consider calling your sponsor now.
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-ink">Add or edit sponsor contact</h3>
        <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleAdd}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="Sponsor name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Phone number
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="07 7000 00000"
            />
          </label>
          <div className="sm:col-span-2">
            <Button type="submit">Save sponsor</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sponsor;
