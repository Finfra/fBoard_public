# fBoard 매뉴얼 개요 (Manual Structure Overview)

본 문서는 fBoard 사용자/개발자 매뉴얼의 상위 구조와 작성 가이드를 정의합니다. 실제 세부 문서는 본 구조에 따라 하위 파일로 확장합니다.

## 목적과 범위
- 대상: 일반 사용자(설치/기본조작), 파워유저(배경 설정), 개발자(빌드/아키텍처)
- 범위: 개요 → 설치 → 사용자 가이드 → 기능 명세 → 레퍼런스 → 부록
- 규칙: 모든 링크는 리포지토리 루트 기준 상대 경로 사용, 한국어 우선

## 디렉토리 구조(제안)
- 01_Overview/
  - Introduction.md: fBoard 개요, 주요 기능(크롬리스 윈도우, 배경 설정)
  - Architecture.md: 아키텍처 요약 (Swift, AppKit, UserDefaults)
    - 참조: `prd.md`, `README.md`
- 02_Install/
  - Install_macOS.md: 요구사항(macOS 12.0+), 설치 방법, 빌드 절차
- 03_UserGuide/
  - WindowControl.md: 윈도우 이동, 크기 조절, 단축키 사용법
  - BackgroundSettings.md: 색상 및 이미지 배경 설정, 채우기 모드(맞춤, 채우기, 늘리기, 타일)
- 04_FunctionalSpec/
  - FunctionalSpecification.md: 핵심 기능 명세 및 동작 원리
- 05_Reference/
  - Shortcuts.md: 앱 내 단축키 (`Cmd + ,`, `Cmd + 0`, `Ctrl + Cmd + F` 등)
  - ReferenceAgenda.md: 매뉴얼 참조 어젠다
- 99_Appendix/
  - Glossary.md: 용어 사전(프로젝트 용어 통일)

## 작성 가이드
- 파일/제목 규칙: 폴더별 주제 중심, 명사형 제목 사용
- 링크 정책: 문서 간 교차 참조는 상대 경로 사용
- 버전/변경 이력: 릴리스 노트 등에 사용자 관점 요약 정리

## 향후 작성 일정(To‑Do)
- [ ] 01_Overview/Introduction.md 초안
- [ ] 02_Install/Install_macOS.md (요구사항 및 빌드 안내)
- [ ] 03_UserGuide/WindowControl.md (단축키 포함)
- [ ] 03_UserGuide/BackgroundSettings.md (설정 패널 캡처 포함)

## 관련 문서(핵심 링크)
- PRD: `prd.md`
- 앱 개요: `README.md`
- 개발 작업 목록: `tasks.md`

---
본 README는 매뉴얼의 “맵” 역할을 합니다. 각 섹션 작성 시 본 구조를 기준으로 문서를 추가하고, 완료 후 본 리스트의 To‑Do를 체크하세요.
