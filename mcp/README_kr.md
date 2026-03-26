---
title: fBoard MCP Server
description: fBoard MCP Server 문서
date: 2026-03-26
---

fBoard REST API를 [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) 도구로 제공하는 서버입니다.
AI 에이전트(Claude Code, Claude Desktop 등)에서 fBoard 화이트보드 앱을 직접 제어할 수 있습니다.

# 전제 조건

fBoard 앱이 실행 중이고 REST API가 활성화되어 있어야 합니다:

| 서버              | 실행 방법                                         |
| ----------------- | ------------------------------------------------- |
| macOS 네이티브 앱 | fBoard.app 실행 (설정 > Advanced에서 REST API 활성화) |

기본 서버 주소: `http://localhost:3012`

---

# 설치

## 방법 1: 글로벌 설치 (권장)

```bash
npm install -g fboard-mcp
```

[![npm](https://img.shields.io/npm/v/fboard-mcp)](https://www.npmjs.com/package/fboard-mcp)

## 방법 2: npx (설치 없이 바로 실행)

별도 설치 없이 MCP 설정에서 `npx`로 직접 실행합니다.

## 방법 3: 소스에서 직접 실행

```bash
git clone https://github.com/nowage/fBoard.git
cd fBoard_public/mcp
npm install
```

---

# 설정

## Claude Code

* `~/.claude/settings.json` 또는 프로젝트 `.claude/settings.json`에 추가:
  - Claude Desktop의 경우 `~/Library/Application Support/Claude/claude_desktop_config.json`에 추가:
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

* 소스에서 직접 실행했다면:
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

* 서버 주소를 변경하려면:
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

## 글로벌 설치 후 사용

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

# 제공 도구 (Tools)

## 1. `health_check`

fBoard 서버 상태를 확인합니다.

**파라미터**: 없음

**응답 예시**:
```json
{
  "status": "ok",
  "app": "fBoard",
  "port": 3012
}
```

---

## 2. `get_status`

fBoard 전체 상태를 조회합니다 (윈도우, 배경, 프리셋 등).

**파라미터**: 없음

---

## 3. `get_window`

윈도우 상태를 조회합니다 (위치, 크기, 레벨, 스크린 정보).

**파라미터**: 없음

**응답 예시**:
```json
{
  "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
  "level": "normal",
  "screen": { "index": 0, "name": "Built-in Display" }
}
```

---

## 4. `set_window_level`

윈도우 레벨을 설정합니다.

**파라미터**:

| 이름    | 타입 | 필수 | 설명                                              |
| ------- | ---- | ---- | ------------------------------------------------- |
| `level` | enum | 예   | `"normal"(일반)`, `"floating"(항상 위)`, `"background"(배경)` |

---

## 5. `set_window_frame`

윈도우 위치와 크기를 설정합니다.

**파라미터**:

| 이름     | 타입   | 필수   | 설명        |
| -------- | ------ | ------ | ----------- |
| `x`      | number | 아니오 | X 좌표      |
| `y`      | number | 아니오 | Y 좌표      |
| `width`  | number | 아니오 | 윈도우 너비 |
| `height` | number | 아니오 | 윈도우 높이 |

**사용 예시** (Claude에게 요청):
```
fBoard 윈도우를 800x600 크기로 (100, 100) 위치에 설정해줘
```

---

## 6. `center_window`

윈도우를 현재 스크린 중앙에 정렬합니다.

**파라미터**: 없음

---

## 7. `reset_window`

윈도우를 기본 크기로 복원합니다.

**파라미터**: 없음

---

## 8. `toggle_fullscreen`

전체 화면 모드를 토글합니다.

**파라미터**: 없음

---

## 9. `move_to_screen`

윈도우를 특정 스크린(모니터)으로 이동합니다.

**파라미터**:

| 이름          | 타입    | 필수 | 설명                           |
| ------------- | ------- | ---- | ------------------------------ |
| `screenIndex` | integer | 예   | 이동할 스크린 인덱스 (0부터 시작) |

---

## 10. `get_background`

배경 상태를 조회합니다 (배경색, 이미지, 채우기 모드).

**파라미터**: 없음

**응답 예시**:
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

배경색을 설정합니다.

**파라미터**:

| 이름      | 타입   | 필수   | 설명                              |
| --------- | ------ | ------ | --------------------------------- |
| `color`   | string | 예     | hex 색상 코드 (예: `"#FF0000"`)    |
| `opacity` | number | 아니오 | 불투명도 0.0~1.0 (기본값: 1.0)    |

**사용 예시** (Claude에게 요청):
```
fBoard 배경을 하늘색(#87CEEB)으로 80% 투명도로 설정해줘
```

---

## 12. `set_background_image`

배경 이미지를 설정합니다.

**파라미터**:

| 이름       | 타입   | 필수   | 설명                                 |
| ---------- | ------ | ------ | ------------------------------------ |
| `path`     | string | 예     | 이미지 파일 경로                     |
| `fillMode` | enum   | 아니오 | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

---

## 13. `remove_background_image`

배경 이미지를 제거합니다.

**파라미터**: 없음

---

## 14. `set_fill_mode`

이미지 채우기 모드를 변경합니다.

**파라미터**:

| 이름       | 타입 | 필수 | 설명                                         |
| ---------- | ---- | ---- | -------------------------------------------- |
| `fillMode` | enum | 예   | `"fit"(맞춤)`, `"fill"(채우기)`, `"stretch"(늘리기)`, `"tile"(타일)` |

---

## 15. `get_presets`

저장된 프리셋 목록을 조회합니다.

**파라미터**: 없음

**응답 예시**:
```json
{
  "presets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "프레젠테이션 모드",
      "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
      "windowLevel": "floating",
      "isBuiltIn": false
    }
  ]
}
```

---

## 16. `save_preset`

현재 윈도우 상태를 프리셋으로 저장합니다.

**파라미터**:

| 이름   | 타입   | 필수 | 설명        |
| ------ | ------ | ---- | ----------- |
| `name` | string | 예   | 프리셋 이름 |

---

## 17. `apply_preset`

저장된 프리셋을 적용합니다.

**파라미터**:

| 이름 | 타입   | 필수 | 설명              |
| ---- | ------ | ---- | ----------------- |
| `id` | string | 예   | 프리셋 ID (UUID)  |

---

## 18. `delete_preset`

프리셋을 삭제합니다.

**파라미터**:

| 이름 | 타입   | 필수 | 설명              |
| ---- | ------ | ---- | ----------------- |
| `id` | string | 예   | 프리셋 ID (UUID)  |

---

## 19. `get_screens`

연결된 스크린(모니터) 목록을 조회합니다.

**파라미터**: 없음

**응답 예시**:
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

# 디버깅

## MCP Inspector로 테스트

```bash
npx @modelcontextprotocol/inspector npx fboard-mcp
```

브라우저에서 Inspector UI가 열리며, 각 도구를 직접 테스트할 수 있습니다.

## 서버 연결 확인

```bash
# fBoard REST API 서버가 실행 중인지 확인
curl http://localhost:3012/
```

---

# npm 배포

```bash
cd mcp
npm publish
```

---

# 아키텍처

```
Claude Code / Claude Desktop
    |
    | MCP (stdio)
    v
fboard-mcp (이 서버)
    |
    | HTTP (REST API)
    v
fBoard Server (localhost:3012)
    └── macOS 네이티브 앱 (Swift/AppKit)
```

---

# 라이선스

MIT
