export type PfUser = {
  name: string;
  createdAt: string;
};

const storageKey = "pf_user";

export const readStoredUser = (): PfUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PfUser> | null;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : ""
    };
  } catch {
    return null;
  }
};

export const writeStoredUser = (user: PfUser) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(user));
};

export const clearStoredUser = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(storageKey);
};
