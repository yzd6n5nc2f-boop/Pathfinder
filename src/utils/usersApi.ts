import { apiFetch } from "./api";

export type RegisteredUser = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  area?: string | null;
  consentVersion?: string | null;
  consentGrantedAt?: string | null;
  safeguardingOptIn?: boolean;
  createdAt: string;
  updatedAt: string;
};

export const fetchRegisteredUsers = (adminKey: string) =>
  apiFetch<RegisteredUser[]>("/api/users", {
    headers: {
      "X-Admin-Key": adminKey
    }
  });

export const registerUser = (payload: {
  name: string;
  email?: string;
  phone?: string;
  area?: string;
  consentAccepted: boolean;
  consentVersion?: string;
  safeguardingOptIn?: boolean;
}) =>
  apiFetch<RegisteredUser>("/api/users/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const createUserAsAdmin = (
  adminKey: string,
  payload: {
    name: string;
    email?: string;
    phone?: string;
    area?: string;
    consentAccepted?: boolean;
    consentVersion?: string;
    safeguardingOptIn?: boolean;
  }
) =>
  apiFetch<RegisteredUser>("/api/users", {
    method: "POST",
    headers: {
      "X-Admin-Key": adminKey
    },
    body: JSON.stringify(payload)
  });

export const exportUserData = (userId: string) =>
  apiFetch<{ exportedAt: string; user: RegisteredUser }>(`/api/users/${userId}/export`, {
    headers: {
      "X-User-Id": userId
    }
  });

export const deleteOwnUser = (userId: string) =>
  apiFetch<void>(`/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "X-User-Id": userId,
      "X-Delete-Confirm": "DELETE"
    }
  });
