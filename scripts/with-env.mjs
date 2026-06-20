#!/usr/bin/env node
// Loads KEY=VALUE pairs from a given env file and runs the rest of the
// argv as a child process with those vars merged into its environment.
//
// Usage: node scripts/with-env.mjs <envFile> <command> [...args]
//
// We don't use Node's built-in `--env-file` flag here because Next.js
// forwards Node CLI flags to its child dev-server process via
// NODE_OPTIONS, and `--env-file` is explicitly disallowed in
// NODE_OPTIONS, which crashes `next dev`. Setting the vars on the
// spawned child's env object instead sidesteps that restriction.

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const [envFile, command, ...args] = process.argv.slice(2);

if (!envFile || !command) {
  console.error("Usage: node scripts/with-env.mjs <envFile> <command> [...args]");
  process.exit(1);
}

if (!existsSync(envFile)) {
  console.error(`Env file not found: ${envFile}`);
  process.exit(1);
}

const env = { ...process.env };

for (const rawLine of readFileSync(envFile, "utf-8").split("\n")) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;

  const eqIndex = line.indexOf("=");
  if (eqIndex === -1) continue;

  const key = line.slice(0, eqIndex).trim();
  let value = line.slice(eqIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  env[key] = value;
}

const child = spawn(command, args, { stdio: "inherit", env, shell: process.platform === "win32" });

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
