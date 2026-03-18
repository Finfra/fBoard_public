#!/bin/bash
#
# Usage:
#   bash test-api.sh [--server=<url>]
#
# Arguments:
#   --server=<url> : (optional) Server URL (default: http://localhost:3012)
#
# Examples:
#   bash test-api.sh
#   bash test-api.sh --server=http://192.168.0.10:3012

SERVER="http://localhost:3012"

for arg in "$@"; do
  case $arg in
    --server=*) SERVER="${arg#*=}" ;;
  esac
done

PASS=0
FAIL=0
TOTAL=0

run_test() {
  local name="$1"
  local expected_code="$2"
  shift 2
  local cmd=("$@")

  TOTAL=$((TOTAL + 1))
  local response
  response=$(curl -s -o /dev/null -w "%{http_code}" "${cmd[@]}")

  if [ "$response" = "$expected_code" ]; then
    echo "  ✅ #${TOTAL} ${name} (HTTP ${response})"
    PASS=$((PASS + 1))
  else
    echo "  ❌ #${TOTAL} ${name} (expected ${expected_code}, got ${response})"
    FAIL=$((FAIL + 1))
  fi
}

run_test_body() {
  local name="$1"
  local expected_code="$2"
  local body_check="$3"
  shift 3
  local cmd=("$@")

  TOTAL=$((TOTAL + 1))
  local tmpfile
  tmpfile=$(mktemp)
  local http_code
  http_code=$(curl -s -o "$tmpfile" -w "%{http_code}" "${cmd[@]}")

  if [ "$http_code" != "$expected_code" ]; then
    echo "  ❌ #${TOTAL} ${name} (expected ${expected_code}, got ${http_code})"
    FAIL=$((FAIL + 1))
    rm -f "$tmpfile"
    return
  fi

  if [ -n "$body_check" ]; then
    if grep -q "$body_check" "$tmpfile" 2>/dev/null; then
      echo "  ✅ #${TOTAL} ${name} (HTTP ${http_code}, body OK)"
      PASS=$((PASS + 1))
    else
      echo "  ❌ #${TOTAL} ${name} (HTTP ${http_code}, body check failed: expected '${body_check}')"
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  ✅ #${TOTAL} ${name} (HTTP ${http_code})"
    PASS=$((PASS + 1))
  fi
  rm -f "$tmpfile"
}

echo ""
echo "=== fBoard REST API Test ==="
echo "Server: ${SERVER}"
echo ""

# --- Server ---
echo "[Server]"
run_test_body "GET / - Health check" "200" '"status"' \
  "$SERVER/"

run_test_body "GET /api/status - Full status" "200" '"window"' \
  "$SERVER/api/status"

# --- Window ---
echo ""
echo "[Window]"
run_test_body "GET /api/window - Window state" "200" '"frame"' \
  "$SERVER/api/window"

run_test_body "POST /api/window/level - Set level" "200" '"success"' \
  -X POST "$SERVER/api/window/level" \
  -H "Content-Type: application/json" \
  -d '{"level": "normal"}'

run_test_body "POST /api/window/frame - Set frame" "200" '"frame"' \
  -X POST "$SERVER/api/window/frame" \
  -H "Content-Type: application/json" \
  -d '{"width": 800, "height": 600}'

run_test_body "POST /api/window/center - Center window" "200" '"success"' \
  -X POST "$SERVER/api/window/center"

run_test_body "POST /api/window/reset - Reset window" "200" '"success"' \
  -X POST "$SERVER/api/window/reset"

run_test_body "POST /api/window/fullscreen - Toggle fullscreen" "200" '"success"' \
  -X POST "$SERVER/api/window/fullscreen"

# Toggle back
curl -s -o /dev/null -X POST "$SERVER/api/window/fullscreen"

# --- Background ---
echo ""
echo "[Background]"
run_test_body "GET /api/background - Background state" "200" '"type"' \
  "$SERVER/api/background"

run_test_body "POST /api/background/color - Set color" "200" '"success"' \
  -X POST "$SERVER/api/background/color" \
  -H "Content-Type: application/json" \
  -d '{"color": "#FFFFFF", "opacity": 1.0}'

run_test_body "POST /api/background/fill-mode - Set fill mode" "200" '"success"' \
  -X POST "$SERVER/api/background/fill-mode" \
  -H "Content-Type: application/json" \
  -d '{"fillMode": "fill"}'

run_test_body "DELETE /api/background/image - Remove image" "200" '"success"' \
  -X DELETE "$SERVER/api/background/image"

# --- Presets ---
echo ""
echo "[Presets]"
run_test_body "GET /api/presets - List presets" "200" '"presets"' \
  "$SERVER/api/presets"

run_test_body "POST /api/presets - Save preset" "201" '"preset"' \
  -X POST "$SERVER/api/presets" \
  -H "Content-Type: application/json" \
  -d '{"name": "__test_preset__"}'

# Extract test preset ID for apply/delete
TEST_PRESET_ID=$(curl -s "$SERVER/api/presets" | grep -o '"id":"[^"]*"' | while read -r line; do
  id=$(echo "$line" | sed 's/"id":"//;s/"//')
  name=$(curl -s "$SERVER/api/presets" | grep -o "\"id\":\"${id}\"[^}]*\"name\":\"[^\"]*\"" | grep -o '"name":"[^"]*"' | sed 's/"name":"//;s/"//')
  if [ "$name" = "__test_preset__" ]; then
    echo "$id"
    break
  fi
done)

if [ -n "$TEST_PRESET_ID" ]; then
  run_test_body "POST /api/presets/apply - Apply preset" "200" '"success"' \
    -X POST "$SERVER/api/presets/apply" \
    -H "Content-Type: application/json" \
    -d "{\"id\": \"${TEST_PRESET_ID}\"}"

  run_test_body "DELETE /api/presets/{id} - Delete preset" "200" '"success"' \
    -X DELETE "$SERVER/api/presets/${TEST_PRESET_ID}"
else
  echo "  ⚠️  Skipping apply/delete tests (could not extract test preset ID)"
  TOTAL=$((TOTAL + 2))
  FAIL=$((FAIL + 2))
fi

# --- Screens ---
echo ""
echo "[Screens]"
run_test_body "GET /api/screens - List screens" "200" '"screens"' \
  "$SERVER/api/screens"

# --- Error handling ---
echo ""
echo "[Error Handling]"
run_test "GET /api/nonexistent - 404 response" "404" \
  "$SERVER/api/nonexistent"

run_test "POST /api/window/level - Invalid value (400)" "400" \
  -X POST "$SERVER/api/window/level" \
  -H "Content-Type: application/json" \
  -d '{"level": "invalid_value"}'

# --- Summary ---
echo ""
echo "=== Results: ${PASS}/${TOTAL} passed, ${FAIL} failed ==="
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
