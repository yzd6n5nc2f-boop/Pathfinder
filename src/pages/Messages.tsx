import React from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { messages } from "../data/mock";

const Messages = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <BackButton />
        <Button variant="secondary">New message</Button>
      </div>
      <h2 className="text-xl font-semibold text-ink">Messages</h2>
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
