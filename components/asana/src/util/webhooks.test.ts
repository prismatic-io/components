import crypto from "node:crypto";
import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";
import type { WebhookFilterSettings } from "../types";
import {
  getFilters,
  isHeartbeatData,
  resolveWebhookSecret,
  resolveWebhookSecrets,
  validateHmac,
} from "./webhooks";
describe("isHeartbeatData", () => {
  it("returns true for object with empty events array", () => {
    expect(isHeartbeatData({ events: [] })).toBe(true);
  });
  it("returns false for object with non-empty events", () => {
    expect(isHeartbeatData({ events: [{ action: "changed" }] })).toBe(false);
  });
  it("returns false for null", () => {
    expect(isHeartbeatData(null)).toBe(false);
  });
  it("returns false for non-object", () => {
    expect(isHeartbeatData("string")).toBe(false);
  });
  it("returns false for object without events", () => {
    expect(isHeartbeatData({ data: [] })).toBe(false);
  });
});
describe("getFilters", () => {
  const allFalse: WebhookFilterSettings = {
    triggerWhenAdded: false,
    triggerWhenChanged: false,
    triggerWhenDeleted: false,
    triggerWhenRemoved: false,
    triggerWhenUndeleted: false,
  };
  it("returns empty array when all flags are false", () => {
    expect(getFilters(allFalse, "task")).toEqual([]);
  });
  it("returns filters for enabled flags only", () => {
    const settings: WebhookFilterSettings = {
      ...allFalse,
      triggerWhenAdded: true,
      triggerWhenChanged: true,
    };
    expect(getFilters(settings, "task")).toEqual([
      { resource_type: "task", action: "added" },
      { resource_type: "task", action: "changed" },
    ]);
  });
  it("returns all 5 filters when all flags are true", () => {
    const allTrue: WebhookFilterSettings = {
      triggerWhenAdded: true,
      triggerWhenChanged: true,
      triggerWhenDeleted: true,
      triggerWhenRemoved: true,
      triggerWhenUndeleted: true,
    };
    const result = getFilters(allTrue, "story");
    expect(result).toHaveLength(5);
    expect(result.map((f) => f.action)).toEqual([
      "added",
      "changed",
      "deleted",
      "removed",
      "undeleted",
    ]);
    for (const filter of result) {
      expect(filter.resource_type).toBe("story");
    }
  });
});
describe("validateHmac", () => {
  const makePayload = (body: string) =>
    ({
      rawBody: { data: body },
    }) as unknown as TriggerPayload;
  it("does not throw when signature matches one of the secrets", () => {
    const body = '{"events":[]}';
    const secret = "test-secret";
    const signature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    expect(() =>
      validateHmac(makePayload(body), signature, ["wrong", secret]),
    ).not.toThrow();
  });
  it("throws when no secret matches", () => {
    expect(() =>
      validateHmac(makePayload("body"), "bad-signature", ["secret1"]),
    ).toThrow("does not match a known Asana signing key");
  });
  it("throws for empty secrets array", () => {
    expect(() => validateHmac(makePayload("body"), "sig", [])).toThrow(
      "does not match a known Asana signing key",
    );
  });
});
describe("resolveWebhookSecrets", () => {
  const makeContext = (
    crossFlowState: Record<string, unknown>,
    instanceState: Record<string, unknown>,
  ) =>
    ({
      crossFlowState,
      instanceState,
      flow: { stableId: "flow-1" },
    }) as unknown as ActionContext;
  it("returns crossFlowState secrets when present", () => {
    const ctx = makeContext(
      { "asana-webhook-secrets:flow-1": ["secret-new"] },
      { webhookSecrets: ["secret-legacy"] },
    );
    const result = resolveWebhookSecrets(ctx);
    expect(result.value).toEqual(["secret-new"]);
    expect(result.isLegacy).toBe(false);
  });
  it("falls back to instanceState legacy secrets", () => {
    const ctx = makeContext({}, { webhookSecrets: ["secret-legacy"] });
    const result = resolveWebhookSecrets(ctx);
    expect(result.value).toEqual(["secret-legacy"]);
    expect(result.isLegacy).toBe(true);
  });
  it("returns empty array when no secrets exist", () => {
    const ctx = makeContext({}, {});
    const result = resolveWebhookSecrets(ctx);
    expect(result.value).toEqual([]);
    expect(result.isLegacy).toBe(false);
  });
});
describe("resolveWebhookSecret", () => {
  const makeContext = (
    crossFlowState: Record<string, unknown>,
    instanceState: Record<string, unknown>,
  ) =>
    ({
      crossFlowState,
      instanceState,
      flow: { stableId: "flow-1" },
    }) as unknown as ActionContext;
  it("returns crossFlowState secret when present", () => {
    const ctx = makeContext(
      { "asana-webhook-secret:flow-1": "new-secret" },
      { webhookSecret: "legacy-secret" },
    );
    const result = resolveWebhookSecret(ctx);
    expect(result.value).toBe("new-secret");
    expect(result.isLegacy).toBe(false);
  });
  it("falls back to instanceState legacy secret", () => {
    const ctx = makeContext({}, { webhookSecret: "legacy-secret" });
    const result = resolveWebhookSecret(ctx);
    expect(result.value).toBe("legacy-secret");
    expect(result.isLegacy).toBe(true);
  });
  it("returns empty string when no secret exists", () => {
    const ctx = makeContext({}, {});
    const result = resolveWebhookSecret(ctx);
    expect(result.value).toBe("");
    expect(result.isLegacy).toBe(false);
  });
});
