import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { areaOptions } from "../data/mock";
import { createManagedJob, fetchManagedJobs, type ManagedJob } from "../utils/jobsApi";
import { fetchRegisteredUsers, registerUser, type RegisteredUser } from "../utils/usersApi";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const Admin = () => {
  const { showToast } = useToast();

  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [jobs, setJobs] = useState<ManagedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userArea, setUserArea] = useState(areaOptions[0]);

  const [jobTitle, setJobTitle] = useState("");
  const [jobArea, setJobArea] = useState(areaOptions[0]);
  const [jobType, setJobType] = useState<"Full time" | "Part time" | "Apprenticeship">("Full time");
  const [jobEmployerName, setJobEmployerName] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobSupport, setJobSupport] = useState("");
  const [jobHowToApply, setJobHowToApply] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [usersResult, jobsResult] = await Promise.all([
          fetchRegisteredUsers(),
          fetchManagedJobs()
        ]);
        if (!isMounted) {
          return;
        }
        setUsers(usersResult);
        setJobs(jobsResult);
      } catch {
        if (isMounted) {
          showToast("Backend unavailable. Admin data cannot be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = userName.trim();
    if (!name) {
      showToast("Name is required.");
      return;
    }

    try {
      const created = await registerUser({
        name,
        email: userEmail.trim() || undefined,
        phone: userPhone.trim() || undefined,
        area: userArea
      });
      setUsers((prev) => {
        const withoutCurrent = prev.filter((item) => item.id !== created.id);
        return [created, ...withoutCurrent];
      });
      setUserName("");
      setUserEmail("");
      setUserPhone("");
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

    try {
      const created = await createManagedJob({
        title,
        area: jobArea,
        type: jobType,
        employerName: jobEmployerName.trim() || undefined,
        summary,
        responsibilities: splitLines(jobResponsibilities),
        requirements: splitLines(jobRequirements),
        supportAvailable: splitLines(jobSupport),
        howToApply: splitLines(jobHowToApply)
      });
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
        <p className="text-sm text-muted">Manage registered users and jobs stored in SQLite.</p>
      </div>

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
          <div className="sm:col-span-2">
            <Button type="submit">Save user</Button>
          </div>
        </form>

        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-line p-3 text-sm">
              <p className="font-semibold text-ink">{user.name}</p>
              <p className="text-muted">{user.email || "No email"}</p>
              <p className="text-muted">{user.phone || "No phone"}</p>
              <p className="text-muted">{user.area || "No area"}</p>
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
            <Button type="submit">Save job</Button>
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
