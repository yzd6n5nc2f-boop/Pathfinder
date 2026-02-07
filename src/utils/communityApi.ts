import { apiFetch } from "./api";

export type TopicPost = {
  id: string;
  author: string;
  time: string;
  text: string;
};

export type TopicSummary = {
  id: string;
  title: string;
  category: string;
  repliesCount: number;
  lastUpdated: string;
};

export type TopicDetail = TopicSummary & {
  posts: TopicPost[];
};

export const fetchTopics = () => apiFetch<TopicSummary[]>("/api/topics");

export const createTopic = (payload: { title: string; category?: string; text?: string }) =>
  apiFetch<TopicDetail>("/api/topics", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const fetchTopic = (id: string) => apiFetch<TopicDetail>(`/api/topics/${id}`);

export const postReply = (id: string, payload: { author?: string; text: string }) =>
  apiFetch<TopicDetail>(`/api/topics/${id}/posts`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
