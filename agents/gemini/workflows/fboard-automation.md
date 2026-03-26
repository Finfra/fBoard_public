---
title: fBoard Automation Workflow
description: fBoard Automation Workflow 문서
date: 2026-03-26
---

This workflow guides the AI on how to interact with the fBoard API to accomplish common sequences of actions. Use this workflow when automating the fBoard presentation setup or managing whiteboard scenarios.

# 1. Presentation Setup Workflow
When instructed to "prepare for presentation", execute the following steps:
1. **Reset background**: Call `DELETE /api/background/image` or use the `bg-image-remove` script to clear any background image.
2. **Set theme color**: Set the background to an unobtrusive color (e.g., `#F5F5F5` with opacity `1.0`).
3. **Move window to center**: Ensure the fBoard window is prominently placed by calling `/api/window/center`.
4. **Set window level**: Set the window level to `floating` to ensure it stays on top of other content.

# 2. Drawing Board Mode
When instructed to "set up for drawing":
1. Check the app status (`GET /api/status`).
2. Toggle fullscreen mode (`POST /api/window/fullscreen`) if it's not already in fullscreen.
3. Set the background to dark mode (`#1E1E1E` or pure black `#000000`).

# 3. Preset Management Workflow
When asked to manage presets:
1. List available presets using `GET /api/presets`.
2. Find the ID of the requested preset by matching its `name`.
3. Apply the preset using `POST /api/presets/apply` passing the specific ID.

By following these workflows, you can provide a seamless remote control experience for the fBoard application.