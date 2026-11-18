import { createHmac } from "node:crypto";
import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";
import { describe, expect, it, vi } from "vitest";
import { perform } from "./webhookPerform";

const SECRET = "test-signing-secret";

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (secret: string) => {
  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({ exp: Math.floor(Date.now() / 1000) + 300 });
  const signature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
};

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
    it("passes when the Authorization JWT is signed with the signing secret", async () => {
      const payload = makePayload({
        headers: { Authorization: sign(SECRET) },
      });
      const result = await perform(makeContext(), payload, {
        signingSecret: SECRET,
      });
      expect(result.branch).toBe("Notification");
    });

    it("is case-insensitive on the header name", async () => {
      const payload = makePayload({
        headers: { AUTHORIZATION: sign(SECRET) },
      });
      const result = await perform(makeContext(), payload, {
        signingSecret: SECRET,
      });
      expect(result.branch).toBe("Notification");
    });

    it("throws when the JWT is signed with a different secret", async () => {
      const payload = makePayload({
        headers: { authorization: sign("another-secret") },
      });
      await expect(
        perform(makeContext(), payload, { signingSecret: SECRET }),
      ).rejects.toThrow("Signature verification failed");
    });

    it("logs the failure reason but does not return it to the sender", async () => {
      mockLogger.error.mockClear();
      const payload = makePayload({
        headers: { authorization: sign("another-secret") },
      });
      const error = await perform(makeContext(), payload, {
        signingSecret: SECRET,
      }).catch((caught: Error) => caught);
      expect((error as Error).message).not.toContain("does not match");
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "the JWT signature does not match the Signing Secret",
        ),
      );
    });

    it("throws when the raw signing secret is sent as the header", async () => {
      const payload = makePayload({
        headers: { authorization: SECRET },
      });
      await expect(
        perform(makeContext(), payload, { signingSecret: SECRET }),
      ).rejects.toThrow("Signature verification failed");
    });

    it("throws when the Authorization header is missing", async () => {
      mockLogger.error.mockClear();
      await expect(
        perform(makeContext(), makePayload(), { signingSecret: SECRET }),
      ).rejects.toThrow("Signature verification failed");
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining("no Authorization header"),
      );
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
