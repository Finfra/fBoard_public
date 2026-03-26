---
title: fBoard 매뉴얼 개요 (Manual Structure Overview)
description: fBoard 매뉴얼 개요 (Manual Structure Overview) 문서
date: 2026-03-26
---

본 문서는 fBoard 사용자/개발자 매뉴얼의 상위 구조와 작성 가이드를 정의합니다. 실제 세부 문서는 본 구조에 따라 하위 파일로 확장합니다.

# 목적과 범위
- 대상: 일반 사용자(설치/기본조작), 파워유저(배경 설정), 개발자(빌드/아키텍처)
- 범위: 개요 → 설치 → 사용자 가이드 → 기능 명세 → 레퍼런스 → 부록
- 규칙: 모든 링크는 리포지토리 루트 기준 상대 경로 사용, 한국어 우선

# 디렉토리 구조(제안)
- 01_Overview/
  - Introduction.md: fBoard 개요, 주요 기능(크롬리스 윈도우, 배경 설정, 프리셋, REST API)
  - Architecture.md: 아키텍처 요약 (Swift, AppKit, UserDefaults, Network)
    - 참조: `prd.md`, `README.md`
- 02_Install/
  - Install_macOS.md: 요구사항(macOS 12.0+), 설치 방법, 빌드 절차
- 03_UserGuide/
  - WindowControl.md: 윈도우 이동, 크기 조절, 단축키 사용법
  - BackgroundSettings.md: 색상 및 이미지 배경 설정, 채우기 모드(맞춤, 채우기, 늘리기, 타일)
  - PresetGuide.md: 프리셋 저장/관리 사용법, 내장 프리셋 소개
  - RESTAPIGuide.md: REST API 활성화, 기본 요청 예시, 보안 설정
- 04_FunctionalSpec/
  - FunctionalSpecification.md: 핵심 기능 명세 및 동작 원리 (프리셋, REST API 포함)
- 05_Reference/
  - Shortcuts.md: 앱 내 단축키 (기본, 윈도우 레벨, 프리셋, 스크린 이동)
  - RESTAPIReference.md: REST API 엔드포인트 완전 레퍼런스 (18개 모두)
  - ReferenceAgenda.md: 매뉴얼 참조 어젠다
- 06_PreferencesPanel/
  - SettingsPanel.md: 5탭 설정 패널 상세 가이드 (General, Shortcuts, Background, Presets, Advanced)
  - Localization.md: 다국어 지원 언어 목록 및 설정 방법
- 07_Integration/
  - ClaudeSkillGuide.md: Claude Code Skill(Plugin) 설치 및 슬래시 커맨드 사용법
  - MCPServerGuide.md: MCP 서버 설정, Claude Code/Desktop 연동, 도구 19개 레퍼런스
  - APIClientExamples.md: curl, Python, Node.js REST API 클라이언트 예시
- 99_Appendix/
  - Glossary.md: 용어 사전(프로젝트 용어 통일)

# 작성 가이드
- 파일/제목 규칙: 폴더별 주제 중심, 명사형 제목 사용
- 링크 정책: 문서 간 교차 참조는 상대 경로 사용
- 버전/변경 이력: 릴리스 노트 등에 사용자 관점 요약 정리

# 향후 작성 일정(To‑Do)
- [ ] 01_Overview/Introduction.md 초안
- [ ] 02_Install/Install_macOS.md (요구사항 및 빌드 안내)
- [ ] 03_UserGuide/WindowControl.md (단축키 포함)
- [ ] 03_UserGuide/BackgroundSettings.md (설정 패널 캡처 포함)
- [ ] 03_UserGuide/PresetGuide.md (프리셋 사용법)
- [ ] 03_UserGuide/RESTAPIGuide.md (REST API 빠른 시작)
- [ ] 04_FunctionalSpec/FunctionalSpecification.md ✅ (업데이트 완료: 2026.03.17)
- [ ] 05_Reference/Shortcuts.md (단축키 완전 레퍼런스)
- [ ] 05_Reference/RESTAPIReference.md (REST API 엔드포인트 18개 모두)
- [ ] 06_PreferencesPanel/SettingsPanel.md (5탭 설정 패널)
- [ ] 06_PreferencesPanel/Localization.md (다국어 지원 8개 언어)
- [ ] 07_Integration/ClaudeSkillGuide.md (Claude Code Skill 설치 및 사용법)
- [ ] 07_Integration/MCPServerGuide.md (MCP 서버 설정 및 도구 19개 레퍼런스)
- [ ] 07_Integration/APIClientExamples.md (curl, Python, Node.js 클라이언트 예시)

# 관련 문서(핵심 링크)
- PRD: `prd.md`
- 앱 개요: `README.md`
- 개발 작업 목록: `tasks.md`

---
본 README는 매뉴얼의 “맵” 역할을 합니다. 각 섹션 작성 시 본 구조를 기준으로 문서를 추가하고, 완료 후 본 리스트의 To‑Do를 체크하세요.
