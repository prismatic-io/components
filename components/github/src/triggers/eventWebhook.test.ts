import crypto from "node:crypto";
import type { TriggerPayload } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import { eventWebhook } from "./eventWebhook";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
afterEach(() => nock.cleanAll());
const signatureFor = (secret: string, body: string) =>
  `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
const buildPayload = (
  body: string,
  headers: Record<string, string> = {},
): TriggerPayload =>
  ({
    headers,
    queryParameters: {},
    rawBody: { data: body },
    body: { data: JSON.parse(body || "{}") },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "exec",
    customer: { id: "c", name: "c", externalId: "e" },
    instance: { id: "i", name: "i" },
    user: { id: "u", email: "u@e.com", name: "u" },
    integration: { id: "int", versionSequenceId: "v" },
    flow: { id: "f", name: "f" },
    startedAt: new Date().toISOString(),
  }) as unknown as TriggerPayload;
describe("eventWebhook trigger", () => {
  test("returns the payload unchanged on a simulated test execution", async () => {
    const payload = buildPayload('{"action":"closed"}');
    const { result } = await invokeTrigger(
      eventWebhook,
      { isSimulatedTestExecution: true },
      payload,
      {} as never,
    );
    expect(result?.payload.body).toEqual(payload.body);
    expect(result?.payload.executionId).toBe(payload.executionId);
  });
  test("validates the signature against the crossFlowState secret", async () => {
    const secret = "flow-secret";
    const body = JSON.stringify({ action: "closed" });
    const payload = buildPayload(body, {
      "x-hub-signature-256": signatureFor(secret, body),
    });
    const { result } = await invokeTrigger(
      eventWebhook,
      {
        flow: { id: "f", name: "f" },
        crossFlowState: { f_secret: secret },
      } as never,
      payload,
      {} as never,
    );
    expect(result?.payload).toBeDefined();
  });
  test("throws when the crossFlowState secret does not match", async () => {
    const body = JSON.stringify({ action: "closed" });
    const payload = buildPayload(body, {
      "x-hub-signature-256": "sha256=deadbeef",
    });
    await expect(
      invokeTrigger(
        eventWebhook,
        {
          flow: { id: "f", name: "f" },
          crossFlowState: { f_secret: "flow-secret" },
        } as never,
        payload,
        {} as never,
      ),
    ).rejects.toThrow(/does not match the configured GitHub signing key/);
  });
  test("create lifecycle handler POSTs a webhook and stores id + secret", async () => {
    const store: Record<string, unknown> = {};
    nock(BASE).post("/repos/octocat/Hello-World/hooks").reply(201, { id: 999 });
    await eventWebhook.webhookLifecycleHandlers?.create(
      {
        debug: { enabled: false },
        logger: loggerMock(),
        webhookUrls: { f: "https://example.com/webhook" },
        flow: { id: "f", name: "f" },
        crossFlowState: store,
      } as never,
      {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        events: ["push"],
      } as never,
    );
    expect(store.f).toBe(999);
    expect(typeof store.f_secret).toBe("string");
  });
  test("delete lifecycle handler DELETEs the stored webhook id", async () => {
    const store: Record<string, unknown> = { f: 999, f_secret: "abc" };
    const scope = nock(BASE)
      .delete("/repos/octocat/Hello-World/hooks/999")
      .reply(204);
    await eventWebhook.webhookLifecycleHandlers?.delete(
      {
        debug: { enabled: false },
        logger: loggerMock(),
        flow: { id: "f", name: "f" },
        crossFlowState: store,
      } as never,
      {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        events: ["push"],
      } as never,
    );
    expect(scope.isDone()).toBe(true);
    expect(store.f).toBeUndefined();
  });
});
