import { apiFetch } from "./api";

export type ManagedJob = {
  id: string;
  title: string;
  area: string;
  type: "Full time" | "Part time" | "Apprenticeship";
  employerName?: string | null;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  supportAvailable: string[];
  howToApply: string[];
  createdAt: string;
};

export const fetchManagedJobs = () => apiFetch<ManagedJob[]>("/api/jobs");

export const fetchManagedJob = (id: string) => apiFetch<ManagedJob>(`/api/jobs/${id}`);

export const createManagedJob = (payload: {
  title: string;
  area: string;
  type: "Full time" | "Part time" | "Apprenticeship";
  employerName?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  supportAvailable: string[];
  howToApply: string[];
}) =>
  apiFetch<ManagedJob>("/api/jobs", {
    method: "POST",
    body: JSON.stringify(payload)
  });
