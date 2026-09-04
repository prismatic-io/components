import { describe, expect, test } from "vitest";
import { dynamicsWebhookTrigger } from "./dynamicsWebhookTrigger";
const createMockPayload = (overrides?: Record<string, unknown>) => ({
  headers: {
    "content-type": "application/json; charset=utf-8",
    "x-request-id": "req-123",
    "x-ms-dynamics-organization": "my-org",
    "x-ms-dynamics-entity-name": "account",
    "x-ms-dynamics-request-name": "Create",
  },
  queryParameters: {},
  body: {
    data: JSON.stringify({
      MessageName: "Create",
      PrimaryEntityName: "account",
      PrimaryEntityId: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
      InputParameters: [{ key: "Target", value: {} }],
      InitiatingUserId: "user-id-1",
    }),
  },
  rawBody: { data: "{}" },
  ...overrides,
});
const createMockContext = (overrides?: Record<string, unknown>) =>
  ({
    debug: { enabled: false },
    logger: { debug: () => {} },
    isSimulatedTestExecution: false,
    ...overrides,
  }) as any;
describe("dynamicsWebhookTrigger", () => {
  test("event branch: valid JSON body parsed, fields set, branch 'Event', status 200", async () => {
    const payload = createMockPayload();
    const ctx = createMockContext();
    const result = await dynamicsWebhookTrigger.perform(
      ctx,
      payload as any,
      {
        webhookKey: undefined,
      } as any,
    );
    expect(result.branch).toBe("Event");
    expect(result.response.statusCode).toBe(200);
    const p = result.payload as unknown as Record<string, unknown>;
    expect(p.bodyData).toBeDefined();
    expect(p.messageName).toBe("Create");
    expect(p.entityName).toBe("account");
    expect(p.requestId).toBe("req-123");
    expect(p.organization).toBe("my-org");
  });
  test("URL Validation early-return: x-ms-dynamics-request-name URL_VALIDATION header", async () => {
    const payload = createMockPayload({
      headers: {
        "content-type": "application/json",
        "x-ms-dynamics-request-name": "URL_VALIDATION",
      },
    });
    const ctx = createMockContext();
    const result = await dynamicsWebhookTrigger.perform(
      ctx,
      payload as any,
      {
        webhookKey: undefined,
      } as any,
    );
    expect(result.branch).toBe("URL Validation / Heartbeat");
    expect(result.response.statusCode).toBe(200);
  });
  test("webhook key verification: missing code query param throws auth error", async () => {
    const payload = createMockPayload({ queryParameters: {} });
    const ctx = createMockContext();
    await expect(
      dynamicsWebhookTrigger.perform(
        ctx,
        payload as any,
        {
          webhookKey: "secret-key-123",
        } as any,
      ),
    ).rejects.toThrow("Webhook authentication failed");
  });
  test("webhook key verification: wrong code query param throws auth error", async () => {
    const payload = createMockPayload({
      queryParameters: { code: "wrong-key" },
    });
    const ctx = createMockContext();
    await expect(
      dynamicsWebhookTrigger.perform(
        ctx,
        payload as any,
        {
          webhookKey: "secret-key-123",
        } as any,
      ),
    ).rejects.toThrow("Webhook authentication failed");
  });
  test("webhook key verification: correct code query param proceeds", async () => {
    const payload = createMockPayload({
      queryParameters: { code: "secret-key-123" },
    });
    const ctx = createMockContext();
    const result = await dynamicsWebhookTrigger.perform(
      ctx,
      payload as any,
      {
        webhookKey: "secret-key-123",
      } as any,
    );
    expect(result.branch).toBe("Event");
    expect(result.response.statusCode).toBe(200);
  });
});
