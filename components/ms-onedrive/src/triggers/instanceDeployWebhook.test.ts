import { defaultTriggerPayload } from "@prismatic-io/spectral/testing";
import {
  DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES,
  GRAPH_SUBSCRIPTION_MAX_MINUTES,
} from "ms-utils";
import { type Mock, vi } from "vitest";
import { getOneDriveClient } from "../client";
import {
  RENEWAL_EXPIRATION_MINUTES,
  SUBSCRIPTION_TIMEOUT_MS,
} from "../constants";
import { TriggerBranches } from "../enums";
import { instanceDeployWebhookInputs } from "../inputs";
import { instanceDeployWebhook } from "./instanceDeployWebhook";

const getMock: Mock = vi.fn();
const postMock: Mock = vi.fn();
const patchMock: Mock = vi.fn();
const deleteMock: Mock = vi.fn();

vi.mock("../client", () => ({
  getOneDriveClient: vi.fn(() => ({
    get: getMock,
    post: postMock,
    patch: patchMock,
    delete: deleteMock,
  })),
}));

const NOW = new Date("2026-11-09T12:00:00.000Z");
const FLOW_KEY = "SW5zdGFuY2VGbG93Q29uZmlnOmFiYw==";
const WEBHOOK_URL = `https://hooks.example.prismatic-dev.io/trigger/${FLOW_KEY}`;
const RENEWED_EXPIRATION = new Date(
  NOW.getTime() + RENEWAL_EXPIRATION_MINUTES * 60 * 1000,
).toISOString();
const CREATION_DEFAULT_EXPIRATION = new Date(
  NOW.getTime() + DEFAULT_SUBSCRIPTION_EXPIRATION_MINUTES * 60 * 1000,
).toISOString();

const oneDriveConnection = {
  key: "oauth2",
  fields: {},
  token: { access_token: "t" },
} as never;

const params = {
  oneDriveConnection,
  resource: "/me/drive/root",
  changeType: "updated",
  clientState: "secret",
  expirationDateTime: "2026-11-16T12:00:00.000Z",
};

const makeCtx = (crossFlowState: Record<string, unknown> = {}) => ({
  logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn() },
  debug: { enabled: false },
  flow: { id: "flow-1", name: "Drive flow" },
  webhookUrls: { "Drive flow": WEBHOOK_URL },
  crossFlowState,
});

const payloadWith = (overrides: Record<string, unknown>) => ({
  ...defaultTriggerPayload(),
  ...overrides,
});

const scheduledPayload = () =>
  payloadWith({ headers: { "prismatic-invoke-type": "Scheduled" } });

const notificationPayload = (clientState = "secret") =>
  payloadWith({
    body: {
      data: {
        value: [
          {
            subscriptionId: "sub-1",
            clientState,
            changeType: "updated",
            resource: "me/drive/root",
          },
        ],
      },
    },
  });

const lifecyclePayload = (
  lifecycleEvent: string,
  subscriptionId: string,
  clientState = "secret",
) =>
  payloadWith({
    body: {
      data: {
        value: [
          {
            subscriptionId,
            subscriptionExpirationDateTime: "2026-11-10T00:00:00.000Z",
            tenantId: "tenant-1",
            clientState,
            lifecycleEvent,
          },
        ],
      },
    },
  });

const subscription = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  resource: "/me/drive/root",
  changeType: "updated",
  notificationUrl: WEBHOOK_URL,
  expirationDateTime: "2026-11-10T00:00:00.000Z",
  ...overrides,
});

const expectedCreateBody = (expirationDateTime: string) => ({
  changeType: "updated",
  notificationUrl: WEBHOOK_URL,
  resource: "/me/drive/root",
  expirationDateTime,
  clientState: "secret",
  lifecycleNotificationUrl: WEBHOOK_URL,
});

type PerformResult = {
  branch: string;
  response?: { statusCode: number; contentType: string; body?: string };
  crossFlowState?: Record<string, unknown>;
};

const run = async (
  payload: unknown,
  crossFlowState: Record<string, unknown> = {},
) => {
  const ctx = makeCtx(crossFlowState);
  const result = (await instanceDeployWebhook.perform(
    ctx as never,
    payload as never,
    params as never,
  )) as unknown as PerformResult;
  return { result, ctx };
};

beforeEach(() => {
  vi.setSystemTime(NOW);
  getMock.mockReset();
  postMock.mockReset();
  patchMock.mockReset();
  deleteMock.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Drive Subscription trigger declaration", () => {
  test("renews to 10 minutes under the Microsoft Graph maximum for drive resources", () => {
    expect(RENEWAL_EXPIRATION_MINUTES).toBe(
      GRAPH_SUBSCRIPTION_MAX_MINUTES.DRIVE_ITEM - 10,
    );
  });

  test("accepts a schedule while keeping synchronous responses", () => {
    expect(instanceDeployWebhook.scheduleSupport).toBe("valid");
    expect(instanceDeployWebhook.synchronousResponseSupport).toBe("valid");
  });

  test("exposes the renewal and lifecycle branches after the existing ones", () => {
    expect(instanceDeployWebhook.staticBranchNames).toEqual([
      "Notification",
      "URL Validation",
      "Scheduled Renewal",
      "Lifecycle Event",
    ]);
  });

  test("tells builders the trigger supports scheduled renewal", () => {
    expect(instanceDeployWebhook.display.description).toContain(
      "Supports scheduled renewal to keep the subscription active.",
    );
  });
});

describe("expirationDateTime input", () => {
  test("cleans an empty value to the shared creation default, about seven days from now", () => {
    expect(
      instanceDeployWebhookInputs.expirationDateTime.clean?.(undefined),
    ).toBe(CREATION_DEFAULT_EXPIRATION);
  });

  test("documents the real default instead of three days", () => {
    expect(
      instanceDeployWebhookInputs.expirationDateTime.comments,
    ).not.toContain("3 days");
    expect(instanceDeployWebhookInputs.expirationDateTime.comments).toContain(
      "7 days",
    );
  });
});

describe("URL validation and change notifications", () => {
  test("answers Microsoft's validation request with the token", async () => {
    const { result } = await run(
      payloadWith({ queryParameters: { validationToken: "abc" } }),
    );

    expect(result.branch).toBe(TriggerBranches.URLValidation);
    expect(result.response).toEqual({
      statusCode: 200,
      contentType: "text/plain",
      body: "abc",
    });
    expect(getMock).not.toHaveBeenCalled();
  });

  test("routes change notifications to the Notification branch without calling Graph", async () => {
    const { result, ctx } = await run(notificationPayload());

    expect(result.branch).toBe(TriggerBranches.Notification);
    expect(result.response).toBeUndefined();
    expect(result.crossFlowState).toBeUndefined();
    expect(ctx.logger.warn).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
    expect(patchMock).not.toHaveBeenCalled();
  });

  test("warns when the notification's clientState does not match", async () => {
    const { result, ctx } = await run(notificationPayload("someone-else"));

    expect(result.branch).toBe(TriggerBranches.Notification);
    expect(ctx.logger.warn).toHaveBeenCalledWith(
      "ClientState mismatch in webhook notification. Expected: [REDACTED], Received: [REDACTED]",
    );
  });
});

describe("scheduled renewal", () => {
  test("renews the stored subscription", async () => {
    patchMock.mockResolvedValue({ data: subscription("stored-id") });

    const { result } = await run(scheduledPayload(), {
      [FLOW_KEY]: "stored-id",
    });

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/stored-id", {
      expirationDateTime: RENEWED_EXPIRATION,
    });
    expect(getMock).not.toHaveBeenCalled();
    expect(result.branch).toBe(TriggerBranches.ScheduledRenewal);
    expect(result.crossFlowState).toBeUndefined();
  });

  test("falls back to the subscriptions on the flow URL when no id is stored", async () => {
    getMock.mockResolvedValue({
      data: {
        value: [
          subscription("found-id"),
          subscription("other-flow", {
            notificationUrl: "https://hooks.example/trigger/other",
          }),
        ],
      },
    });
    patchMock.mockResolvedValue({ data: subscription("found-id") });

    const { result } = await run(scheduledPayload());

    expect(getMock).toHaveBeenCalledWith("/subscriptions", { params: {} });
    expect(patchMock).toHaveBeenCalledTimes(1);
    expect(patchMock).toHaveBeenCalledWith("/subscriptions/found-id", {
      expirationDateTime: RENEWED_EXPIRATION,
    });
    expect(result.branch).toBe(TriggerBranches.ScheduledRenewal);
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "found-id" });
  });

  test("recreates the subscription when nothing is left to renew", async () => {
    patchMock.mockRejectedValue(
      new Error("Request failed with status code 404"),
    );
    getMock.mockResolvedValue({ data: { value: [] } });
    postMock.mockResolvedValue({ data: subscription("new-id") });

    const { result } = await run(scheduledPayload(), {
      [FLOW_KEY]: "gone-id",
    });

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/gone-id", {
      expirationDateTime: RENEWED_EXPIRATION,
    });
    expect(postMock).toHaveBeenCalledWith(
      "/subscriptions",
      expectedCreateBody(RENEWED_EXPIRATION),
    );
    expect(result.branch).toBe(TriggerBranches.ScheduledRenewal);
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "new-id" });
  });
});

describe("lifecycle notifications", () => {
  test("renews and stores the subscription Graph asks to reauthorize", async () => {
    patchMock.mockResolvedValue({ data: subscription("life-id") });

    const { result } = await run(
      lifecyclePayload("reauthorizationRequired", "life-id"),
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/life-id", {
      expirationDateTime: RENEWED_EXPIRATION,
    });
    expect(result.branch).toBe(TriggerBranches.LifecycleEvent);
    expect(result.response).toEqual({
      statusCode: 202,
      contentType: "text/plain",
    });
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "life-id" });
  });

  test("creates a replacement when the reauthorization renewal fails", async () => {
    patchMock.mockRejectedValue(
      Object.assign(new Error("Request failed with status code 404"), {
        response: { status: 404 },
      }),
    );
    getMock.mockResolvedValue({ data: { value: [] } });
    postMock.mockResolvedValue({ data: subscription("replacement-id") });

    const { result, ctx } = await run(
      lifecyclePayload("reauthorizationRequired", "gone-id"),
    );

    expect(patchMock).toHaveBeenCalledWith("/subscriptions/gone-id", {
      expirationDateTime: RENEWED_EXPIRATION,
    });
    expect(postMock).toHaveBeenCalledWith(
      "/subscriptions",
      expectedCreateBody(RENEWED_EXPIRATION),
    );
    expect(ctx.logger.warn).toHaveBeenCalledTimes(1);
    expect(result.branch).toBe(TriggerBranches.LifecycleEvent);
    expect(result.response?.statusCode).toBe(202);
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "replacement-id" });
    expect(ctx.logger.warn).toHaveBeenCalledWith(
      "Renewing subscription gone-id after a Graph lifecycle challenge failed; created replacement-id in its place.",
    );
  });

  test("keeps a subscription that is still alive when its reauthorization renewal fails", async () => {
    patchMock.mockRejectedValue(
      new Error("Request failed with status code 503"),
    );
    getMock.mockResolvedValue({ data: { value: [subscription("alive-id")] } });

    const { result, ctx } = await run(
      lifecyclePayload("reauthorizationRequired", "alive-id"),
    );

    expect(postMock).not.toHaveBeenCalled();
    expect(ctx.logger.warn).toHaveBeenCalledWith(
      "Renewing subscription alive-id after a Graph lifecycle challenge failed; it is still active and the next scheduled renewal will retry.",
    );
    expect(result.response?.statusCode).toBe(202);
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "alive-id" });
  });

  test("recreates a subscription Graph reports removed", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });
    postMock.mockResolvedValue({ data: subscription("again-id") });

    const { result } = await run(
      lifecyclePayload("subscriptionRemoved", "old-id"),
    );

    expect(postMock).toHaveBeenCalledWith(
      "/subscriptions",
      expectedCreateBody(RENEWED_EXPIRATION),
    );
    expect(patchMock).not.toHaveBeenCalled();
    expect(result.branch).toBe(TriggerBranches.LifecycleEvent);
    expect(result.response?.statusCode).toBe(202);
    expect(result.crossFlowState).toEqual({ [FLOW_KEY]: "again-id" });
  });

  test("passes a missed-notifications notice through without calling Graph", async () => {
    const { result, ctx } = await run(lifecyclePayload("missed", "sub-1"));

    expect(result.branch).toBe(TriggerBranches.LifecycleEvent);
    expect(result.response?.statusCode).toBe(202);
    expect(result.crossFlowState).toBeUndefined();
    expect(ctx.logger.warn).toHaveBeenCalledTimes(1);
    expect(getMock).not.toHaveBeenCalled();
    expect(patchMock).not.toHaveBeenCalled();
    expect(postMock).not.toHaveBeenCalled();
  });

  test("acknowledges but ignores a lifecycle entry whose clientState does not match", async () => {
    const { result, ctx } = await run(
      lifecyclePayload("reauthorizationRequired", "victim-id", "someone-else"),
    );

    expect(patchMock).not.toHaveBeenCalled();
    expect(postMock).not.toHaveBeenCalled();
    expect(result.crossFlowState).toBeUndefined();
    expect(result.branch).toBe(TriggerBranches.LifecycleEvent);
    expect(result.response?.statusCode).toBe(202);
    expect(ctx.logger.warn).toHaveBeenCalledWith(
      "ClientState mismatch in webhook notification. Expected: [REDACTED], Received: [REDACTED]",
    );
  });

  test("builds no Graph client for a notice it only acknowledges", async () => {
    const clientFactory = vi.mocked(getOneDriveClient);
    clientFactory.mockClear();

    await run(lifecyclePayload("missed", "sub-1"));
    await run(
      lifecyclePayload("reauthorizationRequired", "victim-id", "someone-else"),
    );

    expect(clientFactory).not.toHaveBeenCalled();
  });
});

describe("webhook lifecycle handlers", () => {
  test("create registers the flow URL for lifecycle notifications and stores the id", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });
    postMock.mockResolvedValue({ data: subscription("created-id") });

    const result = await instanceDeployWebhook.webhookLifecycleHandlers?.create(
      makeCtx() as never,
      params as never,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/subscriptions",
      expectedCreateBody("2026-11-16T12:00:00.000Z"),
    );
    expect(result).toEqual({ crossFlowState: { [FLOW_KEY]: "created-id" } });
  });

  test("create reuses a subscription already on the flow URL and stores its id", async () => {
    getMock.mockResolvedValue({
      data: { value: [subscription("existing-id")] },
    });

    const result = await instanceDeployWebhook.webhookLifecycleHandlers?.create(
      makeCtx() as never,
      params as never,
    );

    expect(postMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      crossFlowState: { [FLOW_KEY]: "existing-id" },
    });
  });

  test("delete removes the flow's subscriptions and clears the stored id", async () => {
    getMock.mockResolvedValue({ data: { value: [subscription("del-id")] } });
    deleteMock.mockResolvedValue({ data: {} });

    const result = await instanceDeployWebhook.webhookLifecycleHandlers?.delete(
      makeCtx({ [FLOW_KEY]: "del-id" }) as never,
      params as never,
    );

    expect(deleteMock).toHaveBeenCalledWith("/subscriptions/del-id");
    expect(result).toEqual({ crossFlowState: { [FLOW_KEY]: null } });
  });
});

describe("Graph client timeout", () => {
  const clientMock = vi.mocked(getOneDriveClient);

  beforeEach(() => {
    clientMock.mockClear();
  });

  test("scheduled renewal builds its client with the subscription timeout", async () => {
    patchMock.mockResolvedValue({ data: subscription("stored-id") });

    await run(scheduledPayload(), { [FLOW_KEY]: "stored-id" });

    expect(clientMock).toHaveBeenCalledWith(
      oneDriveConnection,
      false,
      SUBSCRIPTION_TIMEOUT_MS,
    );
  });

  test("create and delete build their clients with the subscription timeout", async () => {
    getMock.mockResolvedValue({ data: { value: [] } });
    postMock.mockResolvedValue({ data: subscription("created-id") });

    await instanceDeployWebhook.webhookLifecycleHandlers?.create(
      makeCtx() as never,
      params as never,
    );
    await instanceDeployWebhook.webhookLifecycleHandlers?.delete(
      makeCtx() as never,
      params as never,
    );

    expect(clientMock).toHaveBeenCalledTimes(2);
    for (const call of clientMock.mock.calls) {
      expect(call).toEqual([
        oneDriveConnection,
        false,
        SUBSCRIPTION_TIMEOUT_MS,
      ]);
    }
  });
});
