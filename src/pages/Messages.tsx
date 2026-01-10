import React from "react";
import Button from "../components/Button";
import { messages } from "../data/mock";

const Messages = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">Messages</h2>
        <Button variant="secondary">New message</Button>
      </div>
      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.sender} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-semibold text-ink">{message.sender}</p>
            <p className="text-sm text-slate-500">{message.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
