import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { areaOptions } from "../data/mock";
import { createManagedJob, fetchManagedJobs, type ManagedJob } from "../utils/jobsApi";
import {
  createUserAsAdmin,
  fetchRegisteredUsers,
  type RegisteredUser
} from "../utils/usersApi";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const adminKeyStorageKey = "pf_admin_api_key";

const readStoredAdminKey = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return window.sessionStorage.getItem(adminKeyStorageKey) ?? "";
};

const writeStoredAdminKey = (value: string) => {
  if (typeof window === "undefined") {
    return;
  }
  if (!value) {
    window.sessionStorage.removeItem(adminKeyStorageKey);
    return;
  }
  window.sessionStorage.setItem(adminKeyStorageKey, value);
};

const Admin = () => {
  const { showToast } = useToast();

  const [adminKey, setAdminKey] = useState(() => readStoredAdminKey());
  const [keyInput, setKeyInput] = useState(() => readStoredAdminKey());

  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [jobs, setJobs] = useState<ManagedJob[]>([]);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userArea, setUserArea] = useState(areaOptions[0]);
  const [userConsentAccepted, setUserConsentAccepted] = useState(true);

  const [jobTitle, setJobTitle] = useState("");
  const [jobArea, setJobArea] = useState(areaOptions[0]);
  const [jobType, setJobType] = useState<"Full time" | "Part time" | "Apprenticeship">("Full time");
  const [jobEmployerName, setJobEmployerName] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobSupport, setJobSupport] = useState("");
  const [jobHowToApply, setJobHowToApply] = useState("");

  const hasAdminAccess = useMemo(() => adminKey.trim().length > 0, [adminKey]);

  const loadAdminData = async (key: string) => {
    setLoading(true);
    try {
      const [usersResult, jobsResult] = await Promise.all([
        fetchRegisteredUsers(key),
        fetchManagedJobs()
      ]);
      setUsers(usersResult);
      setJobs(jobsResult);
    } catch {
      setUsers([]);
      setJobs([]);
      showToast("Admin key invalid or backend unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasAdminAccess) {
      return;
    }
    loadAdminData(adminKey);
  }, [adminKey, hasAdminAccess]);

  const handleConnect = async (event: React.FormEvent) => {
    event.preventDefault();
    const key = keyInput.trim();
    if (!key) {
      showToast("Admin key is required.");
      return;
    }
    setAdminKey(key);
    writeStoredAdminKey(key);
  };

  const handleDisconnect = () => {
    setAdminKey("");
    setKeyInput("");
    writeStoredAdminKey("");
    setUsers([]);
    setJobs([]);
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = userName.trim();
    if (!name) {
      showToast("Name is required.");
      return;
    }
    if (!hasAdminAccess) {
      showToast("Connect with an admin key first.");
      return;
    }

    try {
      const created = await createUserAsAdmin(adminKey, {
        name,
        email: userEmail.trim() || undefined,
        phone: userPhone.trim() || undefined,
        area: userArea,
        consentAccepted: userConsentAccepted,
        consentVersion: "2026-02-07",
        safeguardingOptIn: true
      });
      setUsers((prev) => {
        const withoutCurrent = prev.filter((item) => item.id !== created.id);
        return [created, ...withoutCurrent];
      });
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setUserConsentAccepted(true);
      showToast("User saved to SQLite.");
    } catch {
      showToast("Could not save user.");
    }
  };

  const handleCreateJob = async (event: React.FormEvent) => {
    event.preventDefault();
    const title = jobTitle.trim();
    const summary = jobSummary.trim();

    if (!title || !summary) {
      showToast("Job title and summary are required.");
      return;
    }
    if (!hasAdminAccess) {
      showToast("Connect with an admin key first.");
      return;
    }

    try {
      const created = await createManagedJob(
        {
          title,
          area: jobArea,
          type: jobType,
          employerName: jobEmployerName.trim() || undefined,
          summary,
          responsibilities: splitLines(jobResponsibilities),
          requirements: splitLines(jobRequirements),
          supportAvailable: splitLines(jobSupport),
          howToApply: splitLines(jobHowToApply)
        },
        adminKey
      );
      setJobs((prev) => [created, ...prev]);
      setJobTitle("");
      setJobEmployerName("");
      setJobSummary("");
      setJobResponsibilities("");
      setJobRequirements("");
      setJobSupport("");
      setJobHowToApply("");
      showToast("Job saved to SQLite.");
    } catch {
      showToast("Could not save job.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Admin</h2>
        <p className="text-sm text-muted">
          Restricted area for caseworkers and service admins. Records are stored in SQLite.
        </p>
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">Admin access</h3>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleConnect}>
          <input
            type="password"
            value={keyInput}
            onChange={(event) => setKeyInput(event.target.value)}
            className="flex-1 rounded-xl border border-line px-3 py-2 text-sm"
            placeholder="Enter admin API key"
          />
          <Button type="submit">Connect</Button>
          {hasAdminAccess ? (
            <Button type="button" variant="secondary" onClick={handleDisconnect}>
              Disconnect
            </Button>
          ) : null}
        </form>
        <p className="mt-2 text-xs text-muted">
          Backend expects `ADMIN_API_KEY` (default local value: `local-admin-key`).
        </p>
      </section>

      {!hasAdminAccess ? (
        <section className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
          Connect an admin key to manage users and job postings.
        </section>
      ) : null}

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">Register user</h3>
        <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={handleCreateUser}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Name
            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="e.g. Sam"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Email
            <input
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="e.g. sam@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Phone
            <input
              value={userPhone}
              onChange={(event) => setUserPhone(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="e.g. 07 7000 00000"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Area
            <select
              value={userArea}
              onChange={(event) => setUserArea(event.target.value)}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            >
              {areaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-line bg-app px-3 py-3 text-xs text-muted">
            <input
              type="checkbox"
              checked={userConsentAccepted}
              onChange={(event) => setUserConsentAccepted(event.target.checked)}
              className="mt-0.5 h-4 w-4"
            />
            <span>Consent confirmed for support-related processing.</span>
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={!hasAdminAccess}>Save user</Button>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-line p-3 text-sm">
              <p className="font-semibold text-ink">{user.name}</p>
              <p className="text-muted">{user.email || "No email"}</p>
              <p className="text-muted">{user.phone || "No phone"}</p>
              <p className="text-muted">{user.area || "No area"}</p>
              <p className="text-muted">
                Consent: {user.consentGrantedAt ? "Confirmed" : "Pending"}
              </p>
            </div>
          ))}
          {!loading && users.length === 0 ? (
            <p className="text-sm text-muted">No users yet.</p>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-ink">Create job</h3>
        <form className="mt-4 grid gap-4" onSubmit={handleCreateJob}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Job title
              <input
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Employer name (optional)
              <input
                value={jobEmployerName}
                onChange={(event) => setJobEmployerName(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Area
              <select
                value={jobArea}
                onChange={(event) => setJobArea(event.target.value)}
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
              Type
              <select
                value={jobType}
                onChange={(event) =>
                  setJobType(event.target.value as "Full time" | "Part time" | "Apprenticeship")
                }
                className="rounded-xl border border-line px-3 py-2 text-sm"
              >
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Apprenticeship">Apprenticeship</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Summary
            <textarea
              value={jobSummary}
              onChange={(event) => setJobSummary(event.target.value)}
              rows={3}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Responsibilities (one per line)
            <textarea
              value={jobResponsibilities}
              onChange={(event) => setJobResponsibilities(event.target.value)}
              rows={3}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Requirements (one per line)
            <textarea
              value={jobRequirements}
              onChange={(event) => setJobRequirements(event.target.value)}
              rows={3}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            Support available (one per line)
            <textarea
              value={jobSupport}
              onChange={(event) => setJobSupport(event.target.value)}
              rows={3}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
            How to apply (one per line)
            <textarea
              value={jobHowToApply}
              onChange={(event) => setJobHowToApply(event.target.value)}
              rows={3}
              className="rounded-xl border border-line px-3 py-2 text-sm"
            />
          </label>

          <div>
            <Button type="submit" disabled={!hasAdminAccess}>Save job</Button>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-xl border border-line p-3 text-sm">
              <p className="font-semibold text-ink">{job.title}</p>
              <p className="text-muted">{job.area} · {job.type}</p>
              <p className="text-muted">{job.summary}</p>
            </div>
          ))}
          {!loading && jobs.length === 0 ? (
            <p className="text-sm text-muted">No admin jobs yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Admin;
