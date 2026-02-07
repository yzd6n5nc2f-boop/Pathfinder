import os from "os";
import { spawn } from "child_process";

const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  const preferred = ["en0", "en1", "Wi-Fi", "Ethernet"];

  for (const name of preferred) {
    const entries = interfaces[name] || [];
    const found = entries.find(
      (entry) => entry && entry.family === "IPv4" && !entry.internal
    );
    if (found?.address) {
      return found.address;
    }
  }

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry && entry.family === "IPv4" && !entry.internal) {
        return entry.address;
      }
    }
  }

  return null;
};

const prefixStream = (stream, label) => {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    const text = String(chunk);
    const lines = text.split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (line.length === 0 && index === lines.length - 1) {
        continue;
      }
      process.stdout.write(`[${label}] ${line}\n`);
    }
  });
};

const run = () => {
  const ip = getLocalIp();

  console.log("Starting backend and frontend for iPhone testing...");
  if (ip) {
    console.log(`Open this on your iPhone (same Wi-Fi): http://${ip}:5173`);
  } else {
    console.log("Could not auto-detect local IP. Use your Mac local IPv4 address on port 5173.");
  }
  console.log("Press Ctrl+C to stop both servers.\n");

  const backend = spawn("npm", ["run", "dev:api"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env
  });

  const frontend = spawn("npm", ["run", "dev"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env
  });

  prefixStream(backend.stdout, "api");
  prefixStream(backend.stderr, "api");
  prefixStream(frontend.stdout, "web");
  prefixStream(frontend.stderr, "web");

  let shuttingDown = false;

  const shutdown = (code = 0) => {
    if (shuttingDown) {
      return;
    }
    shuttingDown = true;

    backend.kill("SIGINT");
    frontend.kill("SIGINT");

    setTimeout(() => {
      backend.kill("SIGKILL");
      frontend.kill("SIGKILL");
      process.exit(code);
    }, 1200);
  };

  backend.on("exit", (code) => {
    if (!shuttingDown) {
      console.error(`Backend exited with code ${code ?? 0}.`);
      shutdown(code ?? 1);
    }
  });

  frontend.on("exit", (code) => {
    if (!shuttingDown) {
      console.error(`Frontend exited with code ${code ?? 0}.`);
      shutdown(code ?? 1);
    }
  });

  process.on("SIGINT", () => shutdown(0));
  process.on("SIGTERM", () => shutdown(0));
};

run();
