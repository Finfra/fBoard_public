# fBoard Gemini CLI Plugin

A Gemini CLI plugin (skill and workflow) that controls the fBoard whiteboard app via REST API.
After installation, ask Gemini to manage the window, background, and presets.

---

## Plugin Structure

```
skills/
└── fboard/
    └── SKILL.md         # Whiteboard control skill
workflows/
└── fboard-workflow.md   # Example workflow for fboard tasks
```

---

## Skills

### `fboard` — Whiteboard Control

Controls the fBoard whiteboard app (window position/size, background color/image, presets) via the REST API.

**Usage:**
Ask Gemini CLI to:
- "Change fBoard background color to #FF5733"
- "Apply the fullscreen preset in fBoard"
- "Center the fBoard window"
- "Set fBoard to floating level"

**Features:**
- Guides user to launch fBoard.app if server is not running
- Background color and image management
- Window position, size, and level control
- Preset save/apply/delete
- Multi-screen support

---

## Installation

### Method 1: Package and Install via Gemini CLI (Recommended)

```bash
# Package the skill
node ~/.nvm/versions/node/$(node -v)/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/skills/builtin/skill-creator/scripts/package_skill.cjs _public/agents/gemini/skills/fboard

# Install the skill locally
gemini skills install fboard.skill --scope workspace
```
> After installation, you must run `/skills reload` in an interactive Gemini CLI session.

### Method 2: Manual Link

You can link or copy the `fboard` folder into your `.gemini/skills/` directory.

```bash
mkdir -p .gemini/skills
cp -r _public/agents/gemini/skills/fboard .gemini/skills/
```

---

## Prerequisites

The fBoard REST API server must be running:

| Server           | How to Run                                       |
| ---------------- | ------------------------------------------------ |
| macOS Native App | Launch fBoard.app (enable REST API in Settings)  |

> If the server is not running, Gemini will prompt you to launch fBoard.app.

---

## License

MIT
