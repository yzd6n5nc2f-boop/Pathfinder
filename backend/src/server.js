import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.PORT) || 5174;
const corsOrigin = process.env.CORS_ORIGIN || "*";
const dbPath =
  process.env.DB_PATH || path.join(__dirname, "..", "data", "pathfinder.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sponsor_plan (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    reach_out TEXT NOT NULL,
    check_in_frequency TEXT NOT NULL,
    backup_contact TEXT NOT NULL,
    boundary TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    sender TEXT NOT NULL,
    snippet TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    replies_count INTEGER NOT NULL,
    last_updated TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS topic_posts (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL,
    author TEXT NOT NULL,
    time TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    area TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    area TEXT NOT NULL,
    type TEXT NOT NULL,
    employer_name TEXT,
    summary TEXT NOT NULL,
    responsibilities_json TEXT NOT NULL,
    requirements_json TEXT NOT NULL,
    support_available_json TEXT NOT NULL,
    how_to_apply_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

const defaultMessages = [
  {
    id: "seed-support-adviser",
    sender: "Support adviser",
    snippet: "Checking in to see how your plans are going.",
    text: "Checking in to see how your plans are going.",
    createdAt: "seed"
  },
  {
    id: "seed-mentor-dave",
    sender: "Mentor Dave",
    snippet: "Shall we set up a call for tomorrow afternoon?",
    text: "Shall we set up a call for tomorrow afternoon?",
    createdAt: "seed"
  },
  {
    id: "seed-community-team",
    sender: "Community Team",
    snippet: "New local support group starting next week.",
    text: "New local support group starting next week.",
    createdAt: "seed"
  }
];

const defaultTopics = [
  {
    id: "staying-positive",
    title: "Staying positive after release",
    category: "Wellbeing",
    repliesCount: 12,
    lastUpdated: "Today",
    posts: [
      {
        id: "post-1",
        author: "Alex",
        time: "Today, 9:10am",
        text: "What routines are helping people stay positive in the first few weeks?"
      },
      {
        id: "post-2",
        author: "Jordan",
        time: "Today, 10:05am",
        text: "I'm trying short walks and checking in with my mentor every other day."
      }
    ]
  },
  {
    id: "housing-options",
    title: "Housing options advice",
    category: "Housing",
    repliesCount: 8,
    lastUpdated: "Yesterday",
    posts: [
      {
        id: "post-1",
        author: "Caseworker Sam",
        time: "Yesterday, 3:40pm",
        text: "Share tips on getting temporary accommodation sorted quickly."
      },
      {
        id: "post-2",
        author: "Leah",
        time: "Yesterday, 5:20pm",
        text: "Local housing charities helped me fast-track an appointment."
      }
    ]
  }
];

const parseJsonArray = (raw) => {
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
};

const normalizeStringArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};

const mapJobRow = (row) => ({
  id: row.id,
  title: row.title,
  area: row.area,
  type: row.type,
  employerName: row.employerName,
  summary: row.summary,
  responsibilities: parseJsonArray(row.responsibilitiesJson),
  requirements: parseJsonArray(row.requirementsJson),
  supportAvailable: parseJsonArray(row.supportAvailableJson),
  howToApply: parseJsonArray(row.howToApplyJson),
  createdAt: row.createdAt
});

const selectContacts = db.prepare(
  "SELECT id, name, phone, email, created_at as createdAt FROM contacts ORDER BY created_at ASC"
);
const insertContact = db.prepare(
  "INSERT INTO contacts (id, name, phone, email, created_at) VALUES (@id, @name, @phone, @email, @createdAt)"
);
const deleteContact = db.prepare("DELETE FROM contacts WHERE id = ?");

const selectPlan = db.prepare(
  "SELECT reach_out as reachOut, check_in_frequency as checkInFrequency, backup_contact as backupContact, boundary, updated_at as updatedAt FROM sponsor_plan WHERE id = 1"
);
const upsertPlan = db.prepare(`
  INSERT INTO sponsor_plan (id, reach_out, check_in_frequency, backup_contact, boundary, updated_at)
  VALUES (1, @reachOut, @checkInFrequency, @backupContact, @boundary, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET
    reach_out = excluded.reach_out,
    check_in_frequency = excluded.check_in_frequency,
    backup_contact = excluded.backup_contact,
    boundary = excluded.boundary,
    updated_at = excluded.updated_at
`);

const selectMessages = db.prepare(
  "SELECT id, sender, snippet, text, created_at as createdAt FROM messages ORDER BY created_at DESC"
);
const insertMessage = db.prepare(
  "INSERT INTO messages (id, sender, snippet, text, created_at) VALUES (@id, @sender, @snippet, @text, @createdAt)"
);

const selectTopicSummaries = db.prepare(
  "SELECT id, title, category, replies_count as repliesCount, last_updated as lastUpdated FROM topics ORDER BY created_at DESC"
);
const selectTopic = db.prepare(
  "SELECT id, title, category, replies_count as repliesCount, last_updated as lastUpdated FROM topics WHERE id = ?"
);
const selectTopicPosts = db.prepare(
  "SELECT id, author, time, text FROM topic_posts WHERE topic_id = ? ORDER BY created_at ASC"
);
const insertTopic = db.prepare(
  "INSERT INTO topics (id, title, category, replies_count, last_updated, created_at) VALUES (@id, @title, @category, @repliesCount, @lastUpdated, @createdAt)"
);
const insertTopicPost = db.prepare(
  "INSERT INTO topic_posts (id, topic_id, author, time, text, created_at) VALUES (@id, @topicId, @author, @time, @text, @createdAt)"
);
const updateTopicMeta = db.prepare(
  "UPDATE topics SET replies_count = @repliesCount, last_updated = @lastUpdated WHERE id = @id"
);

const selectUsers = db.prepare(
  "SELECT id, name, email, phone, area, created_at as createdAt, updated_at as updatedAt FROM users ORDER BY created_at DESC"
);
const selectUserById = db.prepare(
  "SELECT id, name, email, phone, area, created_at as createdAt, updated_at as updatedAt FROM users WHERE id = ?"
);
const selectUserByEmail = db.prepare(
  "SELECT id, name, email, phone, area, created_at as createdAt, updated_at as updatedAt FROM users WHERE email = ?"
);
const insertUser = db.prepare(
  "INSERT INTO users (id, name, email, phone, area, created_at, updated_at) VALUES (@id, @name, @email, @phone, @area, @createdAt, @updatedAt)"
);
const updateUser = db.prepare(
  "UPDATE users SET name = @name, email = @email, phone = @phone, area = @area, updated_at = @updatedAt WHERE id = @id"
);

const selectJobs = db.prepare(
  "SELECT id, title, area, type, employer_name as employerName, summary, responsibilities_json as responsibilitiesJson, requirements_json as requirementsJson, support_available_json as supportAvailableJson, how_to_apply_json as howToApplyJson, created_at as createdAt FROM jobs ORDER BY created_at DESC"
);
const selectJobById = db.prepare(
  "SELECT id, title, area, type, employer_name as employerName, summary, responsibilities_json as responsibilitiesJson, requirements_json as requirementsJson, support_available_json as supportAvailableJson, how_to_apply_json as howToApplyJson, created_at as createdAt FROM jobs WHERE id = ?"
);
const insertJob = db.prepare(
  "INSERT INTO jobs (id, title, area, type, employer_name, summary, responsibilities_json, requirements_json, support_available_json, how_to_apply_json, created_at) VALUES (@id, @title, @area, @type, @employerName, @summary, @responsibilitiesJson, @requirementsJson, @supportAvailableJson, @howToApplyJson, @createdAt)"
);

const seedData = () => {
  const messageCount = db.prepare("SELECT COUNT(1) as count FROM messages").get()?.count ?? 0;
  if (messageCount === 0) {
    const insert = db.transaction((messages) => {
      messages.forEach((message) => insertMessage.run(message));
    });
    insert(defaultMessages);
  }

  const topicCount = db.prepare("SELECT COUNT(1) as count FROM topics").get()?.count ?? 0;
  if (topicCount === 0) {
    const insertTopics = db.transaction((topics) => {
      const now = new Date().toISOString();
      topics.forEach((topic) => {
        insertTopic.run({
          id: topic.id,
          title: topic.title,
          category: topic.category,
          repliesCount: topic.repliesCount,
          lastUpdated: topic.lastUpdated,
          createdAt: now
        });
        const posts = topic.posts ?? [];
        posts.forEach((post) => {
          insertTopicPost.run({
            id: `seed-${topic.id}-${post.id}`,
            topicId: topic.id,
            author: post.author,
            time: post.time,
            text: post.text,
            createdAt: now
          });
        });
      });
    });
    insertTopics(defaultTopics);
  }
};

seedData();

const sendJson = (res, status, payload) => {
  const body = payload === undefined ? "" : JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(body);
};

const sendNoContent = (res) => {
  res.writeHead(204, {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end();
};

const readJsonBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) {
    return null;
  }
  const raw = Buffer.concat(chunks).toString("utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const { pathname } = url;

  if (req.method === "OPTIONS") {
    return sendNoContent(res);
  }

  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET" && pathname === "/api/contacts") {
    const rows = selectContacts.all();
    return sendJson(res, 200, rows);
  }

  if (req.method === "POST" && pathname === "/api/contacts") {
    const body = await readJsonBody(req);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!name) {
      return sendJson(res, 400, { error: "Name is required." });
    }

    const contact = {
      id: randomUUID(),
      name,
      phone: phone || null,
      email: email || null,
      createdAt: new Date().toISOString()
    };

    insertContact.run(contact);
    return sendJson(res, 201, contact);
  }

  if (req.method === "DELETE" && pathname.startsWith("/api/contacts/")) {
    const id = pathname.replace("/api/contacts/", "");
    if (!id) {
      return sendJson(res, 400, { error: "Contact id is required." });
    }
    const result = deleteContact.run(id);
    if (result.changes === 0) {
      return sendJson(res, 404, { error: "Contact not found." });
    }
    return sendNoContent(res);
  }

  if (req.method === "GET" && pathname === "/api/sponsor-plan") {
    const plan = selectPlan.get();
    return sendJson(res, 200, plan ?? null);
  }

  if (req.method === "PUT" && pathname === "/api/sponsor-plan") {
    const body = await readJsonBody(req);
    const reachOut = typeof body?.reachOut === "string" ? body.reachOut.trim() : "";
    const checkInFrequency =
      typeof body?.checkInFrequency === "string" ? body.checkInFrequency.trim() : "daily";
    const backupContact =
      typeof body?.backupContact === "string" ? body.backupContact.trim() : "";
    const boundary = typeof body?.boundary === "string" ? body.boundary.trim() : "";

    if (!reachOut || !boundary) {
      return sendJson(res, 400, { error: "Plan fields are required." });
    }

    const plan = {
      reachOut,
      checkInFrequency,
      backupContact,
      boundary,
      updatedAt: new Date().toISOString()
    };

    upsertPlan.run(plan);
    return sendJson(res, 200, plan);
  }

  if (req.method === "GET" && pathname === "/api/messages") {
    const rows = selectMessages.all();
    return sendJson(res, 200, rows);
  }

  if (req.method === "POST" && pathname === "/api/messages") {
    const body = await readJsonBody(req);
    const sender = typeof body?.sender === "string" ? body.sender.trim() : "";
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!sender || !text) {
      return sendJson(res, 400, { error: "Sender and message text are required." });
    }

    const snippet = text.length > 120 ? `${text.slice(0, 117)}...` : text;
    const message = {
      id: randomUUID(),
      sender,
      snippet,
      text,
      createdAt: new Date().toISOString()
    };

    insertMessage.run(message);
    return sendJson(res, 201, message);
  }

  if (req.method === "GET" && pathname === "/api/users") {
    const rows = selectUsers.all();
    return sendJson(res, 200, rows);
  }

  if (req.method === "GET" && pathname.startsWith("/api/users/")) {
    const id = pathname.replace("/api/users/", "");
    const user = selectUserById.get(id);
    if (!user) {
      return sendJson(res, 404, { error: "User not found." });
    }
    return sendJson(res, 200, user);
  }

  if (
    req.method === "POST" &&
    (pathname === "/api/users/register" || pathname === "/api/users")
  ) {
    const body = await readJsonBody(req);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const area = typeof body?.area === "string" ? body.area.trim() : "";

    if (!name) {
      return sendJson(res, 400, { error: "Name is required." });
    }

    const now = new Date().toISOString();

    if (email) {
      const existing = selectUserByEmail.get(email);
      if (existing) {
        updateUser.run({
          id: existing.id,
          name,
          email,
          phone: phone || null,
          area: area || null,
          updatedAt: now
        });
        const updated = selectUserById.get(existing.id);
        return sendJson(res, 200, updated);
      }
    }

    const user = {
      id: randomUUID(),
      name,
      email: email || null,
      phone: phone || null,
      area: area || null,
      createdAt: now,
      updatedAt: now
    };

    insertUser.run(user);
    return sendJson(res, 201, user);
  }

  if (req.method === "GET" && pathname === "/api/jobs") {
    const rows = selectJobs.all().map(mapJobRow);
    return sendJson(res, 200, rows);
  }

  if (req.method === "GET" && pathname.startsWith("/api/jobs/")) {
    const id = pathname.replace("/api/jobs/", "");
    const row = selectJobById.get(id);
    if (!row) {
      return sendJson(res, 404, { error: "Job not found." });
    }
    return sendJson(res, 200, mapJobRow(row));
  }

  if (req.method === "POST" && pathname === "/api/jobs") {
    const body = await readJsonBody(req);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const area = typeof body?.area === "string" ? body.area.trim() : "";
    const type = typeof body?.type === "string" ? body.type.trim() : "Full time";
    const employerName =
      typeof body?.employerName === "string" ? body.employerName.trim() : "";
    const summary = typeof body?.summary === "string" ? body.summary.trim() : "";

    if (!title || !area || !summary) {
      return sendJson(res, 400, { error: "Title, area, and summary are required." });
    }

    const jobType = ["Full time", "Part time", "Apprenticeship"].includes(type)
      ? type
      : "Full time";

    const responsibilities = normalizeStringArray(body?.responsibilities);
    const requirements = normalizeStringArray(body?.requirements);
    const supportAvailable = normalizeStringArray(body?.supportAvailable);
    const howToApply = normalizeStringArray(body?.howToApply);

    const now = new Date().toISOString();
    const jobRecord = {
      id: randomUUID(),
      title,
      area,
      type: jobType,
      employerName: employerName || null,
      summary,
      responsibilitiesJson: JSON.stringify(
        responsibilities.length > 0 ? responsibilities : ["Discuss this role with your adviser."]
      ),
      requirementsJson: JSON.stringify(
        requirements.length > 0 ? requirements : ["Willingness to learn"]
      ),
      supportAvailableJson: JSON.stringify(
        supportAvailable.length > 0 ? supportAvailable : ["Onboarding support"]
      ),
      howToApplyJson: JSON.stringify(
        howToApply.length > 0 ? howToApply : ["Contact your adviser to apply"]
      ),
      createdAt: now
    };

    insertJob.run(jobRecord);

    const created = selectJobById.get(jobRecord.id);
    return sendJson(res, 201, mapJobRow(created));
  }

  if (pathname.startsWith("/api/topics/")) {
    const remainder = pathname.replace("/api/topics/", "");
    const [topicId, action] = remainder.split("/");

    if (req.method === "GET" && !action) {
      const topic = selectTopic.get(topicId);
      if (!topic) {
        return sendJson(res, 404, { error: "Topic not found." });
      }
      const posts = selectTopicPosts.all(topicId);
      return sendJson(res, 200, { ...topic, posts });
    }

    if (req.method === "POST" && action === "posts") {
      const body = await readJsonBody(req);
      const author = typeof body?.author === "string" ? body.author.trim() : "You";
      const text = typeof body?.text === "string" ? body.text.trim() : "";

      if (!text) {
        return sendJson(res, 400, { error: "Reply text is required." });
      }

      const topic = selectTopic.get(topicId);
      if (!topic) {
        return sendJson(res, 404, { error: "Topic not found." });
      }

      const newPost = {
        id: `post-${Date.now()}`,
        topicId,
        author: author || "You",
        time: new Date().toLocaleString("en-GB"),
        text,
        createdAt: new Date().toISOString()
      };

      const updateTopic = db.transaction(() => {
        insertTopicPost.run(newPost);
        updateTopicMeta.run({
          id: topicId,
          repliesCount: (topic.repliesCount ?? 0) + 1,
          lastUpdated: "Just now"
        });
      });

      updateTopic();

      const updatedTopic = selectTopic.get(topicId);
      const posts = selectTopicPosts.all(topicId);
      return sendJson(res, 201, { ...updatedTopic, posts });
    }
  }

  if (req.method === "GET" && pathname === "/api/topics") {
    const rows = selectTopicSummaries.all();
    return sendJson(res, 200, rows);
  }

  if (req.method === "POST" && pathname === "/api/topics") {
    const body = await readJsonBody(req);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const category = typeof body?.category === "string" ? body.category.trim() : "General";
    const text = typeof body?.text === "string" ? body.text.trim() : "";

    if (!title) {
      return sendJson(res, 400, { error: "Title is required." });
    }

    const now = new Date();
    const nowLabel = "Just now";
    const createdAt = now.toISOString();
    const topic = {
      id: `topic-${Date.now()}`,
      title,
      category: category || "General",
      repliesCount: text ? 1 : 0,
      lastUpdated: nowLabel,
      createdAt
    };

    const postId = text ? `post-${Date.now()}` : null;
    const postTime = now.toLocaleString("en-GB");

    const createTopic = db.transaction(() => {
      insertTopic.run(topic);
      if (text && postId) {
        insertTopicPost.run({
          id: postId,
          topicId: topic.id,
          author: "You",
          time: postTime,
          text,
          createdAt
        });
      }
    });

    createTopic();

    const createdTopic = selectTopic.get(topic.id);
    const posts = selectTopicPosts.all(topic.id);

    return sendJson(res, 201, { ...createdTopic, posts });
  }

  return sendJson(res, 404, { error: "Not found." });
});

server.listen(port, () => {
  console.log(`Pathway Forward API listening on http://localhost:${port}`);
});
