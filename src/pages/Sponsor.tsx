import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { PhoneIcon } from "../components/Icons";

const Sponsor = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([
    { name: "Alex Patel", phone: "07 7000 00001" },
    { name: "Priya Singh", phone: "07 7000 00002" }
  ]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone) {
      return;
    }
    setContacts((prev) => [...prev, { name, phone }]);
    setName("");
    setPhone("");
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="rounded-3xl bg-brand-50 p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Sponsor support</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you feel at risk: 1) Call your sponsor 2) Call your caseworker 3) Use urgent support.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => (
            <div key={contact.name} className="rounded-2xl bg-white p-4">
              <p className="text-sm font-semibold text-ink">{contact.name}</p>
              <p className="text-xs text-slate-500">{contact.phone}</p>
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

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-ink">Add or edit sponsor contact</h3>
        <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleAdd}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Sponsor name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Phone number
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
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
