#!/usr/bin/env node

/**
 * fBoard MCP Server
 *
 * Usage:
 *   node index.js [--server=<url>]
 *
 * Arguments:
 *   --server=<url> : (옵션) fBoard REST API 서버 주소 (기본값: http://localhost:3012)
 *
 * Environment:
 *   FBOARD_SERVER : fBoard REST API 서버 주소 (--server 옵션보다 우선순위 낮음)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 서버 주소 결정: CLI 인자 > 환경변수 > 기본값
function getServerUrl() {
  const arg = process.argv.find((a) => a.startsWith("--server="));
  if (arg) return arg.split("=").slice(1).join("=");
  return process.env.FBOARD_SERVER || "http://localhost:3012";
}

const SERVER_URL = getServerUrl();

const server = new McpServer({
  name: "fboard-mcp",
  version: "1.0.0",
});

// 공통 헬퍼: JSON GET 요청
async function jsonGet(path) {
  const res = await fetch(`${SERVER_URL}${path}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
  return await res.json();
}

// 공통 헬퍼: JSON POST 요청
async function jsonPost(path, body = {}) {
  const res = await fetch(`${SERVER_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return await res.json();
}

// 공통 헬퍼: JSON DELETE 요청
async function jsonDelete(path) {
  const res = await fetch(`${SERVER_URL}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return await res.json();
}

// 공통 성공 응답
function textResult(data) {
  return {
    content: [
      {
        type: "text",
        text: typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

// 공통 에러 응답
function errorResult(message) {
  return {
    isError: true,
    content: [
      {
        type: "text",
        text: `${message}\n서버 주소: ${SERVER_URL}`,
      },
    ],
  };
}

// ─── Tool 1: health_check ───
server.tool(
  "health_check",
  "fBoard 서버 상태를 확인합니다",
  {},
  async () => {
    try {
      const res = await fetch(SERVER_URL);
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const json = await res.json();
        return textResult(json);
      }

      return textResult(`서버 응답: ${res.status} ${res.statusText}`);
    } catch (err) {
      return errorResult(`서버 연결 실패: ${err.message}`);
    }
  }
);

// ─── Tool 2: get_status ───
server.tool(
  "get_status",
  "fBoard 전체 상태를 조회합니다 (윈도우, 배경, 프리셋 등)",
  {},
  async () => {
    try {
      const data = await jsonGet("/api/status");
      return textResult(data);
    } catch (err) {
      return errorResult(`상태 조회 실패: ${err.message}`);
    }
  }
);

// ─── Tool 3: get_window ───
server.tool(
  "get_window",
  "윈도우 상태를 조회합니다 (위치, 크기, 레벨, 스크린 정보)",
  {},
  async () => {
    try {
      const data = await jsonGet("/api/window");
      return textResult(data);
    } catch (err) {
      return errorResult(`윈도우 상태 조회 실패: ${err.message}`);
    }
  }
);

// ─── Tool 4: set_window_level ───
server.tool(
  "set_window_level",
  "윈도우 레벨을 설정합니다 (normal: 일반, floating: 항상 위, background: 배경)",
  {
    level: z
      .enum(["normal", "floating", "background"])
      .describe("윈도우 레벨: normal(일반), floating(항상 위), background(배경)"),
  },
  async ({ level }) => {
    try {
      const data = await jsonPost("/api/window/level", { level });
      return textResult(data);
    } catch (err) {
      return errorResult(`윈도우 레벨 설정 실패: ${err.message}`);
    }
  }
);

// ─── Tool 5: set_window_frame ───
server.tool(
  "set_window_frame",
  "윈도우 위치와 크기를 설정합니다",
  {
    x: z.number().optional().describe("윈도우 X 좌표"),
    y: z.number().optional().describe("윈도우 Y 좌표"),
    width: z.number().optional().describe("윈도우 너비"),
    height: z.number().optional().describe("윈도우 높이"),
  },
  async ({ x, y, width, height }) => {
    try {
      const body = {};
      if (x !== undefined) body.x = x;
      if (y !== undefined) body.y = y;
      if (width !== undefined) body.width = width;
      if (height !== undefined) body.height = height;
      const data = await jsonPost("/api/window/frame", body);
      return textResult(data);
    } catch (err) {
      return errorResult(`윈도우 프레임 설정 실패: ${err.message}`);
    }
  }
);

// ─── Tool 6: center_window ───
server.tool(
  "center_window",
  "윈도우를 현재 스크린 중앙에 정렬합니다",
  {},
  async () => {
    try {
      const data = await jsonPost("/api/window/center");
      return textResult(data);
    } catch (err) {
      return errorResult(`윈도우 중앙 정렬 실패: ${err.message}`);
    }
  }
);

// ─── Tool 7: reset_window ───
server.tool(
  "reset_window",
  "윈도우를 기본 크기로 복원합니다",
  {},
  async () => {
    try {
      const data = await jsonPost("/api/window/reset");
      return textResult(data);
    } catch (err) {
      return errorResult(`윈도우 복원 실패: ${err.message}`);
    }
  }
);

// ─── Tool 8: toggle_fullscreen ───
server.tool(
  "toggle_fullscreen",
  "전체 화면 모드를 토글합니다",
  {},
  async () => {
    try {
      const data = await jsonPost("/api/window/fullscreen");
      return textResult(data);
    } catch (err) {
      return errorResult(`전체 화면 토글 실패: ${err.message}`);
    }
  }
);

// ─── Tool 9: move_to_screen ───
server.tool(
  "move_to_screen",
  "윈도우를 특정 스크린(모니터)으로 이동합니다",
  {
    screenIndex: z
      .number()
      .int()
      .describe("이동할 스크린 인덱스 (0부터 시작)"),
  },
  async ({ screenIndex }) => {
    try {
      const data = await jsonPost("/api/window/move-screen", { screenIndex });
      return textResult(data);
    } catch (err) {
      return errorResult(`스크린 이동 실패: ${err.message}`);
    }
  }
);

// ─── Tool 10: get_background ───
server.tool(
  "get_background",
  "배경 상태를 조회합니다 (배경색, 이미지, 채우기 모드)",
  {},
  async () => {
    try {
      const data = await jsonGet("/api/background");
      return textResult(data);
    } catch (err) {
      return errorResult(`배경 상태 조회 실패: ${err.message}`);
    }
  }
);

// ─── Tool 11: set_background_color ───
server.tool(
  "set_background_color",
  "배경색을 설정합니다 (hex 색상 코드)",
  {
    color: z
      .string()
      .describe("배경색 hex 코드 (예: #FF0000, #FFFFFF)"),
    opacity: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .describe("불투명도 (0.0~1.0, 기본값: 1.0)"),
  },
  async ({ color, opacity }) => {
    try {
      const body = { color };
      if (opacity !== undefined) body.opacity = opacity;
      const data = await jsonPost("/api/background/color", body);
      return textResult(data);
    } catch (err) {
      return errorResult(`배경색 설정 실패: ${err.message}`);
    }
  }
);

// ─── Tool 12: set_background_image ───
server.tool(
  "set_background_image",
  "배경 이미지를 설정합니다 (파일 경로 지정)",
  {
    path: z.string().describe("이미지 파일 경로"),
    fillMode: z
      .enum(["fit", "fill", "stretch", "tile"])
      .optional()
      .describe("이미지 채우기 모드: fit, fill, stretch, tile"),
  },
  async ({ path, fillMode }) => {
    try {
      const body = { path };
      if (fillMode) body.fillMode = fillMode;
      const data = await jsonPost("/api/background/image", body);
      return textResult(data);
    } catch (err) {
      return errorResult(`배경 이미지 설정 실패: ${err.message}`);
    }
  }
);

// ─── Tool 13: remove_background_image ───
server.tool(
  "remove_background_image",
  "배경 이미지를 제거합니다",
  {},
  async () => {
    try {
      const data = await jsonDelete("/api/background/image");
      return textResult(data);
    } catch (err) {
      return errorResult(`배경 이미지 제거 실패: ${err.message}`);
    }
  }
);

// ─── Tool 14: set_fill_mode ───
server.tool(
  "set_fill_mode",
  "이미지 채우기 모드를 변경합니다",
  {
    fillMode: z
      .enum(["fit", "fill", "stretch", "tile"])
      .describe("채우기 모드: fit(맞춤), fill(채우기), stretch(늘리기), tile(타일)"),
  },
  async ({ fillMode }) => {
    try {
      const data = await jsonPost("/api/background/fill-mode", { fillMode });
      return textResult(data);
    } catch (err) {
      return errorResult(`채우기 모드 변경 실패: ${err.message}`);
    }
  }
);

// ─── Tool 15: get_presets ───
server.tool(
  "get_presets",
  "저장된 프리셋 목록을 조회합니다",
  {},
  async () => {
    try {
      const data = await jsonGet("/api/presets");
      return textResult(data);
    } catch (err) {
      return errorResult(`프리셋 목록 조회 실패: ${err.message}`);
    }
  }
);

// ─── Tool 16: save_preset ───
server.tool(
  "save_preset",
  "현재 윈도우 상태를 프리셋으로 저장합니다",
  {
    name: z.string().describe("프리셋 이름"),
  },
  async ({ name }) => {
    try {
      const data = await jsonPost("/api/presets", { name });
      return textResult(data);
    } catch (err) {
      return errorResult(`프리셋 저장 실패: ${err.message}`);
    }
  }
);

// ─── Tool 17: apply_preset ───
server.tool(
  "apply_preset",
  "저장된 프리셋을 적용합니다",
  {
    id: z.string().describe("프리셋 ID (UUID)"),
  },
  async ({ id }) => {
    try {
      const data = await jsonPost("/api/presets/apply", { id });
      return textResult(data);
    } catch (err) {
      return errorResult(`프리셋 적용 실패: ${err.message}`);
    }
  }
);

// ─── Tool 18: delete_preset ───
server.tool(
  "delete_preset",
  "프리셋을 삭제합니다",
  {
    id: z.string().describe("삭제할 프리셋 ID (UUID)"),
  },
  async ({ id }) => {
    try {
      const data = await jsonDelete(`/api/presets/${id}`);
      return textResult(data);
    } catch (err) {
      return errorResult(`프리셋 삭제 실패: ${err.message}`);
    }
  }
);

// ─── Tool 19: get_screens ───
server.tool(
  "get_screens",
  "연결된 스크린(모니터) 목록을 조회합니다",
  {},
  async () => {
    try {
      const data = await jsonGet("/api/screens");
      return textResult(data);
    } catch (err) {
      return errorResult(`스크린 목록 조회 실패: ${err.message}`);
    }
  }
);

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP 서버 시작 실패:", err);
  process.exit(1);
});
