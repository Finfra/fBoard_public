#!/bin/bash
# fBoard API Helper Wrapper

API_URL="http://localhost:3012/api"

cmd=$1
shift

case "$cmd" in
  status)
    curl -s "$API_URL/status"
    ;;
  bg-color)
    color=$1
    opacity=${2:-1.0}
    curl -s -X POST "$API_URL/background/color" -H "Content-Type: application/json" -d "{\"color\":\"$color\", \"opacity\":$opacity}"
    ;;
  bg-image)
    filepath=$1
    fillmode=${2:-fill}
    curl -s -F "file=@$filepath" -F "fillMode=$fillmode" "$API_URL/background/image"
    ;;
  bg-image-remove)
    curl -s -X DELETE "$API_URL/background/image"
    ;;
  window-center)
    curl -s -X POST "$API_URL/window/center"
    ;;
  window-level)
    level=$1
    curl -s -X POST "$API_URL/window/level" -H "Content-Type: application/json" -d "{\"level\":\"$level\"}"
    ;;
  window-fullscreen)
    curl -s -X POST "$API_URL/window/fullscreen"
    ;;
  presets)
    curl -s "$API_URL/presets"
    ;;
  preset-apply)
    id=$1
    curl -s -X POST "$API_URL/presets/apply" -H "Content-Type: application/json" -d "{\"id\":\"$id\"}"
    ;;
  *)
    echo "Usage: $0 {status|bg-color|bg-image|bg-image-remove|window-center|window-level|window-fullscreen|presets|preset-apply} [args]"
    exit 1
    ;;
esac
echo "" # Add newline for cleaner output