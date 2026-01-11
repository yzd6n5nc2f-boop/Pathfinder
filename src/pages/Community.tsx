import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { communityTopics } from "../data/mock";

const Community = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="secondary">Start a topic</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-ink">Community</h2>
        <p className="text-sm text-muted">Connect with others for support and advice.</p>
      </div>
      <div className="space-y-3">
        {communityTopics.map((topic) => (
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
        ))}
      </div>
    </div>
  );
};

export default Community;
