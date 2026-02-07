import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useToast } from "../components/Toast";
import TopBar from "../components/TopBar";
import { clearStoredUser, readStoredUser, writeStoredUser } from "../utils/auth";
import { registerUser } from "../utils/usersApi";

const consentVersion = "2026-02-07";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [safeguardingOptIn, setSafeguardingOptIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const existingUser = readStoredUser();

  if (existingUser) {
    return <Navigate to="/" replace />;
  }

  const handleContinue = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (!consentAccepted) {
      showToast("Please accept data use terms before continuing.");
      return;
    }
    setIsSubmitting(true);
    const trimmed = name.trim();
    const nextName = trimmed || "Guest";
    try {
      const registered = await registerUser({
        name: nextName,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        area: area.trim() || undefined,
        consentAccepted: true,
        consentVersion,
        safeguardingOptIn
      });
      writeStoredUser({
        id: registered.id,
        name: registered.name,
        email: registered.email ?? undefined,
        phone: registered.phone ?? undefined,
        area: registered.area ?? undefined,
        consentVersion: registered.consentVersion ?? undefined,
        consentGrantedAt: registered.consentGrantedAt ?? undefined,
        createdAt: registered.createdAt
      });
      navigate("/", { replace: true });
    } catch (error) {
      writeStoredUser({
        name: nextName,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        area: area.trim() || undefined,
        createdAt: new Date().toISOString()
      });
      showToast("Backend unavailable. Saved locally only.");
      navigate("/", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = async () => {
    if (isSubmitting) {
      return;
    }
    if (!consentAccepted) {
      showToast("Please accept data use terms before continuing.");
      return;
    }
    setIsSubmitting(true);
    try {
      const registered = await registerUser({
        name: "Guest",
        consentAccepted: true,
        consentVersion,
        safeguardingOptIn
      });
      writeStoredUser({
        id: registered.id,
        name: registered.name,
        createdAt: registered.createdAt
      });
      navigate("/", { replace: true });
    } catch (error) {
      writeStoredUser({
        name: "Guest",
        createdAt: new Date().toISOString()
      });
      showToast("Backend unavailable. Saved locally only.");
      navigate("/", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-app px-3 py-6 text-ink sm:px-6">
      <div className="mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-device border border-line bg-surface shadow-phone md:max-w-[760px] md:rounded-[24px] md:shadow-card lg:max-w-[1024px]">
        <TopBar showUser={false} />
        <main className="flex w-full flex-1 flex-col gap-6 px-4 py-6 md:px-6 md:py-8 lg:px-8">
          <section className="rounded-3xl bg-white p-6 text-center shadow-card">
            <h1 className="text-2xl font-semibold text-ink">Pathway Forward</h1>
            <p className="mt-2 text-sm text-muted">
              Quick access to support on release day.
            </p>
            <p className="mt-3 text-xs text-muted">Sign in once and we will keep you ready.</p>
          </section>

          <form className="space-y-4" onSubmit={handleContinue}>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              First name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. Sam"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Email (optional)
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. sam@example.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Phone (optional)
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. 07 7000 00000"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Area (optional)
              <input
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
              placeholder="e.g. Manchester"
            />
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-line bg-white px-3 py-3 text-xs text-muted">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(event) => setConsentAccepted(event.target.checked)}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              I agree that Pathway Forward can process my personal data to provide support
              services, safety check-ins, and caseworker coordination.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-line bg-white px-3 py-3 text-xs text-muted">
            <input
              type="checkbox"
              checked={safeguardingOptIn}
              onChange={(event) => setSafeguardingOptIn(event.target.checked)}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              I agree to receive safeguarding follow-up if risk is detected in my messages.
            </span>
          </label>
          <p className="text-[11px] text-muted">
            You can request data export or deletion later in Privacy &amp; Safety.
          </p>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
            <Button
              className="w-full"
              type="button"
              variant="secondary"
              onClick={handleGuest}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Continue as guest"}
            </Button>
          </form>

          <button
            type="button"
            className="text-center text-xs font-semibold text-brand"
            onClick={() => {
              clearStoredUser();
              showToast("Saved session cleared.");
            }}
          >
            Clear saved session
          </button>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
