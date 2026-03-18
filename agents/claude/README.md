# fBoard Claude Code Plugin

A Claude Code plugin that controls the fBoard whiteboard app via REST API.
After installation, manage window, background, and presets using slash commands in Claude Code.

---

## Plugin Structure

```
.claude-plugin/
└── plugin.json          # Plugin manifest
skills/
└── fboard/
    └── SKILL.md         # Whiteboard control skill
```

---

## Skills

### `fboard` — Whiteboard Control

Controls the fBoard whiteboard app (window position/size, background color/image, presets) via the REST API.

**Usage:**
```
/fboard:fboard color #FF5733
/fboard:fboard preset fullscreen
/fboard:fboard status
/fboard:fboard window center
/fboard:fboard level floating
```

**Features:**
- Guides user to launch fBoard.app if server is not running
- Background color and image management
- Window position, size, and level control
- Preset save/apply/delete
- Multi-screen support

**API Summary (18 endpoints):**

| Category   | Endpoints                                                       |
| ---------- | --------------------------------------------------------------- |
| Server     | `GET /`, `GET /api/status`                                      |
| Window     | `GET/POST /api/window/*` (level, frame, center, reset, fullscreen, move-screen) |
| Background | `GET/POST/DELETE /api/background/*` (color, image, fill-mode)   |
| Presets    | `GET/POST/DELETE /api/presets/*` (list, create, apply, delete)  |
| Screens    | `GET /api/screens`                                              |

---

## Installation

### Option 1: Plugin Install (Recommended)

```bash
/plugin marketplace add nowage/fBoard
/plugin install fboard
```

### Option 2: Manual Copy

Copy the plugin directory to your project:

```bash
# From fBoard project root
cp -r _public/agents/claude/.claude-plugin .claude-plugin
cp -r _public/agents/claude/skills .claude/skills
```

### Option 3: Symbolic Link

```bash
ln -sf _public/agents/claude/skills/fboard .claude/skills/fboard
```

---

## Prerequisites

The fBoard REST API server must be running:

| Server           | How to Run                                       |
| ---------------- | ------------------------------------------------ |
| macOS Native App | Launch fBoard.app (enable REST API in Settings)  |

> If the server is not running, the skill will prompt the user to launch fBoard.app.

---

## Related Extensions

| Extension                  | Location       | Description                                            |
| -------------------------- | -------------- | ------------------------------------------------------ |
| [MCP Server](../../mcp/)  | `_public/mcp/` | Whiteboard control via MCP protocol (Claude Desktop compatible) |

---

## License

MIT
