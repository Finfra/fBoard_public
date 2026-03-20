---
name: fboard
description: Control the fBoard whiteboard app (window, background, presets) via the fBoard REST API. Use when the user asks to adjust whiteboard settings, move the window, change background colors or apply presets.
---

# fBoard Whiteboard Control

Control the fBoard whiteboard app (window, background, presets) via the fBoard REST API.

## Prerequisites

The fBoard REST API server (`http://localhost:3012`) must be running:

| Server           | How to Run                                       |
| ---------------- | ------------------------------------------------ |
| macOS Native App | Launch fBoard.app (enable REST API in Settings)  |

## Execution Steps

1. **Check Server**: Verify the fBoard server is running.
   Use the `run_shell_command` tool to check if the server is responsive:
   ```bash
   curl -s --connect-timeout 3 -o /dev/null -w "%{http_code}" http://localhost:3012/
   ```
   If the server is not responding, inform the user with the launch command:
   > "fBoard REST API server is not running. Launch the app with:"
   > ```bash
   > open -a "fBoard"
   > ```
   > "Then enable REST API in Settings. Let me know when ready."

   Do NOT attempt to start the server automatically. Wait for user confirmation before proceeding.

2. **Execute Command**: Run the requested operation via the REST API using `run_shell_command` with `curl`.

3. **Report**: Inform the user of the result. Keep it brief.

## API Reference

### Window

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/window`             | Get window state         |
| POST   | `/api/window/level`       | Set window level         |
| POST   | `/api/window/frame`       | Set window frame         |
| POST   | `/api/window/center`      | Center window on screen  |
| POST   | `/api/window/reset`       | Reset to default size    |
| POST   | `/api/window/fullscreen`  | Toggle fullscreen        |
| POST   | `/api/window/move-screen` | Move to another screen   |

### Background

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/api/background`          | Get background state  |
| POST   | `/api/background/color`    | Set background color  |
| POST   | `/api/background/image`    | Set background image  |
| DELETE | `/api/background/image`    | Remove background image |
| POST   | `/api/background/fill-mode`| Set image fill mode   |

### Presets

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/presets`        | List all presets   |
| POST   | `/api/presets`        | Create new preset  |
| POST   | `/api/presets/apply`  | Apply a preset     |
| DELETE | `/api/presets/{id}`   | Delete a preset    |

## Usage Examples (curl)

### Background Color
```bash
# Set background color (hex)
curl -s -X POST http://localhost:3012/api/background/color \
  -H 'Content-Type: application/json' \
  -d '{"color":"#FF5733"}'
```

### Window Control
```bash
# Center window
curl -s -X POST http://localhost:3012/api/window/center

# Set window level (normal / floating / background)
curl -s -X POST http://localhost:3012/api/window/level \
  -H 'Content-Type: application/json' \
  -d '{"level":"floating"}'
```

### Presets
```bash
# List presets
curl -s http://localhost:3012/api/presets

# Apply preset by ID
curl -s -X POST http://localhost:3012/api/presets/apply \
  -H 'Content-Type: application/json' \
  -d '{"id":"00000000-0000-0000-0000-000000000001"}'
```