# Crossmint snippets

Minimal, copy-pastable examples that show **Crossmint integration patterns** clearly.

This repo is intentionally not “full apps” or production reference. Each snippet is:
- Small enough to read end-to-end
- Focused on one workflow
- Opinionated only where it improves clarity

For complete, production-oriented starters, use the official quickstarts: `https://crossmint.com/quickstarts`.

## What you’ll find here

- **One snippet per folder** (a small app or a single runnable example)
- **A short README per snippet** describing what it demonstrates and how to run it
- **Code that’s easy to lift** into your own project

## Contributing / adding a snippet

When you add a new snippet, please include:
- A folder name that matches the workflow (e.g. `headless-checkout-memecoin/`)
- A short `README.md` inside the snippet folder with:
  - **What it does**
  - **Prereqs**
  - **Setup** (env vars)
  - **Run** (commands)
  - **Test** (what to click / expected outcome)
- Keep the example minimal; prefer linking out over embedding large reference sections

### What makes a good snippet

- Everything needed to run is in the snippet folder.
- Demonstrates one workflow end-to-end and runs in minutes.
- Uses minimal files and dependencies and is easy to copy elsewhere.
- Does not include `node_modules/`, build output (e.g. `.next/`), or `.env*`.
- Documents required env vars/IDs and fails loudly with helpful messages.
