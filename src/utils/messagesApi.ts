import { apiFetch } from "./api";

export type Message = {
  id: string;
  sender: string;
  snippet: string;
  text?: string;
  createdAt?: string;
};

export const fetchMessages = () => apiFetch<Message[]>("/api/messages");

export const createMessage = (payload: { sender: string; text: string }) =>
  apiFetch<Message>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload)
  });
