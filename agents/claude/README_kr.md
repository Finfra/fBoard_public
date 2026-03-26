---
title: fBoard Claude Code Plugin
description: fBoard Claude Code Plugin 문서
date: 2026-03-26
---

# 새 위치

fBoard Claude Code 플러그인은 통합 플러그인 레포지토리에서 관리됩니다:

- **레포지토리**: [Finfra/f-claude-plugins](https://github.com/Finfra/f-claude-plugins)
- **경로**: `fBoard/`

# 설치 방법

```
/plugin marketplace add Finfra/f-claude-plugins
/plugin install fboard@f-claude-plugins
```

# 수동 설치

```bash
git clone https://github.com/Finfra/f-claude-plugins.git
cp -r f-claude-plugins/fBoard/plugin.json .claude-plugin/plugin.json
cp -r f-claude-plugins/fBoard/skills .claude/skills
```
