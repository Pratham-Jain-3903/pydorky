#!/usr/bin/env node

// Entry point that preserves legacy CLI behavior while we layer in a new
// command-based CLI. For now, everything routes to the legacy implementation
// to maintain backward compatibility.

const { run: runLegacy } = require('./legacy');

// Detect legacy-style invocations (flags like --init/--push/etc.)
const rawArgs = process.argv.slice(2);
const isLegacyInvocation = rawArgs.length === 0 || rawArgs.some(arg => arg.startsWith('--'));

if (isLegacyInvocation) {
  runLegacy(rawArgs);
} else {
  // Placeholder for future command-based CLI; keep legacy behavior for now.
  runLegacy(rawArgs);
}

