import React from "react";
import Button from "../components/Button";
import { forumTopics } from "../data/mock";

const Community = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="secondary">Start a topic</Button>
      </div>
      <h2 className="text-xl font-semibold text-ink">Community</h2>
      <div className="space-y-3">
        {forumTopics.map((topic) => (
          <div key={topic} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-semibold text-ink">{topic}</p>
            <p className="text-xs text-muted">Latest reply 2 hours ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
