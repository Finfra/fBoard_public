---
title: Gemini CLI Tools for fBoard
description: Gemini CLI Tools for fBoard 문서
date: 2026-03-26
---

This directory contains specialized workflows and skills for **Gemini CLI**, enabling the AI to interact with and control the running fBoard macOS application via its REST API (`http://localhost:3012`).

# Directory Structure

- `skills/`: Contains modular capabilities that extend Gemini CLI.
  - `fboard-controller/`: A Gemini skill package that includes API endpoint references and bash wrapper scripts.
- `workflows/`: Contains Markdown-based guides describing common sequences of actions (e.g., presentation setup).

# Installation Guide

To use these skills with your Gemini CLI installation, follow the steps below:

## 1. Package the Skill
First, you need to package the `fboard-controller` skill into a deployable `.skill` file.
Run the `package_skill.cjs` script provided by the Gemini CLI core (your path may vary based on your Node.js setup):
```bash
node ~/.nvm/versions/node/v22.22.0/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/skills/builtin/skill-creator/scripts/package_skill.cjs _public/agents/gemini/skills/fboard-controller
```
*(This will generate an `fboard-controller.skill` file in the same folder)*

## 2. Install the Skill
Install the packaged skill into your workspace or user scope:

**For Workspace (Current Project) Scope:**
```bash
gemini skills install _public/agents/gemini/skills/fboard-controller.skill --scope workspace
```

**For Global (User) Scope:**
```bash
gemini skills install _public/agents/gemini/skills/fboard-controller.skill --scope user
```

## 3. Reload Skills
After installation, you **must** reload your Gemini CLI skills. If you are in an interactive session, type:
```
/skills reload
```
To verify the installation, type:
```
/skills list
```
You should now see `fboard-controller` listed.

# Usage Example

Once the skill is active and fBoard is running, you can ask Gemini to manipulate the app directly:
- *"Gemini, make the fBoard window floating and center it."*
- *"Set the fBoard background to a red color."*
- *"Execute the fBoard presentation setup workflow."*