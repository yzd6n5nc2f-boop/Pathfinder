export type SponsorPlan = {
  reachOut: string;
  checkInFrequency: string;
  backupContact: string;
  boundary: string;
};

const storageKey = "pf_sponsor_plan";

export const readStoredSponsorPlan = (): SponsorPlan | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SponsorPlan> | null;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      reachOut: typeof parsed.reachOut === "string" ? parsed.reachOut : "",
      checkInFrequency: typeof parsed.checkInFrequency === "string" ? parsed.checkInFrequency : "daily",
      backupContact: typeof parsed.backupContact === "string" ? parsed.backupContact : "",
      boundary: typeof parsed.boundary === "string" ? parsed.boundary : ""
    };
  } catch {
    return null;
  }
};

export const writeStoredSponsorPlan = (plan: SponsorPlan) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(plan));
};
