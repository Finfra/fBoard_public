---
name: fboard-controller
description: Controls the fBoard application via its REST API (http://localhost:3012). Use when instructed to interact with fBoard, manage whiteboard windows, presets, background colors, images, or screens.
---
# fBoard Controller

This skill enables Gemini CLI to control the running fBoard macOS application via its REST API (`http://localhost:3012`).

## Available Endpoints

The fBoard application provides multiple endpoints to control window positioning, background styles, and presets. 

When you need to perform an action on the fBoard application, you can use the provided helper script `scripts/fboard-api.sh` or execute `curl` commands directly against the API.

### Helper Script Usage

The helper script is located at `scripts/fboard-api.sh`. Execute it using bash.

* **Check App Status**: `bash scripts/fboard-api.sh status`
* **Set Background Color**: `bash scripts/fboard-api.sh bg-color "#FF0000" 0.5` (Color must be HEX, Opacity 0.0-1.0)
* **Remove Background Image (Reset to Color)**: `bash scripts/fboard-api.sh bg-image-remove`
* **Center Window**: `bash scripts/fboard-api.sh window-center`
* **Set Window Level**: `bash scripts/fboard-api.sh window-level floating` (Options: normal, floating, background)
* **Toggle Fullscreen**: `bash scripts/fboard-api.sh window-fullscreen`
* **List Presets**: `bash scripts/fboard-api.sh presets`
* **Apply Preset**: `bash scripts/fboard-api.sh preset-apply <id>`

### Direct CURL Usage

For more complex actions, construct `curl` requests manually:

* **Move Window Frame**:
  ```bash
  curl -s -X POST http://localhost:3012/api/window/frame -H "Content-Type: application/json" -d '{"x": 100, "y": 100, "width": 800, "height": 600}'
  ```

* **Set Background Image**:
  ```bash
  curl -s -F "file=@/absolute/path/to/image.jpg" -F "fillMode=fill" http://localhost:3012/api/background/image
  ```

Always verify the output of your API calls to ensure they succeeded. If the server is unresponsive, fBoard might not be running.