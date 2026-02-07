import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { apiFetch } from "../utils/api";
import { clearStoredUser, readStoredUser } from "../utils/auth";
import { deleteOwnUser, exportUserData } from "../utils/usersApi";

type Helpline = {
  name: string;
  phone: string;
  note: string;
};

const localStorageKeys = [
  "pf_messages",
  "pf_topics",
  "pf_topic_summaries",
  "pf_sponsor_contacts",
  "pf_sponsor_plan",
  "pf_credits",
  "pf_vouchers",
  "pf_saved_courses",
  "pf_area"
];

const fallbackHelplines: Helpline[] = [
  {
    name: "Emergency services",
    phone: "999",
    note: "If someone is in immediate danger."
  },
  {
    name: "NHS 111",
    phone: "111",
    note: "Urgent medical and mental health advice."
  },
  {
    name: "Samaritans",
    phone: "116 123",
    note: "24/7 emotional support in the UK."
  }
];

const PrivacySafety = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const user = readStoredUser();

  const [helplines, setHelplines] = useState<Helpline[]>(fallbackHelplines);
  const [exportBlob, setExportBlob] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadHelplines = async () => {
      try {
        const data = await apiFetch<Helpline[]>("/api/safeguarding/helplines");
        if (!isMounted) {
          return;
        }
        if (Array.isArray(data) && data.length > 0) {
          setHelplines(data);
        }
      } catch {
        if (!isMounted) {
          return;
        }
        setHelplines(fallbackHelplines);
      }
    };

    loadHelplines();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearLocalData = () => {
    localStorageKeys.forEach((key) => window.localStorage.removeItem(key));
    showToast("Local support data cleared from this device.");
  };

  const handleExport = async () => {
    if (!user?.id) {
      showToast("No registered profile found. Sign in again to register.");
      return;
    }

    setIsExporting(true);
    try {
      const data = await exportUserData(user.id);
      setExportBlob(JSON.stringify(data, null, 2));
      showToast("Data export ready.");
    } catch {
      showToast("Could not export data at this time.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!user?.id) {
      showToast("No registered profile found.");
      return;
    }

    if (deleteConfirm !== "DELETE") {
      showToast("Type DELETE to confirm data deletion.");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOwnUser(user.id);
      clearStoredUser();
      clearLocalData();
      showToast("Your profile data has been deleted.");
      navigate("/login", { replace: true });
    } catch {
      showToast("Could not delete data at this time.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Privacy &amp; Safety</h2>
        <p className="mt-1 text-sm text-muted">
          Manage data rights and access urgent safeguarding support.
        </p>
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">GDPR controls</h3>
        <p className="mt-2 text-sm text-muted">
          You can export your profile data or request deletion from this device.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Preparing export..." : "Export my data"}
          </Button>
          <Button type="button" variant="secondary" onClick={clearLocalData}>
            Clear local cache
          </Button>
        </div>

        {exportBlob ? (
          <textarea
            readOnly
            value={exportBlob}
            rows={10}
            className="mt-4 w-full rounded-xl border border-line bg-app px-3 py-2 text-xs"
          />
        ) : null}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">Delete my profile</h3>
        <p className="mt-2 text-sm text-muted">
          This removes your registered profile record from the service.
        </p>
        <label className="mt-3 flex flex-col gap-2 text-xs font-semibold text-muted">
          Type DELETE to confirm
          <input
            value={deleteConfirm}
            onChange={(event) => setDeleteConfirm(event.target.value)}
            className="rounded-xl border border-line px-3 py-2 text-sm"
            placeholder="DELETE"
          />
        </label>
        <div className="mt-4">
          <Button type="button" variant="amber" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete my data"}
          </Button>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">Urgent safeguarding contacts</h3>
        <div className="mt-4 space-y-3">
          {helplines.map((line) => (
            <div key={`${line.name}-${line.phone}`} className="rounded-xl border border-line p-3">
              <p className="text-sm font-semibold text-ink">{line.name}</p>
              <a className="text-sm font-semibold text-brand" href={`tel:${line.phone.replace(/\s/g, "")}`}>
                {line.phone}
              </a>
              <p className="text-xs text-muted">{line.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrivacySafety;
