---
title: fBoard 사용자 매뉴얼 및 기능 명세서 (User Manual & Functional Specification)
description: 본 문서는 fBoard의 핵심 가치 창출 도구인 **크롬리스 윈도우(Chromeless Window)**와 최적화된 **배경 관리 시스템**, 그리고 고급 사용자 설정에 대한 총체적이고 상세한 가이드를 제공합니다.
date: 2026.03.17
tags: [매뉴얼, 사용자 가이드, 기능 명세]
---

# 목차

1. [윈도우 시스템](#1-윈도우-시스템-window-system)
2. [배경 설정 시스템](#2-배경-설정-시스템-background-settings)
3. [데이터 보존 및 최적화](#3-데이터-보존-및-최적화-data--performance)
4. [앱 메뉴 및 단축키](#4-앱-메뉴-및-단축키-바인딩)
5. [프리셋 시스템](#5-프리셋-시스템-preset-system)
6. [REST API 원격 제어](#6-rest-api-원격-제어-rest-server)
7. [설정 패널](#7-설정-패널-preferences)
8. [다국어 지원](#8-다국어-지원-localization)
9. [Claude Code Skill 연동](#9-claude-code-skill-연동)
10. [MCP 연동](#10-mcp-model-context-protocol-연동)

---

# fBoard란? (Overview)

fBoard는 macOS 데스크톱 환경에서 순수 배경 역할을 수행하는 최소화된 크롬리스 윈도우 애플리케이션입니다. 제목 표시줄, 버튼, 메뉴바 등 불필요한 UI 요소를 모두 제거하여 깔끔한 전체 화면 또는 지정된 레이아웃을 제공하며, 사용자 커스터마이징 가능한 색상과 이미지 배경을 지원합니다.

---

# 1. 윈도우 시스템 (Window System)

fBoard의 핵심이자 근간을 이루는 윈도우 표시 방식입니다.

## 1.1. 순수 크롬리스 윈도우 (Chromeless Window)
fBoard는 `.borderless` 스타일 마스크를 적용해 창 테두리와 상단 바(Title Bar), 창 컨트롤(닫기, 최소화 등) 버튼을 모두 숨깁니다. 이를 통해 사용자는 화면에 방해받지 않는 순수한 콘텐츠(배경) 영역만을 마주할 수 있습니다.

## 1.2. 자유로운 창 컨트롤
- **드래그 이동**: 윈도우의 어느 부분이든 배경을 마우스로 클릭하고 드래그하면 자유롭게 위치를 이동할 수 있습니다.
- **크기 조절 (`.resizable`)**: 창의 오른쪽 또는 하단 모서리를 잡아끌면 시각적인 방해물 없이 크기를 변경할 수 있습니다.
- **창 레벨 (Window Level)**: 환경 설정을 통해 창이 위치할 `Z-Index`(레이어)를 정할 수 있습니다.
  - 항상 위에 (Top)
  - 일반 (Normal)
  - 배경으로 (Desktop Background)

---

# 2. 배경 설정 시스템 (Background Settings)

앱 메인 윈도우에 표시될 시각적 요소를 자유롭게 변경하는 시스템입니다.

## 2.1. 단색 배경 설정 (Color Fill)
사용자는 macOS 기본 내장 색상 패널(`NSColorPanel`)을 호출하여 윈도우 배경으로 사용할 단색 레이어를 지정할 수 있습니다. 변경 사항은 즉각 윈도우에 반영됩니다.

## 2.2. 이미지 배경 모드 (Image Background)
로컬에 저장된 사용자 이미지를 윈도우 배경으로 삽입하는 기능입니다. PNG, JPG, JPEG, GIF, BMP, TIFF 등 다양한 운영체제 기본 이미지 포맷을 지원합니다. 파일 선택을 취소하거나 유효하지 않은 포맷일 경우 안전하게 이전 상태를 유지합니다.

## 2.3. 디테일한 이미지 채우기 속성
이미지의 원본 해상도와 창 크기가 다를 때를 대비해 4가지 채우기 모드를 제공합니다:
- **맞춤 (Fit)**: 이미지 원본 비율을 철저히 유지하며 전체 윈도우 영역 안쪽에 맞춰 표시합니다.
- **채우기 (Fill)**: 비율을 유지하면서 창의 모든 여백을 가리도록 이미지를 확대/축소하여 채웁니다. (이미지의 일부가 잘릴 수 있음)
- **늘리기 (Stretch)**: 비율을 무시하고 현재 창 크기에 맞추어 텍스처를 팽창시키거나 압축합니다.
- **타일 (Tile)**: 원본 해상도의 이미지를 반복 바둑판 형태로 윈도우 전역에 이어 붙여 렌더링합니다.

---

# 3. 데이터 보존 및 최적화 (Data & Performance)

## 3.1. 영구 설정 저장 및 자동 복원
fBoard는 Apple의 기본 `UserDefaults`를 통해 사용자가 마지막으로 설정한 배경 형식(색상/이미지 정보 포함), 채우기 모드, 그리고 윈도우의 위치 및 크기 속성(`windowFrame`)을 저장합니다. 앱을 완전히 종료한 후 재실행하더라도 이전 작업 환경과 완전히 동일하게 자동 복원(`State Restoration`)됩니다.

## 3.2. 시스템 퍼포먼스 제어 (Lightweight Operation)
fBoard는 데스크톱에서 항상 떠 있어야 하는 성격을 감안하여 최고의 성능 최적화가 되어있습니다.
- **시작 시간 1초 이내** 진입 보장
- **Idle 시 CPU 0.1% 이하 점유** 유지
- **최소 앱 메모리 사용량 보장**(기본 50MB 대역, 큰 이미지 로드 시 점유 최소화)

---

# 4. 앱 메뉴 및 단축키 바인딩

시스템 메뉴 막대를 숨길 수 있기 때문에 주로 팝업 메뉴 및 글로벌 단축키에 의존하여 조작합니다.

## 4.1 기본 단축키

| 동작           | 기본 단축키       |
| -------------- | --------------- |
| 설정 열기      | `Cmd + ,`       |
| 전체 화면 토글 | `Ctrl + Cmd + F` |
| 기본 크기 복원 | `Cmd + 0`       |
| 앱 종료        | `Cmd + Q`       |

## 4.2 윈도우 레벨 단축키

| 동작      | 단축키          |
| --------- | --------------- |
| 항상 위에 | `Cmd + Option + F` |
| 일반      | `Cmd + Option + N` |
| 배경으로  | `Cmd + Option + B` |

## 4.3 프리셋 단축키

| 동작           | 단축키            |
| -------------- | --------------- |
| 전체 화면      | `Cmd + Option + 1` |
| 좌측 반        | `Cmd + Option + 2` |
| 우측 반        | `Cmd + Option + 3` |
| 중앙 800×600   | `Cmd + Option + 4` |
| 사용자 프리셋 1~10 | `Cmd + Shift + 1~0` |
| 현재 설정으로 저장 | `Cmd + S` |

## 4.4 스크린 이동 단축키

| 동작        | 단축키    |
| ----------- | --------- |
| 스크린 1로 | `Ctrl + 1` |
| 스크린 2로 | `Ctrl + 2` |
| ... (최대 10개) | `Ctrl + 0` |

**참고**: 모든 단축키는 설정 패널(General > Shortcuts 탭)에서 커스터마이징 가능합니다.

---

# 5. 프리셋 시스템 (Preset System)

자주 사용하는 윈도우 위치, 크기, 배경 설정을 조합으로 저장하고 빠르게 전환하는 기능입니다.

## 5.1 프리셋 종류

### 5.1.1 내장 프리셋 (Built-in) — 4개, 삭제 불가

| 이름           | 설명                                    |
| -------------- | --------------------------------------- |
| 전체 화면      | 현재 모니터 전체 영역 차지              |
| 좌측 반        | 화면 좌측 50% 너비, 100% 높이          |
| 우측 반        | 화면 우측 50% 너비, 100% 높이          |
| 중앙 800×600   | 화면 중앙 정렬, 800×600 고정 크기      |

### 5.1.2 사용자 프리셋 — 최대 10개

사용자가 직접 저장한 프리셋으로, 다음 정보를 포함합니다:
- **이름**: 사용자 지정 (예: "발표용", "개발 환경", "영상 편집")
- **윈도우 위치/크기**: frame 정보
- **윈도우 레벨**: 항상 위/일반/배경으로
- **배경 설정**: 배경색 또는 이미지 경로, 채우기 모드 (선택사항)

## 5.2 프리셋 관리

### 5.2.1 저장

1. **컨텍스트 메뉴 방식**: 메인 윈도우 우클릭 → "프리셋" → "현재 설정으로 저장..."
2. **설정 패널 방식**: 설정 > Presets 탭 → "[현재 설정으로 저장...]" 버튼
3. **단축키**: `Cmd + S`

저장 시 프리셋 이름을 입력하는 대화상자가 표시되며, 동일 이름 존재 시 덮어쓰기 확인 다이얼로그가 표시됩니다.

### 5.2.2 불러오기

1. **컨텍스트 메뉴**: 메인 윈도우 우클릭 → "프리셋" → 원하는 프리셋 선택
2. **설정 패널**: 설정 > Presets 탭 → 프리셋 목록에서 더블클릭 또는 선택 후 Enter
3. **단축키**:
   - 내장 프리셋: `Cmd + Option + 1/2/3/4`
   - 사용자 프리셋: `Cmd + Shift + 1~0` (첫 번째부터 10번째까지)

불러올 때 윈도우는 애니메이션과 함께 설정된 위치/크기로 부드럽게 이동합니다.

### 5.2.3 삭제

1. **설정 패널**: 설정 > Presets 탭 → 삭제할 프리셋의 [X] 버튼 클릭
2. 내장 프리셋은 삭제 불가능합니다.

### 5.2.4 데이터 저장

- **저장소**: macOS UserDefaults (일반 사용자 기본값)
- **직렬화**: JSON 형식 (Codable 활용)
- **자동 백업**: 없음 (설정 초기화 시 모든 프리셋 삭제)

## 5.3 사용 시나리오

**원격 발표**: 발표 화면(좌측 반) + 노트(우측 반) 레이아웃을 미리 프리셋으로 저장 후 `Cmd + Shift + 1`로 즉시 전환

**멀티 모니터**: 외부 모니터의 특정 영역을 프리셋으로 저장하면, 모니터 재연결 시 자동으로 적절한 스크린에 폴백됩니다.

---

# 6. REST API 원격 제어 (REST Server)

외부 클라이언트(다른 애플리케이션, 스크립트 등)에서 HTTP 요청으로 fBoard의 윈도우와 배경을 원격 제어하는 기능입니다.

## 6.1 서버 활성화

1. 설정 > Advanced 탭 → "REST API 서버" 섹션
2. "활성화" 체크박스 선택
3. 포트 설정 (기본값: 3012)
4. "외부 접속 허용" 체크박스로 외부 IP 접근 제어
5. "허용 CIDR" 필드에 접근 가능한 IP 범위 지정 (예: `192.168.1.0/24`)

서버가 시작되면 상태 표시 영역에 "서버 실행 중 (http://localhost:3012)" 메시지가 표시됩니다.

## 6.2 엔드포인트 개요 (18개)

### 상태 조회 (2개)
- `GET /` : 헬스 체크 (앱 상태, 버전, 포트)
- `GET /api/status` : 윈도우/배경/서버 상태 조회

### 윈도우 제어 (7개)
- `GET /api/window` : 윈도우 위치, 크기, 레벨 조회
- `POST /api/window/level` : 윈도우 레벨 설정 (normal/floating/background)
- `POST /api/window/frame` : 윈도우 위치/크기 설정
- `POST /api/window/center` : 윈도우 화면 중앙 정렬
- `POST /api/window/reset` : 윈도우 크기 초기화 (800×600)
- `POST /api/window/fullscreen` : 전체 화면 토글
- `POST /api/window/move-screen` : 특정 스크린으로 이동

### 배경 제어 (5개)
- `GET /api/background` : 배경 상태 조회 (유형, 색상/이미지 경로, 채우기 모드)
- `POST /api/background/color` : 배경색 설정 (HEX 형식)
- `POST /api/background/image` : 배경 이미지 설정
- `POST /api/background/fill-mode` : 이미지 채우기 모드 변경 (fit/fill/stretch/tile)
- `DELETE /api/background/image` : 배경 이미지 제거 (색상으로 복구)

### 프리셋 관리 (4개)
- `GET /api/presets` : 프리셋 목록 조회 (내장 + 사용자)
- `POST /api/presets` : 프리셋 저장
- `POST /api/presets/apply` : 프리셋 적용
- `DELETE /api/presets/{id}` : 프리셋 삭제 (사용자 프리셋만)

### 화면 조회 (1개)
- `GET /api/screens` : 연결된 모니터 정보 조회

## 6.3 요청/응답 형식

- **Content-Type**: `application/json`
- **CORS**: 모든 Origin 허용
- **상태 코드**: 200 (OK), 201 (Created), 400 (Bad Request), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

## 6.4 접근 제어

| 설정 | 설명 |
|------|------|
| **localhost** | 항상 허용 (127.0.0.1, ::1, localhost) |
| **외부 IP** | "외부 접속 허용" 활성화 시에만 접근 가능 |
| **CIDR 필터** | 허용 CIDR 범위에 포함된 IP만 접근 (예: `192.168.1.0/24`, `10.0.0.0/8`) |

## 6.5 사용 예시

### curl 사용 예시

```bash
# 헬스 체크
curl http://localhost:3012/

# 앱 전체 상태 조회
curl http://localhost:3012/api/status

# 윈도우 정보 조회
curl http://localhost:3012/api/window

# 윈도우 레벨 변경 (normal / floating / background)
curl -X POST http://localhost:3012/api/window/level \
  -H "Content-Type: application/json" \
  -d '{"level": "floating"}'

# 윈도우 위치/크기 설정
curl -X POST http://localhost:3012/api/window/frame \
  -H "Content-Type: application/json" \
  -d '{"x": 100, "y": 100, "width": 1200, "height": 800}'

# 윈도우 화면 중앙 정렬
curl -X POST http://localhost:3012/api/window/center

# 윈도우 크기 초기화 (800×600)
curl -X POST http://localhost:3012/api/window/reset

# 전체 화면 토글
curl -X POST http://localhost:3012/api/window/fullscreen

# 배경색 변경 (HEX + opacity)
curl -X POST http://localhost:3012/api/background/color \
  -H "Content-Type: application/json" \
  -d '{"color": "#FF5733", "opacity": 1.0}'

# 배경 이미지 설정
curl -X POST http://localhost:3012/api/background/image \
  -H "Content-Type: application/json" \
  -d '{"path": "/Users/Shared/wallpaper.png"}'

# 이미지 채우기 모드 변경 (fit / fill / stretch / tile)
curl -X POST http://localhost:3012/api/background/fill-mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "fill"}'

# 배경 이미지 제거 (색상으로 복귀)
curl -X DELETE http://localhost:3012/api/background/image

# 프리셋 목록 조회
curl http://localhost:3012/api/presets

# 프리셋 적용 (UUID)
curl -X POST http://localhost:3012/api/presets/apply \
  -H "Content-Type: application/json" \
  -d '{"id": "00000000-0000-0000-0000-000000000001"}'

# 프리셋 저장
curl -X POST http://localhost:3012/api/presets \
  -H "Content-Type: application/json" \
  -d '{"name": "발표용 레이아웃"}'

# 프리셋 삭제 (사용자 프리셋만 가능)
curl -X DELETE http://localhost:3012/api/presets/{preset-uuid}

# 연결된 모니터 정보 조회
curl http://localhost:3012/api/screens
```

### Python 클라이언트 예시

```python
import requests

BASE_URL = "http://localhost:3012"

# 배경색 변경
response = requests.post(
    f"{BASE_URL}/api/background/color",
    json={"color": "#FF5733", "opacity": 1.0}
)
print(response.json())

# 윈도우 상태 조회
status = requests.get(f"{BASE_URL}/api/status")
print(status.json())

# 프리셋 목록 조회 및 첫 번째 프리셋 적용
presets = requests.get(f"{BASE_URL}/api/presets").json()
if presets.get("presets"):
    first_id = presets["presets"][0]["id"]
    requests.post(f"{BASE_URL}/api/presets/apply", json={"id": first_id})

# 윈도우 위치/크기 설정
requests.post(f"{BASE_URL}/api/window/frame", json={
    "x": 200, "y": 150, "width": 1024, "height": 768
})

# 전체 화면 전환
requests.post(f"{BASE_URL}/api/window/fullscreen")
```

### Node.js 클라이언트 예시

```javascript
const BASE_URL = "http://localhost:3012";

// 배경색 변경
async function setBackgroundColor(color, opacity = 1.0) {
  const res = await fetch(`${BASE_URL}/api/background/color`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color, opacity }),
  });
  return res.json();
}

// 윈도우 상태 조회
async function getStatus() {
  const res = await fetch(`${BASE_URL}/api/status`);
  return res.json();
}

// 프리셋 적용
async function applyPreset(id) {
  const res = await fetch(`${BASE_URL}/api/presets/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

// 사용 예시
(async () => {
  await setBackgroundColor("#3498DB");
  const status = await getStatus();
  console.log("현재 상태:", status);
})();
```

---

# 7. 설정 패널 (Preferences)

환경설정 패널은 5개 탭으로 구성되어 있으며, 모든 설정이 자동 저장됩니다.

## 7.1 일반 탭 (General)

**아이콘**: ⚙️ | **색상 테마**: 베이지 (라이트 모드) / 따뜻한 회색 (다크 모드)

- **언어 선택**: 시스템 기본 또는 지정 언어 (한국어, 영어, 일본어, 중국어 간체/번체, 프랑스어, 독일어, 스페인어)
  - **참고**: 언어 변경 후 앱을 재시작해야 모든 UI에 반영됩니다.
- **외관 모드**: 자동(시스템 따름) / 라이트 모드 / 다크 모드
- **이미지 폴더**: 배경 이미지 선택 시 기본 폴더 설정

## 7.2 단축키 탭 (Shortcuts)

**아이콘**: ⌨️ | **색상 테마**: 하늘색 (라이트 모드) / 진한 파랑 (다크 모드)

모든 단축키를 커스터마이징할 수 있습니다:

- **기본 동작**: 설정 열기, 전체 화면, 기본 크기 복원
- **윈도우 레벨**: 항상 위, 일반, 배경으로
- **프리셋**: 저장 단축키, 사용자 프리셋 모디파이어, 스크린 이동 모디파이어

## 7.3 배경 탭 (Background)

**아이콘**: 🎨 | **색상 테마**: 민트색 (라이트 모드) / 진한 초록 (다크 모드)

- **배경 유형 선택**: 색상 / 이미지
- **색상 팔레트**: 16색 퀵 선택 (라이트/다크 모드 자동 전환)
- **색상 직접 입력**: HEX 값 입력 또는 Color Well로 색상 선택
- **이미지 설정**: 파일 선택, 프리뷰, 채우기 모드(맞춤/채우기/늘리기/타일)

## 7.4 프리셋 탭 (Presets)

**아이콘**: ◻️ | **색상 테마**: 페치색 (라이트 모드) / 진한 주황 (다크 모드)

- **프리셋 목록**: 사용자 저장 프리셋만 표시 (내장 프리셋 제외)
- **사용량 표시**: "3/10 사용 중" (현재 사용 개수 / 최대 10개)
- **빠른 동작**:
  - 프리셋 클릭 후 Enter: 프리셋 적용
  - [X] 버튼: 프리셋 삭제
- **버튼**:
  - "[현재 설정으로 저장...]": 새로운 사용자 프리셋 생성
  - "[초기화]": 모든 사용자 프리셋 삭제 (확인 다이얼로그)

## 7.5 고급 탭 (Advanced)

**아이콘**: 🔧 | **색상 테마**: 라벤더 (라이트 모드) / 진한 보라 (다크 모드)

### REST API 서버 설정

- **활성화**: REST 서버 ON/OFF
- **포트**: 서버 리스닝 포트 (기본값: 3012)
- **외부 접속 허용**: localhost 외 외부 IP 접근 제어
- **허용 CIDR**: 접근 가능한 IP 범위 (CIDR 표기법)
- **상태**: "서버 중지" 또는 "서버 실행 중 (http://...)" 표시

### 기타 설정

- **기본 탭**: 설정 패널을 열 때 표시될 기본 탭 선택 (General/Shortcuts/Background/Presets/Advanced)
- **[모든 설정 초기화]**: 모든 사용자 설정을 기본값으로 복원 (프리셋 포함, 확인 다이얼로그)

---

# 8. 다국어 지원 (Localization)

fBoard는 8개 언어를 지원합니다.

## 8.1 지원 언어

| 코드 | 언어 | 원문 표기 |
|------|------|----------|
| ko | 한국어 | 한국어 |
| en | 영어 | English |
| ja | 일본어 | 日本語 |
| zh-Hans | 중국어 (간체) | 简体中文 |
| zh-Hant | 중국어 (번체) | 繁體中文 |
| fr | 프랑스어 | Français |
| de | 독일어 | Deutsch |
| es | 스페인어 | Español |

## 8.2 언어 설정

1. 설정 > General 탭
2. "언어 설정"에서 원하는 언어 선택
3. 앱을 재시작하면 UI가 선택된 언어로 변경됩니다.

기본값으로 설정하면 macOS 시스템 언어를 따릅니다.

## 8.3 지원 영역

다음 항목들이 언어 설정에 따라 변경됩니다:

- 메뉴(메뉴바, 컨텍스트 메뉴)
- 설정 패널 UI 및 모든 탭
- 대화상자 및 알림 메시지
- 단축키 레이블

---

# 9. Claude Code Skill 연동

fBoard는 Claude Code Plugin(Skill)을 통해 대화형 AI 환경에서 직접 제어할 수 있습니다. Claude Code 터미널에서 슬래시 커맨드(`/fboard:fboard`)를 입력하면 fBoard REST API를 호출하여 배경색 변경, 프리셋 적용, 윈도우 조작 등을 수행합니다.

## 9.1 전제 조건

- fBoard 앱이 실행 중이어야 합니다.
- fBoard REST API 서버가 활성화되어 있어야 합니다. (설정 > Advanced > REST API 서버 활성화)
- Claude Code가 설치되어 있어야 합니다.

## 9.2 설치 방법

### 방법 1: Plugin 설치 (권장)

```bash
# Claude Code Plugin으로 직접 설치
claude plugin add fboard
```

### 방법 2: 수동 복사

fBoard 프로젝트의 `.claude/commands/` 디렉토리에 있는 Skill 파일을 Claude Code 설정 폴더로 복사합니다.

```bash
# 글로벌 설치
cp -r fBoard/.claude/commands/fboard.md ~/.claude/commands/

# 프로젝트 로컬 설치
cp -r fBoard/.claude/commands/fboard.md .claude/commands/
```

### 방법 3: Symbolic Link

```bash
# 심볼릭 링크로 항상 최신 버전 유지
ln -sf /path/to/fBoard/.claude/commands/fboard.md ~/.claude/commands/fboard.md
```

## 9.3 사용 예시

Claude Code 터미널에서 다음과 같이 슬래시 커맨드를 사용합니다:

| 커맨드 | 설명 |
|--------|------|
| `/fboard:fboard color #FF5733` | 배경색을 `#FF5733`으로 변경 |
| `/fboard:fboard preset fullscreen` | 전체 화면 프리셋 적용 |
| `/fboard:fboard status` | 현재 fBoard 상태 조회 (윈도우, 배경, 서버) |
| `/fboard:fboard window center` | 윈도우를 화면 중앙으로 이동 |
| `/fboard:fboard window reset` | 윈도우 크기를 기본값(800×600)으로 초기화 |
| `/fboard:fboard window level floating` | 윈도우를 항상 위에 표시 |
| `/fboard:fboard presets list` | 프리셋 목록 조회 |
| `/fboard:fboard background image /path/to/image.png` | 배경 이미지 설정 |

## 9.4 동작 원리

Claude Code Skill은 내부적으로 fBoard REST API(`http://localhost:3012`)를 호출합니다. 따라서 REST API 서버가 실행 중이지 않으면 Skill 커맨드가 동작하지 않습니다.

```
사용자 입력 → Claude Code Skill → HTTP 요청 → fBoard REST API → 앱 제어
```

---

# 10. MCP (Model Context Protocol) 연동

fBoard MCP 서버는 Claude Code 및 Claude Desktop과 같은 AI 도구에서 fBoard를 자연어로 제어할 수 있게 해주는 표준화된 인터페이스입니다. MCP(Model Context Protocol)를 통해 AI가 fBoard의 도구(Tool)를 직접 호출하여 윈도우 조작, 배경 변경, 프리셋 관리 등을 수행합니다.

## 10.1 전제 조건

- fBoard 앱이 실행 중이어야 합니다.
- fBoard REST API 서버가 활성화되어 있어야 합니다.
- Node.js 18 이상이 설치되어 있어야 합니다. (npx 사용 시)

## 10.2 설치 방법

### 방법 1: 글로벌 설치

```bash
npm install -g @fboard/mcp-server
```

### 방법 2: npx로 직접 실행 (설치 불필요)

```bash
npx @fboard/mcp-server
```

### 방법 3: 소스에서 빌드

```bash
git clone https://github.com/user/fboard-mcp-server.git
cd fboard-mcp-server
npm install && npm run build
```

## 10.3 Claude Code 설정

Claude Code에서 MCP 서버를 연결하려면 설정 파일에 다음을 추가합니다:

```json
{
  "mcpServers": {
    "fboard": {
      "command": "npx",
      "args": ["@fboard/mcp-server"],
      "env": {
        "FBOARD_API_URL": "http://localhost:3012"
      }
    }
  }
}
```

## 10.4 Claude Desktop 설정

Claude Desktop의 설정 파일(`claude_desktop_config.json`)에 다음을 추가합니다:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fboard": {
      "command": "npx",
      "args": ["@fboard/mcp-server"],
      "env": {
        "FBOARD_API_URL": "http://localhost:3012"
      }
    }
  }
}
```

## 10.5 제공 도구 (19개)

MCP 서버가 제공하는 도구 목록입니다. AI가 이 도구들을 직접 호출하여 fBoard를 제어합니다.

### 상태 조회 (2개)

| 도구 이름 | 설명 |
|-----------|------|
| `fboard_health_check` | 서버 헬스 체크 (앱 상태, 버전, 포트) |
| `fboard_get_status` | 윈도우/배경/서버 전체 상태 조회 |

### 윈도우 제어 (7개)

| 도구 이름 | 설명 |
|-----------|------|
| `fboard_get_window` | 윈도우 위치, 크기, 레벨 조회 |
| `fboard_set_window_level` | 윈도우 레벨 설정 (normal/floating/background) |
| `fboard_set_window_frame` | 윈도우 위치/크기 설정 (x, y, width, height) |
| `fboard_center_window` | 윈도우 화면 중앙 정렬 |
| `fboard_reset_window` | 윈도우 크기 초기화 (800×600) |
| `fboard_toggle_fullscreen` | 전체 화면 토글 |
| `fboard_move_to_screen` | 특정 스크린으로 윈도우 이동 |

### 배경 제어 (5개)

| 도구 이름 | 설명 |
|-----------|------|
| `fboard_get_background` | 배경 상태 조회 (유형, 색상/이미지, 채우기 모드) |
| `fboard_set_background_color` | 배경색 설정 (HEX 형식, opacity 옵션) |
| `fboard_set_background_image` | 배경 이미지 설정 (파일 경로) |
| `fboard_set_fill_mode` | 이미지 채우기 모드 변경 (fit/fill/stretch/tile) |
| `fboard_remove_background_image` | 배경 이미지 제거 (색상으로 복구) |

### 프리셋 관리 (4개)

| 도구 이름 | 설명 |
|-----------|------|
| `fboard_get_presets` | 프리셋 목록 조회 (내장 + 사용자) |
| `fboard_save_preset` | 현재 설정을 프리셋으로 저장 |
| `fboard_apply_preset` | 프리셋 적용 (ID 또는 이름) |
| `fboard_delete_preset` | 프리셋 삭제 (사용자 프리셋만) |

### 화면 조회 (1개)

| 도구 이름 | 설명 |
|-----------|------|
| `fboard_get_screens` | 연결된 모니터 정보 조회 |

## 10.6 사용 예시

MCP가 설정된 Claude Code 또는 Claude Desktop에서 자연어로 요청하면 AI가 적절한 도구를 자동으로 호출합니다.

### 배경색 변경

> **사용자**: "fBoard의 배경색을 파란색으로 변경해줘"
>
> **Claude**: `fboard_set_background_color` 도구를 호출하여 `#0000FF` 색상을 설정합니다.

### 상태 확인

> **사용자**: "현재 윈도우 상태를 알려줘"
>
> **Claude**: `fboard_get_status` 도구를 호출하여 윈도우 위치/크기, 배경 유형, 서버 상태 등을 보고합니다.

### 프리셋 관리

> **사용자**: "프리셋 목록 보여줘"
>
> **Claude**: `fboard_get_presets` 도구를 호출하여 내장 프리셋 4개와 사용자 프리셋 목록을 표시합니다.

### 복합 작업

> **사용자**: "발표 준비해줘 — 전체 화면으로 바꾸고 배경을 검은색으로 설정해"
>
> **Claude**: `fboard_toggle_fullscreen`과 `fboard_set_background_color`를 순차적으로 호출하여 두 가지 작업을 모두 수행합니다.

## 10.7 동작 원리

```
사용자 자연어 → Claude AI → MCP Protocol → fBoard MCP 서버 → REST API → fBoard 앱
```

MCP 서버는 fBoard REST API의 래퍼(Wrapper) 역할을 하며, AI 도구 호출 규약(Tool Calling)에 맞게 인터페이스를 표준화합니다. 기존 REST API의 모든 기능을 MCP 도구로 1:1 매핑하여 제공합니다.

---
