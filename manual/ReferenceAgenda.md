# fBoard 사용자 매뉴얼 참조 (Reference Agenda)

## 1. 윈도우 및 화면 구성 (Window & Display)
### 1-1. 크롬리스 윈도우 동작 원리 (Chromeless Window)
### 1-2. 창 레벨 관리 (항상 위, 일반, 배경으로)
### 1-3. 다중 모니터 및 화면 비율 대응 (Display Modes)

## 2. 배경 설정 및 관리 (Background Configuration)
### 2-1. 단색 배경 설정 (Color Setup)
### 2-2. 이미지 배경 설정 및 포맷 (Image Formats)
### 2-3. 이미지 채우기 모드 (Fit, Fill, Stretch, Tile)

## 3. 환경 설정 및 데이터 (Preferences & Data)
### 3-1. 설정 패널 5탭 구조 (Preferences Panel)
- **탭 1: General** — 언어(8개 언어 지원), 외관 모드(자동/라이트/다크), 이미지 폴더 설정
- **탭 2: Shortcuts** — 단축키 커스터마이징 (전역 단축키, 사용자 프리셋 단축키)
- **탭 3: Background** — 배경색/이미지 선택, 16색 팔레트 (라이트/다크 모드 대응)
- **탭 4: Presets** — 프리셋 목록 관리 (내장 4개 + 사용자 프리셋 최대 10개)
- **탭 5: Advanced** — REST API 설정, 데이터 초기화, 기본 탭 선택

### 3-2. UserDefaults 기반 데이터 저장 공간 (Data Persistence)
### 3-3. 앱 재시작 기능 및 상태 복원 (State Restoration)

## 4. 단축키 및 조작 (Keyboard Shortcuts & Interactions)
### 4-1. 기본 단축키 (Global Shortcuts)
| 단축키 | 기능 |
|--------|------|
| `Cmd + ,` | 설정 열기 |
| `Ctrl + Cmd + F` | 전체 화면 토글 |
| `Cmd + 0` | 기본 크기로 복원 (800×600) |
| `Cmd + S` | 현재 위치/크기 저장 |
| `Cmd + Option + F` | 항상 위 레벨 |
| `Cmd + Option + N` | 일반 레벨 |
| `Cmd + Option + B` | 배경으로 레벨 |

### 4-2. 내장 프리셋 단축키 (Built-in Presets)
| 단축키 | 프리셋 |
|--------|--------|
| `Cmd + Option + 1` | 전체 화면 |
| `Cmd + Option + 2` | 좌측 반 |
| `Cmd + Option + 3` | 우측 반 |
| `Cmd + Option + 4` | 중앙 800×600 |

### 4-3. 사용자 프리셋 단축키 (User Presets)
- `Cmd + Shift + 1 ~ 0`: 저장된 사용자 프리셋 10개 순서대로 적용

### 4-4. 마우스 드래그 및 모서리 크기 조절 (Mouse Interactions)
- 우클릭: 컨텍스트 메뉴 (배경색/이미지 선택, 프리셋, 창 레벨 변경)
- 우하단 코너 드래그: 윈도우 리사이즈

## 5. 프리셋 관리 (Preset Management)
### 5-1. 내장 프리셋 (Built-in Presets)
- **전체 화면**: 현재 모니터 전체 화면
- **좌측 반**: 좌측 50% 화면
- **우측 반**: 우측 50% 화면
- **중앙 800×600**: 화면 중앙 기본 크기

### 5-2. 사용자 프리셋 (User Presets)
- **최대 개수**: 10개
- **저장 방법**: 컨텍스트 메뉴 > "현재 위치/크기 저장..." 또는 `Cmd + S`
- **저장 정보**: 윈도우 위치, 크기, 레벨, 배경 설정
- **적용 방법**: 컨텍스트 메뉴 또는 단축키 (`Cmd + Shift + 1~0`)
- **관리 방법**: 설정창 Presets 탭에서 삭제/편집

### 5-3. 프리셋 대화상자
- **저장 대화**: 프리셋 이름 입력
- **관리 대화**: 프리셋 목록 테이블 (이름, 위치, 크기, 스크린, 배경, 단축키 컬럼)
- **확인 대화**: 삭제/덮어쓰기 시 안내

## 6. REST API 제어 (Remote Control via REST API)
### 6-1. 서버 설정 (Server Configuration)
- **활성화**: Advanced 탭 > "API Enable" 토글
- **포트**: 기본값 `3012` (커스터마이징 가능)
- **외부 접속**: "Allow External Access" 토글 (기본값: 비활성)
- **CIDR 접근 제어**: 예) `127.0.0.1/32`, `192.168.1.0/24`

### 6-2. 엔드포인트 카테고리 (Endpoint Categories)
**총 18개 엔드포인트:**
- **윈도우 제어 (7)**: 레벨 변경, 크기 조절, 이동, 최대화/최소화 등
- **배경 제어 (5)**: 색상 설정, 이미지 설정, 투명도 조절 등
- **프리셋 관리 (4)**: 프리셋 조회, 저장, 삭제, 적용
- **기타 (2)**: 상태 조회, 서버 정보

### 6-3. 활용 예시 (Usage Examples)
```bash
# 서버 시작 확인
curl http://localhost:3012/api/info

# 프리셋 목록 조회
curl http://localhost:3012/api/presets

# 전체 화면 적용 (프리셋 UUID)
curl -X POST http://localhost:3012/api/presets/apply/00000000-0000-0000-0000-000000000001

# 배경색 변경
curl -X POST http://localhost:3012/api/background/color \
  -H "Content-Type: application/json" \
  -d '{"hex":"#FFFFFF","alpha":1.0}'
```

### 6-4. CIDR 접근 제어
- **기본값**: `127.0.0.1/32` (localhost만 허용)
- **전체 네트워크**: `0.0.0.0/0` (권장하지 않음)
- **특정 서브넷**: `192.168.0.0/16`

## 7. 다국어 및 외관 (Localization & Appearance)
### 7-1. 지원 언어 (Supported Languages)
| 코드 | 언어 |
|------|------|
| ko | 한국어 |
| en | English |
| ja | 日本語 |
| zh-Hans | 简体中文 |
| zh-Hant | 繁體中文 |
| de | Deutsch |
| es | Español |
| fr | Français |

### 7-2. 외관 모드 (Appearance Mode)
- **자동 (System)**: 시스템 설정 따라감 (기본값)
- **라이트 (Light)**: 밝은 배경
- **다크 (Dark)**: 어두운 배경
- **팔레트**: 라이트/다크 모드별 16색 제공

### 7-3. 언어 변경 시 주의
- 언어 변경 후 앱 재시작 필요
- "지금 재시작" 또는 "나중에" 선택 가능
