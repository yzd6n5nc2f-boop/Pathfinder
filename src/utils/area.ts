export type AreaSelection = {
  area: string;
  postcode?: string;
};

const STORAGE_KEY = "pf_area";

export const readStoredArea = (): AreaSelection | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as AreaSelection;
    if (!parsed || typeof parsed.area !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const writeStoredArea = (selection: AreaSelection) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
};
