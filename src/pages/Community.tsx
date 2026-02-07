import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { communityTopics } from "../data/mock";
import {
  createTopic,
  fetchTopics,
  type TopicPost,
  type TopicDetail,
  type TopicSummary
} from "../utils/communityApi";

const STORAGE_KEY = "pf_topic_summaries";
const POSTS_KEY = "pf_topics";

const fallbackTopics: TopicSummary[] = communityTopics.map((topic) => ({
  id: topic.id,
  title: topic.title,
  category: topic.category,
  repliesCount: topic.repliesCount,
  lastUpdated: topic.lastUpdated
}));

const readStoredTopics = (): TopicSummary[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as TopicSummary[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredTopics = (topics: TopicSummary[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
};

const readStoredPosts = (): Record<string, TopicPost[]> => {
  if (typeof window === "undefined") {
    return {};
  }
  const raw = window.localStorage.getItem(POSTS_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw) as Record<string, TopicPost[]>;
    return parsed ?? {};
  } catch {
    return {};
  }
};

const writeStoredPosts = (postsByTopic: Record<string, TopicPost[]>) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(POSTS_KEY, JSON.stringify(postsByTopic));
};

const toSummary = (topic: TopicDetail): TopicSummary => ({
  id: topic.id,
  title: topic.title,
  category: topic.category,
  repliesCount: topic.repliesCount,
  lastUpdated: topic.lastUpdated
});

const Community = () => {
  const { showToast } = useToast();
  const [topics, setTopics] = useState<TopicSummary[]>(fallbackTopics);
  const [isComposing, setIsComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const fetched = await fetchTopics();
        if (!isMounted) {
          return;
        }
        if (fetched.length > 0) {
          setTopics(fetched);
          writeStoredTopics(fetched);
        } else {
          const stored = readStoredTopics();
          setTopics(stored.length > 0 ? stored : fallbackTopics);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const stored = readStoredTopics();
        setTopics(stored.length > 0 ? stored : fallbackTopics);
        showToast("Backend not reachable. Showing local topics.");
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle) {
      return;
    }

    try {
      const created = await createTopic({
        title: trimmedTitle,
        category: trimmedCategory || "General",
        text: trimmedBody
      });
      setTopics((prev) => {
        const next = [toSummary(created), ...prev];
        writeStoredTopics(next);
        return next;
      });
      showToast("Topic created.");
    } catch (error) {
      const localTopic: TopicSummary = {
        id: `local-${Date.now()}`,
        title: trimmedTitle,
        category: trimmedCategory || "General",
        repliesCount: trimmedBody ? 1 : 0,
        lastUpdated: "Just now"
      };
      setTopics((prev) => {
        const next = [localTopic, ...prev];
        writeStoredTopics(next);
        return next;
      });
      if (trimmedBody) {
        const storedPosts = readStoredPosts();
        const newPost: TopicPost = {
          id: `local-post-${Date.now()}`,
          author: "You",
          time: "Just now",
          text: trimmedBody
        };
        writeStoredPosts({
          ...storedPosts,
          [localTopic.id]: [newPost]
        });
      }
      showToast("Backend offline. Topic saved locally.");
    } finally {
      setTitle("");
      setCategory("");
      setBody("");
      setIsComposing(false);
    }
  };

  const hasTopics = useMemo(() => topics.length > 0, [topics]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsComposing((prev) => !prev)}
        >
          {isComposing ? "Cancel" : "Start a topic"}
        </Button>
      </div>

      {isComposing ? (
        <form
          className="rounded-2xl border border-line bg-white p-4 shadow-card"
          onSubmit={handleCreate}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Topic title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. Staying motivated this week"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Category
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. Wellbeing"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted sm:col-span-2">
              First post (optional)
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={3}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="Share a quick question or update..."
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit">Create topic</Button>
          </div>
        </form>
      ) : null}

      <div>
        <h2 className="text-xl font-semibold text-ink">Community</h2>
        <p className="text-sm text-muted">Connect with others for support and advice.</p>
      </div>

      <div className="space-y-3">
        {hasTopics ? (
          topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/community/${topic.id}`}
              className="relative isolate rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{topic.title}</p>
                  <p className="text-xs text-muted">
                    {topic.category} · {topic.repliesCount} replies
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted">
                  {topic.lastUpdated}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
            No topics yet. Start the conversation.
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
