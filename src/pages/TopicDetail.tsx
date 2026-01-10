import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { communityTopics, TopicPost } from "../data/mock";

const STORAGE_KEY = "pf_topics";

type StoredTopics = Record<string, TopicPost[]>;

const TopicDetail = () => {
  const { id } = useParams();
  const topic = communityTopics.find((item) => item.id === id);
  const [reply, setReply] = useState("");

  const storedPosts = useMemo(() => {
    if (typeof window === "undefined") {
      return {} as StoredTopics;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredTopics) : {};
    } catch {
      return {} as StoredTopics;
    }
  }, []);

  const [posts, setPosts] = useState<TopicPost[]>(
    topic ? storedPosts[topic.id] ?? topic.posts : []
  );

  if (!topic) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">Topic not found.</p>
        <Link to="/community" className="text-sm font-semibold text-brand">
          Back to community
        </Link>
      </div>
    );
  }

  const handlePost = () => {
    if (!reply.trim()) {
      return;
    }
    const newPost: TopicPost = {
      id: `${Date.now()}`,
      author: "You",
      time: "Just now",
      text: reply.trim()
    };
    const next = [...posts, newPost];
    setPosts(next);
    setReply("");

    const updated: StoredTopics = {
      ...storedPosts,
      [topic.id]: next
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {topic.category}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{topic.title}</h2>
        <p className="text-sm text-muted">Last updated {topic.lastUpdated}</p>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-semibold text-ink">{post.author}</span>
              <span>{post.time}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{post.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <label className="text-xs font-semibold text-muted">
          Your reply
          <textarea
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            rows={4}
            placeholder="Write a supportive reply..."
            className="mt-2 w-full rounded-xl border border-line px-3 py-2 text-sm"
          />
        </label>
        <p className="mt-2 text-xs text-muted">
          Be respectful. Don’t share personal details.
        </p>
        <div className="mt-4">
          <Button variant="amber" onClick={handlePost}>
            Post reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
