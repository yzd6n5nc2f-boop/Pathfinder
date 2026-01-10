import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useToast } from "../components/Toast";
import TopBar from "../components/TopBar";
import { clearStoredUser, readStoredUser, writeStoredUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const existingUser = readStoredUser();

  if (existingUser) {
    return <Navigate to="/" replace />;
  }

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    writeStoredUser({
      name: trimmed || "Guest",
      createdAt: new Date().toISOString()
    });
    navigate("/", { replace: true });
  };

  const handleGuest = () => {
    writeStoredUser({
      name: "Guest",
      createdAt: new Date().toISOString()
    });
    navigate("/", { replace: true });
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
              Your first name (optional)
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. Sam"
              />
            </label>
            <Button className="w-full" type="submit">
              Continue
            </Button>
            <Button className="w-full" type="button" variant="secondary" onClick={handleGuest}>
              Continue as guest
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
