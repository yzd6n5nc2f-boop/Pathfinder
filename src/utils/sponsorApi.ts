import { apiFetch } from "./api";
import type { SponsorPlan } from "./sponsorPlan";

export type SponsorContact = {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  createdAt?: string;
};

export type SponsorPlanResponse = SponsorPlan & {
  updatedAt?: string;
};

export const fetchSponsorContacts = () => apiFetch<SponsorContact[]>("/api/contacts");

export const createSponsorContact = (payload: {
  name: string;
  phone?: string;
  email?: string;
}) =>
  apiFetch<SponsorContact>("/api/contacts", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const deleteSponsorContact = (id: string) =>
  apiFetch<void>(`/api/contacts/${id}`, {
    method: "DELETE"
  });

export const fetchSponsorPlan = () => apiFetch<SponsorPlanResponse | null>("/api/sponsor-plan");

export const saveSponsorPlan = (plan: SponsorPlan) =>
  apiFetch<SponsorPlanResponse>("/api/sponsor-plan", {
    method: "PUT",
    body: JSON.stringify(plan)
  });
