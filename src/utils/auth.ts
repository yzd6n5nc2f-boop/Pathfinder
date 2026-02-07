export type PfUser = {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  area?: string;
  createdAt: string;
  lastVoucherId?: string;
  lastVoucherRedeemedAt?: string;
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

    if (typeof parsed.name !== "string" || typeof parsed.createdAt !== "string") {
      return null;
    }

    return {
      id: typeof parsed.id === "string" ? parsed.id : undefined,
      name: parsed.name,
      email: typeof parsed.email === "string" ? parsed.email : undefined,
      phone: typeof parsed.phone === "string" ? parsed.phone : undefined,
      area: typeof parsed.area === "string" ? parsed.area : undefined,
      createdAt: parsed.createdAt,
      lastVoucherId: typeof parsed.lastVoucherId === "string" ? parsed.lastVoucherId : undefined,
      lastVoucherRedeemedAt:
        typeof parsed.lastVoucherRedeemedAt === "string"
          ? parsed.lastVoucherRedeemedAt
          : undefined
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
