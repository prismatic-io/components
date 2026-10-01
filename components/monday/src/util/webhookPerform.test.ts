import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";
import { describe, expect, it, vi } from "vitest";
import { perform } from "./webhookPerform";
const mockLogger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
  metric: vi.fn(),
  trace: vi.fn(),
};
const makeContext = (overrides: Partial<ActionContext> = {}) =>
  ({
    logger: mockLogger,
    isSimulatedTestExecution: false,
    ...overrides,
  }) as unknown as ActionContext;
const makePayload = (overrides: Partial<TriggerPayload> = {}) =>
  ({
    headers: {},
    body: { data: {} },
    ...overrides,
  }) as unknown as TriggerPayload;
describe("webhookPerform", () => {
  describe("challenge verification", () => {
    it("returns challenge response when body contains a challenge", async () => {
      const payload = makePayload({
        body: {
          data: { challenge: "abc123" },
          contentType: "application/json",
        },
      });
      const result = await perform(makeContext(), payload, {});
      expect(result.branch).toBe("Challenge Verification");
      expect(result.response?.statusCode).toBe(200);
      expect(JSON.parse(result.response?.body as string)).toEqual({
        challenge: "abc123",
      });
    });
    it("takes priority over signature verification", async () => {
      const payload = makePayload({
        headers: { authorization: "wrong" },
        body: { data: { challenge: "test" }, contentType: "application/json" },
      });
      const result = await perform(makeContext(), payload, {
        signingSecret: "secret",
      });
      expect(result.branch).toBe("Challenge Verification");
    });
  });
  describe("signature verification", () => {
    it("passes when authorization header matches signing secret", async () => {
      const payload = makePayload({
        headers: { Authorization: "my-secret" },
      });
      const result = await perform(makeContext(), payload, {
        signingSecret: "my-secret",
      });
      expect(result.branch).toBe("Notification");
    });
    it("is case-insensitive on the header name", async () => {
      const payload = makePayload({
        headers: { AUTHORIZATION: "my-secret" },
      });
      const result = await perform(makeContext(), payload, {
        signingSecret: "my-secret",
      });
      expect(result.branch).toBe("Notification");
    });
    it("throws when authorization header does not match", async () => {
      const payload = makePayload({
        headers: { authorization: "wrong" },
      });
      await expect(
        perform(makeContext(), payload, { signingSecret: "correct" }),
      ).rejects.toThrow("Signature verification failed");
    });
    it("skips verification during simulated test execution", async () => {
      const payload = makePayload({
        headers: { authorization: "wrong" },
      });
      const result = await perform(
        makeContext({ isSimulatedTestExecution: true }),
        payload,
        { signingSecret: "correct" },
      );
      expect(result.branch).toBe("Notification");
    });
    it("skips verification when no signing secret is provided", async () => {
      const payload = makePayload();
      const result = await perform(makeContext(), payload, {});
      expect(result.branch).toBe("Notification");
    });
  });
});
