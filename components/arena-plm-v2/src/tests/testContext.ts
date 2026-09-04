import type { ArenaAuthContext } from "../types";
export interface CapturedLog {
  level: string;
  args: unknown[];
}
export interface TestContext extends ArenaAuthContext {
  logs: CapturedLog[];
}
export const createTestContext = (): TestContext => {
  const logs: CapturedLog[] = [];
  const capture =
    (level: string) =>
    (...args: unknown[]) => {
      logs.push({ level, args });
    };
  return {
    logger: {
      metric: capture("metric"),
      trace: capture("trace"),
      debug: capture("debug"),
      info: capture("info"),
      log: capture("log"),
      warn: capture("warn"),
      error: capture("error"),
    },
    executionState: {},
    logs,
  };
};
