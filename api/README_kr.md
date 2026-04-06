---
title: fBoard REST API 문서
description: fBoard REST API 문서
date: 2026-03-26
---

# 개요

fBoard는 macOS 화이트보드 앱을 원격 제어하기 위한 REST API를 제공합니다.

| 서버 구현          | 기술 스택                              | 기본 포트 |
| ------------------ | -------------------------------------- | --------- |
| macOS 네이티브 앱  | Swift / Network.framework (NWListener) | 3012      |

> OpenAPI 3.1 스펙: [openapi.yaml](./openapi.yaml)

---

# 보안

* API 서버는 **기본적으로 비활성화** 상태이며, 설정에서 명시적으로 활성화해야 합니다.
* 기본적으로 **localhost (127.0.0.1)** 연결만 허용됩니다.
* 인증 메커니즘은 현재 미구현 상태이므로, 신뢰할 수 있는 로컬 네트워크 환경에서만 사용하십시오.

---

# 엔드포인트

## 1. 서버 상태 확인

```
GET /
```

**응답**:
```json
{
  "status": "ok",
  "app": "fBoard",
  "version": "1.0.0",
  "port": 3012
}
```

---

## 2. 전체 앱 상태 조회

```
GET /api/status
```

**응답** (200):
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

## 3. 윈도우 상태 조회

```
GET /api/window
```

**응답** (200):
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

## 4. 윈도우 레벨 설정

```
POST /api/window/level
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `level` | string | 예 | `"normal"`, `"floating"`, `"background"` 중 택1 |

### 요청 예시

```json
{
  "level": "floating"
}
```

### 응답

**성공 (200)**:
```json
{
  "success": true,
  "level": "floating"
}
```

**에러 (400)**: 잘못된 값
```json
{
  "error": "Invalid level value"
}
```

---

## 5. 윈도우 위치/크기 설정

```
POST /api/window/frame
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `x` | number | 아니오 | X 좌표 (생략 시 현재 값 유지) |
| `y` | number | 아니오 | Y 좌표 (생략 시 현재 값 유지) |
| `width` | number | 아니오 | 너비 (생략 시 현재 값 유지) |
| `height` | number | 아니오 | 높이 (생략 시 현재 값 유지) |

### 요청 예시

```json
{
  "x": 100,
  "y": 100,
  "width": 800,
  "height": 600
}
```

### 응답 (200)

```json
{
  "success": true,
  "frame": { "x": 100, "y": 100, "width": 800, "height": 600 }
}
```

---

## 6. 윈도우 중앙 배치

```
POST /api/window/center
```

**응답 (200)**:
```json
{
  "success": true,
  "frame": { "x": 560, "y": 240, "width": 800, "height": 600 }
}
```

---

## 7. 윈도우 기본 크기 초기화

```
POST /api/window/reset
```

**응답 (200)**:
```json
{
  "success": true,
  "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
}
```

---

## 8. 전체화면 토글

```
POST /api/window/fullscreen
```

**응답 (200)**:
```json
{
  "success": true,
  "isFullScreen": true
}
```

---

## 9. 다른 스크린으로 이동

```
POST /api/window/move-screen
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `screenIndex` | integer | 예 | 대상 스크린 인덱스 (0부터 시작) |

### 요청 예시

```json
{
  "screenIndex": 1
}
```

### 응답

**성공 (200)**:
```json
{
  "success": true,
  "screenIndex": 1,
  "screenName": "DELL U2723QE"
}
```

**에러 (400)**: 잘못된 인덱스
```json
{
  "error": "Invalid screen index"
}
```

---

## 10. 배경 상태 조회

```
GET /api/background
```

**응답 (200)**:
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

## 11. 배경색 설정

```
POST /api/background/color
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `color` | string | 예 | — | HEX 색상 코드 (예: `"#FF5733"`) |
| `opacity` | number | 아니오 | `1.0` | 투명도 (0.0 ~ 1.0) |

### 요청 예시

```json
{
  "color": "#FF5733",
  "opacity": 0.8
}
```

### 응답 (200)

```json
{
  "success": true,
  "color": "#FF5733",
  "opacity": 0.8
}
```

---

## 12. 배경 이미지 설정

```
POST /api/background/image
Content-Type: multipart/form-data
```

multipart form data로 이미지 파일을 직접 업로드함. App Sandbox 파일 접근 제한을 우회.

### 요청 파라미터 (multipart/form-data)

| 필드       | 타입   | 필수    | 기본값   | 설명                                     |
| ---------- | ------ | ------- | -------- | ---------------------------------------- |
| `file`     | file   | 예      | —        | 업로드할 이미지 파일                     |
| `fillMode` | string | 아니오  | `"fill"` | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

### 요청 예시

```bash
curl -F "file=@/path/to/wallpaper.png" \
     -F "fillMode=fit" \
     http://localhost:3012/api/background/image
```

### 응답

**성공 (200)**:
```json
{
  "success": true,
  "imagePath": "/path/in/app/container/wallpaper.png",
  "fillMode": "fit"
}
```

**에러 (400)**: 파일 미첨부
```json
{
  "error": "No file part in multipart data"
}
```

---

## 13. 배경 이미지 제거

```
DELETE /api/background/image
```

**응답 (200)**:
```json
{
  "success": true,
  "type": "color"
}
```

---

## 14. 이미지 채우기 모드 변경

```
POST /api/background/fill-mode
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `fillMode` | string | 예 | `"fit"`, `"fill"`, `"stretch"`, `"tile"` |

### 응답 (200)

```json
{
  "success": true,
  "fillMode": "fit"
}
```

---

## 15. 프리셋 목록 조회

```
GET /api/presets
```

**응답 (200)**:
```json
{
  "presets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "기본 레이아웃",
      "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
      "windowLevel": "normal",
      "isBuiltIn": true
    }
  ],
  "count": 1
}
```

---

## 16. 프리셋 저장

```
POST /api/presets
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | 예 | 프리셋 이름 |

현재 윈도우 상태(위치, 크기, 레벨)를 자동으로 캡처하여 프리셋으로 저장합니다.

### 요청 예시

```json
{
  "name": "프레젠테이션 모드"
}
```

### 응답

**성공 (201)**:
```json
{
  "success": true,
  "preset": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "프레젠테이션 모드",
    "frame": { "x": 0, "y": 0, "width": 1920, "height": 1080 },
    "windowLevel": "floating",
    "isBuiltIn": false
  }
}
```

**에러 (400)**: 이름 누락 또는 최대 개수(10개) 초과
```json
{
  "error": "Preset name is required"
}
```

---

## 17. 프리셋 적용

```
POST /api/presets/apply
Content-Type: application/json
```

### 요청 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | 예 | 프리셋 UUID |

### 요청 예시

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 응답

**성공 (200)**:
```json
{
  "success": true,
  "appliedPreset": "기본 레이아웃"
}
```

**에러 (404)**: 프리셋을 찾을 수 없음
```json
{
  "error": "Preset not found"
}
```

---

## 18. 프리셋 삭제

```
DELETE /api/presets/{id}
```

### 경로 파라미터

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | 예 | 프리셋 UUID |

### 응답

**성공 (200)**:
```json
{
  "success": true,
  "deletedPreset": "프레젠테이션 모드"
}
```

**에러**:

| 상태 코드 | 원인                 | 응답 예시                                    |
| --------- | -------------------- | -------------------------------------------- |
| 403       | 내장 프리셋 삭제 시도 | `{"error": "Cannot delete built-in preset"}` |
| 404       | 존재하지 않는 프리셋  | `{"error": "Preset not found"}`              |

---

## 19. 연결된 스크린 목록

```
GET /api/screens
```

**응답 (200)**:
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

# 사용 예시

## cURL

```bash
# 헬스 체크
curl http://localhost:3012/

# 윈도우 상태 조회
curl http://localhost:3012/api/window

# 윈도우 레벨 변경 (항상 위)
curl -X POST http://localhost:3012/api/window/level \
  -H "Content-Type: application/json" \
  -d '{"level": "floating"}'

# 윈도우 위치/크기 설정
curl -X POST http://localhost:3012/api/window/frame \
  -H "Content-Type: application/json" \
  -d '{"x": 100, "y": 100, "width": 800, "height": 600}'

# 윈도우 중앙 배치
curl -X POST http://localhost:3012/api/window/center

# 배경색 변경
curl -X POST http://localhost:3012/api/background/color \
  -H "Content-Type: application/json" \
  -d '{"color": "#FF5733", "opacity": 0.8}'

# 배경 이미지 설정
curl -F "file=@/Users/Shared/wallpaper.png" \
     -F "fillMode=fit" \
     http://localhost:3012/api/background/image

# 프리셋 저장
curl -X POST http://localhost:3012/api/presets \
  -H "Content-Type: application/json" \
  -d '{"name": "프레젠테이션 모드"}'

# 프리셋 목록 조회
curl http://localhost:3012/api/presets

# 프리셋 적용
curl -X POST http://localhost:3012/api/presets/apply \
  -H "Content-Type: application/json" \
  -d '{"id": "UUID-HERE"}'

# 프리셋 삭제
curl -X DELETE http://localhost:3012/api/presets/UUID-HERE

# 연결된 스크린 목록
curl http://localhost:3012/api/screens
```

## Python

```python
import requests

BASE = "http://localhost:3012"

# 헬스 체크
r = requests.get(f"{BASE}/")
print(r.json())

# 배경색 변경
r = requests.post(f"{BASE}/api/background/color",
    json={"color": "#FF5733", "opacity": 0.8})

# 프리셋 저장
r = requests.post(f"{BASE}/api/presets",
    json={"name": "프레젠테이션 모드"})

# 프리셋 적용
r = requests.post(f"{BASE}/api/presets/apply",
    json={"id": "UUID-HERE"})
```

---

# 테스트

```bash
# 자동화 테스트 (19개 항목)
bash api/test-api.sh

# 원격 서버 테스트
bash api/test-api.sh --server=http://192.168.0.10:3012
```

테스트 항목:
1. 헬스 체크 (GET `/`)
2. 전체 앱 상태 조회 (GET `/api/status`)
3. 윈도우 상태 조회 (GET `/api/window`)
4. 윈도우 레벨 설정 (POST `/api/window/level`)
5. 윈도우 프레임 설정 (POST `/api/window/frame`)
6. 윈도우 중앙 배치 (POST `/api/window/center`)
7. 윈도우 초기화 (POST `/api/window/reset`)
8. 전체화면 토글 (POST `/api/window/fullscreen`)
9. 배경 상태 조회 (GET `/api/background`)
10. 배경색 설정 (POST `/api/background/color`)
11. 채우기 모드 설정 (POST `/api/background/fill-mode`)
12. 배경 이미지 제거 (DELETE `/api/background/image`)
13. 프리셋 목록 조회 (GET `/api/presets`)
14. 프리셋 저장 (POST `/api/presets`)
15. 프리셋 적용 (POST `/api/presets/apply`)
16. 프리셋 삭제 (DELETE `/api/presets/{id}`)
17. 스크린 목록 조회 (GET `/api/screens`)
18. 404 에러 응답 처리
19. 400 잘못된 파라미터 에러

---

# 에러 응답 형식

모든 에러는 동일한 JSON 형식으로 반환됩니다:

```json
{
  "error": "에러 메시지"
}
```

| 상태 코드 | 설명                                           |
| --------- | ---------------------------------------------- |
| 400       | 잘못된 요청 (파라미터 누락, 유효하지 않은 값)  |
| 403       | 권한 없음 (내장 프리셋 삭제 등)                |
| 404       | 리소스를 찾을 수 없음                          |
