import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { messages as seedMessages } from "../data/mock";
import { createMessage, fetchMessages, type Message } from "../utils/messagesApi";

const STORAGE_KEY = "pf_messages";

const fallbackMessages: Message[] = seedMessages.map((message, index) => ({
  id: `seed-${index}`,
  sender: message.sender,
  snippet: message.snippet
}));

const readStoredMessages = (): Message[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as Message[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredMessages = (messages: Message[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const Messages = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Message[]>(fallbackMessages);
  const [isComposing, setIsComposing] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const fetched = await fetchMessages();
        if (!isMounted) {
          return;
        }
        if (fetched.length > 0) {
          setItems(fetched);
          writeStoredMessages(fetched);
        } else {
          const stored = readStoredMessages();
          setItems(stored.length > 0 ? stored : fallbackMessages);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const stored = readStoredMessages();
        setItems(stored.length > 0 ? stored : fallbackMessages);
        showToast("Backend not reachable. Showing local messages.");
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedRecipient = recipient.trim();
    const trimmedBody = body.trim();
    if (!trimmedRecipient || !trimmedBody) {
      return;
    }

    try {
      const created = await createMessage({
        sender: trimmedRecipient,
        text: trimmedBody
      });
      setItems((prev) => {
        const next = [created, ...prev];
        writeStoredMessages(next);
        return next;
      });
      showToast("Message sent.");
    } catch (error) {
      const localMessage: Message = {
        id: `local-${Date.now()}`,
        sender: trimmedRecipient,
        snippet: trimmedBody.length > 120 ? `${trimmedBody.slice(0, 117)}...` : trimmedBody,
        text: trimmedBody,
        createdAt: new Date().toISOString()
      };
      setItems((prev) => {
        const next = [localMessage, ...prev];
        writeStoredMessages(next);
        return next;
      });
      showToast("Backend offline. Message saved locally.");
    } finally {
      setRecipient("");
      setBody("");
      setIsComposing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsComposing((prev) => !prev)}
        >
          {isComposing ? "Cancel" : "New message"}
        </Button>
      </div>

      {isComposing ? (
        <form
          className="rounded-2xl border border-line bg-white p-4 shadow-card"
          onSubmit={handleSend}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted">
              Recipient name
              <input
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="e.g. Caseworker Sam"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-muted sm:col-span-2">
              Message
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={3}
                className="rounded-xl border border-line px-3 py-2 text-sm"
                placeholder="Write a quick update..."
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit">Send message</Button>
          </div>
        </form>
      ) : null}

      <h2 className="text-xl font-semibold text-ink">Messages</h2>
      <div className="space-y-3">
        {items.map((message) => (
          <div key={message.id} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-semibold text-ink">{message.sender}</p>
            <p className="text-sm text-muted">{message.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
