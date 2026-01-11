import React from "react";
import { Link, useParams } from "react-router-dom";
import { supportContacts } from "../data/mock";

const ContactDetail = () => {
  const { id } = useParams();
  const contact = supportContacts.find((item) => item.id === id);

  if (!contact) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">Contact not found.</p>
        <Link to="/" className="text-sm font-semibold text-brand">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const phoneLink = contact.phone ? contact.phone.replace(/\s/g, "") : undefined;

  return (
    <div className="space-y-6">
      <Link to="/contacts" className="text-sm font-semibold text-muted hover:text-ink">
        ← Back to contacts
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Support contact
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{contact.name}</h2>
        <p className="text-sm text-muted">{contact.role}</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="space-y-3 text-sm text-muted">
          {contact.phone ? <p>Phone: {contact.phone}</p> : null}
          {contact.email ? <p>Email: {contact.email}</p> : null}
          {contact.availability ? <p>Availability: {contact.availability}</p> : null}
          {contact.notes ? <p>{contact.notes}</p> : null}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {contact.phone ? (
            <a
              href={`tel:${phoneLink}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
            >
              Call
            </a>
          ) : null}
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line px-4 py-2 text-sm font-semibold text-muted"
            >
              Email
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/sponsor"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
        >
          Open Sponsor plan
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
