---
title: fBoard REST API Documentation
description: fBoard REST API Documentation 문서
date: 2026-03-26
---

# Overview

fBoard provides a REST API for remotely controlling the macOS whiteboard application.

| Server           | Tech Stack                             | Default Port |
| ---------------- | -------------------------------------- | ------------ |
| macOS native app | Swift / Network.framework (NWListener) | 3012         |

> OpenAPI 3.1 spec: [openapi.yaml](./openapi.yaml)

---

# Security

* The API server is **disabled by default** and must be explicitly enabled in settings.
* By default, only **localhost (127.0.0.1)** connections are allowed.
* No authentication mechanism is currently implemented. Use only within trusted local network environments.

---

# Endpoints

## 1. Health Check

```
GET /
```

**Response**:
```json
{
  "status": "ok",
  "app": "fBoard",
  "version": "1.0.0",
  "port": 3012
}
```

---

## 2. Get Full Application Status

```
GET /api/status
```

**Response** (200):
```json
{
  "window": {
    "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
    "level": "normal",
    "isFullScreen": false,
    "screenIndex": 0,
    "screenName": "Built-in Retina Display"
  },
  "background": {
    "type": "color",
    "color": "#FFFFFF",
    "opacity": 1.0,
    "imagePath": null,
    "fillMode": "fill"
  },
  "server": {
    "port": 3012,
    "uptime": 3600
  }
}
```

---

## 3. Get Window State

```
GET /api/window
```

**Response** (200):
```json
{
  "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
  "level": "normal",
  "isFullScreen": false,
  "screenIndex": 0,
  "screenName": "Built-in Retina Display"
}
```

---

## 4. Set Window Level

```
POST /api/window/level
Content-Type: application/json
```

### Request Parameters

| Field   | Type   | Required | Description                                     |
| ------- | ------ | -------- | ----------------------------------------------- |
| `level` | string | Yes      | One of `"normal"`, `"floating"`, `"background"` |

### Request Example

```json
{
  "level": "floating"
}
```

### Response

**Success (200)**:
```json
{
  "success": true,
  "level": "floating"
}
```

**Error (400)**: Invalid value
```json
{
  "error": "Invalid level value"
}
```

---

## 5. Set Window Position and Size

```
POST /api/window/frame
Content-Type: application/json
```

### Request Parameters

| Field    | Type   | Required | Description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| `x`      | number | No       | X coordinate (keeps current value if omitted)  |
| `y`      | number | No       | Y coordinate (keeps current value if omitted)  |
| `width`  | number | No       | Width (keeps current value if omitted)         |
| `height` | number | No       | Height (keeps current value if omitted)        |

### Request Example

```json
{
  "x": 100,
  "y": 100,
  "width": 800,
  "height": 600
}
```

### Response (200)

```json
{
  "success": true,
  "frame": { "x": 100, "y": 100, "width": 800, "height": 600 }
}
```

---

## 6. Center Window on Current Screen

```
POST /api/window/center
```

**Response (200)**:
```json
{
  "success": true,
  "frame": { "x": 560, "y": 240, "width": 800, "height": 600 }
}
```

---

## 7. Reset Window to Default Size

```
POST /api/window/reset
```

**Response (200)**:
```json
{
  "success": true,
  "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
}
```

---

## 8. Toggle Fullscreen

```
POST /api/window/fullscreen
```

**Response (200)**:
```json
{
  "success": true,
  "isFullScreen": true
}
```

---

## 9. Move Window to Another Screen

```
POST /api/window/move-screen
Content-Type: application/json
```

### Request Parameters

| Field         | Type    | Required | Description                   |
| ------------- | ------- | -------- | ----------------------------- |
| `screenIndex` | integer | Yes      | Target screen index (0-based) |

### Request Example

```json
{
  "screenIndex": 1
}
```

### Response

**Success (200)**:
```json
{
  "success": true,
  "screenIndex": 1,
  "screenName": "DELL U2723QE"
}
```

**Error (400)**: Invalid index
```json
{
  "error": "Invalid screen index"
}
```

---

## 10. Get Background State

```
GET /api/background
```

**Response (200)**:
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

## 11. Set Background Color

```
POST /api/background/color
Content-Type: application/json
```

### Request Parameters

| Field     | Type   | Required | Default | Description                        |
| --------- | ------ | -------- | ------- | ---------------------------------- |
| `color`   | string | Yes      | —       | HEX color code (e.g., `"#FF5733"`) |
| `opacity` | number | No       | `1.0`   | Opacity value (0.0 ~ 1.0)         |

### Request Example

```json
{
  "color": "#FF5733",
  "opacity": 0.8
}
```

### Response (200)

```json
{
  "success": true,
  "color": "#FF5733",
  "opacity": 0.8
}
```

---

## 12. Set Background Image

```
POST /api/background/image
Content-Type: multipart/form-data
```

Upload an image file directly via multipart form data. This bypasses App Sandbox file access restrictions.

### Request Parameters (multipart/form-data)

| Field      | Type   | Required | Default  | Description                              |
| ---------- | ------ | -------- | -------- | ---------------------------------------- |
| `file`     | file   | Yes      | —        | Image file to upload                     |
| `fillMode` | string | No       | `"fill"` | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

### Request Example

```bash
curl -F "file=@/path/to/wallpaper.png" \
     -F "fillMode=fit" \
     http://localhost:3012/api/background/image
```

### Response

**Success (200)**:
```json
{
  "success": true,
  "imagePath": "/path/in/app/container/wallpaper.png",
  "fillMode": "fit"
}
```

**Error (400)**: No file uploaded
```json
{
  "error": "No file part in multipart data"
}
```

---

## 13. Remove Background Image

```
DELETE /api/background/image
```

**Response (200)**:
```json
{
  "success": true,
  "type": "color"
}
```

---

## 14. Change Image Fill Mode

```
POST /api/background/fill-mode
Content-Type: application/json
```

### Request Parameters

| Field      | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `fillMode` | string | Yes      | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

### Response (200)

```json
{
  "success": true,
  "fillMode": "fit"
}
```

---

## 15. Set Gradient Background

```
POST /api/background/gradient
Content-Type: application/json
```

### Request Parameters

| Field        | Type   | Required | Default        | Description                                                             |
| ------------ | ------ | -------- | -------------- | ----------------------------------------------------------------------- |
| `startColor` | string | Yes      | —              | Gradient start HEX color (e.g., `"#FF5733"`)                           |
| `endColor`   | string | Yes      | —              | Gradient end HEX color (e.g., `"#3366FF"`)                             |
| `direction`  | string | No       | `"topToBottom"` | `"topToBottom"`, `"leftToRight"`, `"topLeftToBottomRight"`, `"topRightToBottomLeft"` |

### Request Example

```json
{
  "startColor": "#FF5733",
  "endColor": "#3366FF",
  "direction": "topToBottom"
}
```

### Response (200)

```json
{
  "success": true,
  "startColor": "#FF5733",
  "endColor": "#3366FF",
  "direction": "topToBottom"
}
```

---

## 16. List All Presets

```
GET /api/presets
```

**Response (200)**:
```json
{
  "presets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Default Layout",
      "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
      "windowLevel": "normal",
      "isBuiltIn": true
    }
  ],
  "count": 1
}
```

---

## 17. Save Preset

```
POST /api/presets
Content-Type: application/json
```

### Request Parameters

| Field  | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| `name` | string | Yes      | Preset name |

Automatically captures the current window state (position, size, level) and saves it as a preset.

### Request Example

```json
{
  "name": "Presentation Mode"
}
```

### Response

**Success (201)**:
```json
{
  "success": true,
  "preset": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Presentation Mode",
    "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
    "windowLevel": "floating",
    "isBuiltIn": false
  }
}
```

**Error (400)**: Missing name or maximum count (10) exceeded
```json
{
  "error": "Preset name is required"
}
```

---

## 18. Apply Preset

```
POST /api/presets/apply
Content-Type: application/json
```

### Request Parameters

| Field | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| `id`  | string | Yes      | Preset UUID |

### Request Example

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Response

**Success (200)**:
```json
{
  "success": true,
  "appliedPreset": "Default Layout"
}
```

**Error (404)**: Preset not found
```json
{
  "error": "Preset not found"
}
```

---

## 19. Delete Preset

```
DELETE /api/presets/{id}
```

### Path Parameters

| Field | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| `id`  | string | Yes      | Preset UUID |

### Response

**Success (200)**:
```json
{
  "success": true,
  "deletedPreset": "Presentation Mode"
}
```

**Errors**:

| Status Code | Cause                                 | Response Example                             |
| ----------- | ------------------------------------- | -------------------------------------------- |
| 403         | Attempted to delete a built-in preset | `{"error": "Cannot delete built-in preset"}` |
| 404         | Preset does not exist                 | `{"error": "Preset not found"}`              |

---

## 20. List Connected Screens

```
GET /api/screens
```

**Response (200)**:
```json
{
  "screens": [
    {
      "index": 0,
      "name": "Built-in Retina Display",
      "frame": { "x": 0, "y": 0, "width": 1728, "height": 1117 },
      "isMain": true
    },
    {
      "index": 1,
      "name": "DELL U2723QE",
      "frame": { "x": 1728, "y": 0, "width": 2560, "height": 1440 },
      "isMain": false
    }
  ],
  "count": 2
}
```

---

# Usage Examples

## cURL

```bash
# Health check
curl http://localhost:3012/

# Get window state
curl http://localhost:3012/api/window

# Set window level (always on top)
curl -X POST http://localhost:3012/api/window/level \
  -H "Content-Type: application/json" \
  -d '{"level": "floating"}'

# Set window position and size
curl -X POST http://localhost:3012/api/window/frame \
  -H "Content-Type: application/json" \
  -d '{"x": 100, "y": 100, "width": 800, "height": 600}'

# Center window
curl -X POST http://localhost:3012/api/window/center

# Change background color
curl -X POST http://localhost:3012/api/background/color \
  -H "Content-Type: application/json" \
  -d '{"color": "#FF5733", "opacity": 0.8}'

# Set background image
curl -F "file=@/Users/Shared/wallpaper.png" \
     -F "fillMode=fit" \
     http://localhost:3012/api/background/image

# Set gradient background
curl -X POST http://localhost:3012/api/background/gradient \
  -H "Content-Type: application/json" \
  -d '{"startColor": "#FF5733", "endColor": "#3366FF", "direction": "topToBottom"}'

# Save preset
curl -X POST http://localhost:3012/api/presets \
  -H "Content-Type: application/json" \
  -d '{"name": "Presentation Mode"}'

# List presets
curl http://localhost:3012/api/presets

# Apply preset
curl -X POST http://localhost:3012/api/presets/apply \
  -H "Content-Type: application/json" \
  -d '{"id": "UUID-HERE"}'

# Delete preset
curl -X DELETE http://localhost:3012/api/presets/UUID-HERE

# List connected screens
curl http://localhost:3012/api/screens
```

## Python

```python
import requests

BASE = "http://localhost:3012"

# Health check
r = requests.get(f"{BASE}/")
print(r.json())

# Change background color
r = requests.post(f"{BASE}/api/background/color",
    json={"color": "#FF5733", "opacity": 0.8})

# Set gradient background
r = requests.post(f"{BASE}/api/background/gradient",
    json={"startColor": "#FF5733", "endColor": "#3366FF", "direction": "topToBottom"})

# Save preset
r = requests.post(f"{BASE}/api/presets",
    json={"name": "Presentation Mode"})

# Apply preset
r = requests.post(f"{BASE}/api/presets/apply",
    json={"id": "UUID-HERE"})
```

---

# Test

```bash
# Run automated tests (20 items)
bash api/test-api.sh

# Remote server test
bash api/test-api.sh --server=http://192.168.0.10:3012
```

Test items:
1. Health check (GET `/`)
2. Full application status (GET `/api/status`)
3. Window state (GET `/api/window`)
4. Set window level (POST `/api/window/level`)
5. Set window frame (POST `/api/window/frame`)
6. Center window (POST `/api/window/center`)
7. Reset window (POST `/api/window/reset`)
8. Toggle fullscreen (POST `/api/window/fullscreen`)
9. Background state (GET `/api/background`)
10. Set background color (POST `/api/background/color`)
11. Set fill mode (POST `/api/background/fill-mode`)
12. Remove background image (DELETE `/api/background/image`)
13. Set gradient background (POST `/api/background/gradient`)
14. List presets (GET `/api/presets`)
15. Save preset (POST `/api/presets`)
16. Apply preset (POST `/api/presets/apply`)
17. Delete preset (DELETE `/api/presets/{id}`)
18. List screens (GET `/api/screens`)
19. 404 error response
20. 400 invalid parameter error

---

# Error Response Format

All errors are returned in a consistent JSON format:

```json
{
  "error": "Error message"
}
```

| Status Code | Description                                      |
| ----------- | ------------------------------------------------ |
| 400         | Bad request (missing parameters, invalid values) |
| 403         | Forbidden (e.g., deleting a built-in preset)     |
| 404         | Resource not found                               |
