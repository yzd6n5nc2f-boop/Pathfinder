import React from "react";
import { Link } from "react-router-dom";
import { supportContacts } from "../data/mock";

const Contacts = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-ink">Support contacts</h2>
        <p className="text-sm text-muted">
          Your go-to people for practical help and wellbeing support.
        </p>
      </div>
      <div className="space-y-3">
        {supportContacts.map((contact) => (
          <Link
            key={contact.id}
            to={`/contacts/${contact.id}`}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{contact.name}</p>
              <p className="text-xs text-muted">{contact.role}</p>
            </div>
            <span className="text-xs font-semibold text-accent">View</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
