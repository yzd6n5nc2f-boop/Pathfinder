import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { communityTopics } from "../data/mock";
import { fetchTopic, postReply, type TopicDetail as ApiTopicDetail, type TopicPost } from "../utils/communityApi";

const STORAGE_KEY = "pf_topics";

type StoredTopics = Record<string, TopicPost[]>;

const readStoredTopics = (): StoredTopics => {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredTopics) : {};
  } catch {
    return {};
  }
};

const writeStoredTopics = (topics: StoredTopics) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
};

const TopicDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [reply, setReply] = useState("");
  const [topic, setTopic] = useState<ApiTopicDetail | null>(null);
  const [posts, setPosts] = useState<TopicPost[]>([]);

  const fallbackTopic = useMemo(
    () => communityTopics.find((item) => item.id === id) ?? null,
    [id]
  );

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!id) {
        return;
      }
      if (id.startsWith("local-")) {
        const stored = readStoredTopics();
        const storedPosts = stored[id] ?? [];
        setTopic({
          id,
          title: "Community topic",
          category: "Community",
          repliesCount: storedPosts.length,
          lastUpdated: "Just now",
          posts: storedPosts
        });
        setPosts(storedPosts);
        return;
      }
      try {
        const fetched = await fetchTopic(id);
        if (!isMounted) {
          return;
        }
        setTopic(fetched);
        setPosts(fetched.posts ?? []);
        const stored = readStoredTopics();
        writeStoredTopics({
          ...stored,
          [id]: fetched.posts ?? []
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const stored = readStoredTopics();
        const storedPosts = stored[id] ?? [];
        if (fallbackTopic) {
          const nextPosts = storedPosts.length > 0 ? storedPosts : fallbackTopic.posts;
          setTopic({
            id: fallbackTopic.id,
            title: fallbackTopic.title,
            category: fallbackTopic.category,
            repliesCount: fallbackTopic.repliesCount,
            lastUpdated: fallbackTopic.lastUpdated,
            posts: nextPosts
          });
          setPosts(nextPosts);
        } else if (storedPosts.length > 0) {
          setTopic({
            id,
            title: "Community topic",
            category: "Community",
            repliesCount: storedPosts.length,
            lastUpdated: "Just now",
            posts: storedPosts
          });
          setPosts(storedPosts);
        } else {
          setTopic(null);
          setPosts([]);
        }
        showToast("Backend not reachable. Showing local replies.");
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [fallbackTopic, id, showToast]);

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

  const handlePost = async () => {
    if (!reply.trim() || !id) {
      return;
    }

    try {
      const updated = await postReply(id, { author: "You", text: reply.trim() });
      setTopic(updated);
      setPosts(updated.posts ?? []);
      showToast("Reply posted.");
    } catch (error) {
      const newPost: TopicPost = {
        id: `local-${Date.now()}`,
        author: "You",
        time: "Just now",
        text: reply.trim()
      };
      const nextPosts = [...posts, newPost];
      setPosts(nextPosts);
      setTopic({
        ...topic,
        posts: nextPosts,
        repliesCount: (topic.repliesCount ?? 0) + 1,
        lastUpdated: "Just now"
      });
      const stored = readStoredTopics();
      writeStoredTopics({
        ...stored,
        [id]: nextPosts
      });
      showToast("Backend offline. Reply saved locally.");
    } finally {
      setReply("");
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/community" className="text-sm font-semibold text-muted hover:text-ink">
        ← Back to community
      </Link>
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
