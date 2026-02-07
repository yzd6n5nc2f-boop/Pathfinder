import { apiFetch } from "./api";

export type RegisteredUser = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  area?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const fetchRegisteredUsers = () => apiFetch<RegisteredUser[]>("/api/users");

export const registerUser = (payload: {
  name: string;
  email?: string;
  phone?: string;
  area?: string;
}) =>
  apiFetch<RegisteredUser>("/api/users/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
