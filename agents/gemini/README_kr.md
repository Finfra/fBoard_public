# fBoard Gemini CLI 플러그인

fBoard REST API를 통해 화이트보드 앱을 제어하는 Gemini CLI 플러그인(스킬 및 워크플로우)입니다.
설치 후 Gemini에게 윈도우, 배경, 프리셋을 제어해달라고 자연어로 요청할 수 있습니다.

---

## 플러그인 구조

```
skills/
└── fboard/
    └── SKILL.md         # 화이트보드 제어 스킬
workflows/
└── fboard-workflow.md   # fBoard 작업을 위한 예제 워크플로우
```

---

## 스킬

### `fboard` — 화이트보드 제어

fBoard REST API를 통해 화이트보드 앱(윈도우 위치/크기, 배경색/이미지, 프리셋)을 제어합니다.

**사용 예시:**
Gemini CLI에게 다음과 같이 요청하세요:
- "fBoard 배경색을 #FF5733으로 변경해줘"
- "fBoard에서 풀스크린 프리셋 적용해줘"
- "fBoard 윈도우 화면 중앙으로 이동시켜줘"
- "fBoard를 항상 위(floating)로 설정해줘"

**주요 기능:**
- 서버 미실행 시 fBoard.app 실행 안내
- 배경색 및 배경 이미지 관리
- 윈도우 위치, 크기, 레벨 제어
- 프리셋 저장/적용/삭제
- 다중 모니터 지원

---

## 설치 방법

### 방법 1: Gemini CLI를 통한 패키징 및 설치 (권장)

```bash
# 스킬 패키징
node ~/.nvm/versions/node/$(node -v)/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/skills/builtin/skill-creator/scripts/package_skill.cjs _public/agents/gemini/skills/fboard

# 로컬 스페이스에 스킬 설치
gemini skills install fboard.skill --scope workspace
```
> 설치 후 대화형 Gemini CLI 세션에서 반드시 `/skills reload`를 실행해야 합니다.

### 방법 2: 수동 링크

`fboard` 폴더를 프로젝트의 `.gemini/skills/` 디렉토리로 복사하거나 링크할 수 있습니다.

```bash
mkdir -p .gemini/skills
cp -r _public/agents/gemini/skills/fboard .gemini/skills/
```

---

## 전제 조건

fBoard REST API 서버가 실행 중이어야 합니다:

| 서버              | 실행 방법                                    |
| ----------------- | -------------------------------------------- |
| macOS 네이티브 앱 | fBoard.app 실행 (설정에서 REST API 활성화)   |

> 서버가 꺼져 있으면 Gemini가 사용자에게 fBoard.app 실행을 안내합니다.

---

## 라이선스

MIT
