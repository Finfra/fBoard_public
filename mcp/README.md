---
title: fBoard MCP Server
description: fBoard MCP Server 문서
date: 2026-03-26
---

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server that exposes the fBoard REST API as tools.
Control your fBoard whiteboard app directly from AI agents such as Claude Code and Claude Desktop.

# Prerequisites

The fBoard app must be running with REST API enabled:

| Server             | How to Run                                      |
| ------------------ | ----------------------------------------------- |
| macOS Native App   | Launch fBoard.app (enable REST API in Settings > Advanced) |

Default server address: `http://localhost:3012`

---

# Installation

## Option 1: Global Install (Recommended)

```bash
npm install -g fboard-mcp
```

[![npm](https://img.shields.io/npm/v/fboard-mcp)](https://www.npmjs.com/package/fboard-mcp)

## Option 2: npx (No Installation Required)

Run directly via `npx` in your MCP configuration.

## Option 3: From Source

```bash
git clone https://github.com/nowage/fBoard.git
cd fBoard_public/mcp
npm install
```

---

# Configuration

## Claude Code

* Add to `~/.claude/settings.json` or project `.claude/settings.json`:
  - For Claude Desktop, add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "fboard": {
      "command": "npx",
      "args": ["-y", "fboard-mcp"]
    }
  }
}
```

* If running from source:
```json
  "mcpServers": {
    "fboard": {
      "command": "node",
      "args": [
        "{PROJECT_ROOT-type-or-paste-it}/mcp/index.js"
      ]
    }
  }
```

* To change the server address:
```json
{
  "mcpServers": {
    "fboard": {
      "command": "npx",
      "args": ["-y", "fboard-mcp", "--server=http://192.168.0.10:3012"]
    }
  }
}
```

## After Global Install

```json
{
  "mcpServers": {
    "fboard": {
      "command": "fboard-mcp"
    }
  }
}
```

---

# Tools

## 1. `health_check`

Check the fBoard server status.

**Parameters**: None

**Response example**:
```json
{
  "status": "ok",
  "app": "fBoard",
  "port": 3012
}
```

---

## 2. `get_status`

Get the full application status (window, background, presets).

**Parameters**: None

---

## 3. `get_window`

Get the current window state (position, size, level, screen).

**Parameters**: None

**Response example**:
```json
{
  "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
  "level": "normal",
  "screen": { "index": 0, "name": "Built-in Display" }
}
```

---

## 4. `set_window_level`

Set the window level.

**Parameters**:

| Name    | Type   | Required | Description                                         |
| ------- | ------ | -------- | --------------------------------------------------- |
| `level` | enum   | Yes      | `"normal"`, `"floating"` (always on top), `"background"` |

---

## 5. `set_window_frame`

Set the window position and/or size.

**Parameters**:

| Name     | Type   | Required | Description       |
| -------- | ------ | -------- | ----------------- |
| `x`      | number | No       | X coordinate      |
| `y`      | number | No       | Y coordinate      |
| `width`  | number | No       | Window width      |
| `height` | number | No       | Window height     |

**Usage example** (ask Claude):
```
Set the fBoard window to 800x600 at position (100, 100)
```

---

## 6. `center_window`

Center the window on the current screen.

**Parameters**: None

---

## 7. `reset_window`

Reset the window to its default size.

**Parameters**: None

---

## 8. `toggle_fullscreen`

Toggle fullscreen mode.

**Parameters**: None

---

## 9. `move_to_screen`

Move the window to a specific screen (monitor).

**Parameters**:

| Name          | Type    | Required | Description                    |
| ------------- | ------- | -------- | ------------------------------ |
| `screenIndex` | integer | Yes      | Target screen index (0-based)  |

---

## 10. `get_background`

Get the current background state (color, image, fill mode).

**Parameters**: None

**Response example**:
```json
{
  "type": "color",
  "color": "#FFFFFF",
  "opacity": 1.0,
  "imagePath": null,
  "fillMode": "fill"
}
```

---

## 11. `set_background_color`

Set the background color.

**Parameters**:

| Name      | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `color`   | string | Yes      | Hex color code (e.g., `"#FF0000"`)   |
| `opacity` | number | No       | Opacity from 0.0 to 1.0 (default: 1.0) |

**Usage example** (ask Claude):
```
Set the fBoard background to light blue (#87CEEB) with 80% opacity
```

---

## 12. `set_background_image`

Set a background image. The file is read locally and uploaded via multipart/form-data to bypass App Sandbox restrictions.

**Parameters**:

| Name       | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `path`     | string | Yes      | Local image file path                    |
| `fillMode` | enum   | No       | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

---

## 13. `remove_background_image`

Remove the background image.

**Parameters**: None

---

## 14. `set_fill_mode`

Change the image fill mode.

**Parameters**:

| Name       | Type | Required | Description                              |
| ---------- | ---- | -------- | ---------------------------------------- |
| `fillMode` | enum | Yes      | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

---

## 15. `get_presets`

List all saved presets.

**Parameters**: None

**Response example**:
```json
{
  "presets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Presentation Mode",
      "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
      "windowLevel": "floating",
      "isBuiltIn": false
    }
  ]
}
```

---

## 16. `save_preset`

Save the current window state as a preset.

**Parameters**:

| Name   | Type   | Required | Description  |
| ------ | ------ | -------- | ------------ |
| `name` | string | Yes      | Preset name  |

---

## 17. `apply_preset`

Apply a saved preset.

**Parameters**:

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ----------------- |
| `id` | string | Yes      | Preset ID (UUID)  |

---

## 18. `delete_preset`

Delete a preset.

**Parameters**:

| Name | Type   | Required | Description       |
| ---- | ------ | -------- | ----------------- |
| `id` | string | Yes      | Preset ID (UUID)  |

---

## 19. `get_screens`

List all connected screens (monitors).

**Parameters**: None

**Response example**:
```json
{
  "screens": [
    {
      "index": 0,
      "name": "Built-in Retina Display",
      "frame": { "x": 0, "y": 0, "width": 2560, "height": 1600 },
      "isMain": true
    }
  ]
}
```

---

# Debugging

## Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx fboard-mcp
```

Opens the Inspector UI in your browser to test each tool interactively.

## Verify Server Connection

```bash
# Check if the fBoard REST API server is running
curl http://localhost:3012/
```

---

# Publishing to npm

```bash
cd mcp
npm publish
```

---

# Architecture

```
Claude Code / Claude Desktop
    |
    | MCP (stdio)
    v
fboard-mcp (this server)
    |
    | HTTP (REST API)
    v
fBoard Server (localhost:3012)
    └── macOS Native App (Swift/AppKit)
```

---

# License

MIT
