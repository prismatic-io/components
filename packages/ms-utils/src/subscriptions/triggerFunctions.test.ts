import {
  deleteSubscriptionTrigger,
  replaceSubscriptionOnDeploy,
} from "./triggerFunctions";

const FLOW_KEY = "SW5zdGFuY2VGbG93";
const WEBHOOK_URL = `https://hooks.example.com/trigger/${FLOW_KEY}`;
const OTHER_URL = "https://hooks.example.com/trigger/T3RoZXJGbG93";
const UNDELETED_KEY = `${FLOW_KEY}:undeleted`;

const httpError = (status: number) =>
  Object.assign(new Error(`Request failed with status code ${status}`), {
    response: { status },
  });

const subscription = (
  id: string,
  notificationUrl: string,
  resource = "users",
) => ({
  id,
  resource,
  changeType: "updated",
  notificationUrl,
  expirationDateTime: "2026-12-01T00:00:00.000Z",
});

const createMockClient = (listed: ReturnType<typeof subscription>[]) => ({
  get: jest.fn().mockResolvedValue({ data: { value: listed } }),
  post: jest
    .fn()
    .mockImplementation((_url: string, body: { resource: string }) =>
      Promise.resolve({
        data: subscription("new-sub", WEBHOOK_URL, body.resource),
      }),
    ),
  patch: jest.fn(),
  delete: jest.fn().mockResolvedValue({ data: undefined }),
});

const createContext = (crossFlowState: Record<string, unknown> = {}) => ({
  crossFlowState,
  debug: { enabled: false },
  flow: { id: "flow-id", name: "Flow" },
  logger: { info: jest.fn(), warn: jest.fn() },
  webhookUrls: { Flow: WEBHOOK_URL },
});

const deletedIds = (client: ReturnType<typeof createMockClient>) =>
  client.delete.mock.calls.map(([url]) => url).sort();

describe("replaceSubscriptionOnDeploy", () => {
  it("creates one subscription and stores its ID when nothing exists yet", async () => {
    const client = createMockClient([]);
    const context = createContext();

    const result = await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(client.post).toHaveBeenCalledTimes(1);
    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({
        resource: "users",
        changeType: "updated",
        notificationUrl: WEBHOOK_URL,
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      }),
    );
    expect(client.delete).not.toHaveBeenCalled();
    expect(result.subscription.id).toBe("new-sub");
    expect(result.crossFlowState).toEqual({
      [FLOW_KEY]: "new-sub",
      [UNDELETED_KEY]: "",
    });
  });

  it("creates from the current inputs and deletes a visible subscription on the same URL", async () => {
    const client = createMockClient([
      subscription("old-sub", WEBHOOK_URL, "groups"),
      subscription("other-flow-sub", OTHER_URL),
    ]);
    const context = createContext();

    await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "deleted",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({ resource: "users", changeType: "deleted" }),
    );
    expect(deletedIds(client)).toEqual(["/subscriptions/old-sub"]);
  });

  it("sends the caller's custom body fields with the new subscription", async () => {
    const client = createMockClient([]);
    const context = createContext();

    await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "drives/drive-id/root",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
        customBody: { lifecycleNotificationUrl: WEBHOOK_URL },
      },
      context as never,
    );

    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({
        resource: "drives/drive-id/root",
        lifecycleNotificationUrl: WEBHOOK_URL,
      }),
    );
  });

  it("deletes the stored subscription by ID when the current token cannot list it", async () => {
    const client = createMockClient([]);
    const context = createContext({ [FLOW_KEY]: "app-only-sub" });

    await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(deletedIds(client)).toEqual(["/subscriptions/app-only-sub"]);
  });

  it("deletes a stored subscription that is also listed only once", async () => {
    const client = createMockClient([subscription("old-sub", WEBHOOK_URL)]);
    const context = createContext({ [FLOW_KEY]: "old-sub" });

    await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(deletedIds(client)).toEqual(["/subscriptions/old-sub"]);
  });

  it("creates before it deletes", async () => {
    const order: string[] = [];
    const client = createMockClient([subscription("old-sub", WEBHOOK_URL)]);
    client.post.mockImplementation(() => {
      order.push("post");
      return Promise.resolve({ data: subscription("new-sub", WEBHOOK_URL) });
    });
    client.delete.mockImplementation(() => {
      order.push("delete");
      return Promise.resolve({ data: undefined });
    });

    await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      createContext() as never,
    );

    expect(order).toEqual(["post", "delete"]);
  });

  it("treats a previous subscription that is already gone (404) as deleted", async () => {
    const client = createMockClient([]);
    client.delete.mockRejectedValue(httpError(404));
    const context = createContext({ [FLOW_KEY]: "expired-sub" });

    const result = await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(result.crossFlowState).toEqual({
      [FLOW_KEY]: "new-sub",
      [UNDELETED_KEY]: "",
    });
    expect(context.logger.warn).not.toHaveBeenCalled();
  });

  it("keeps a previous subscription it could not delete for the next deploy, and still resolves", async () => {
    const client = createMockClient([]);
    client.delete.mockRejectedValue(httpError(403));
    const context = createContext({ [FLOW_KEY]: "other-user-sub" });

    const result = await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(result.crossFlowState).toEqual({
      [FLOW_KEY]: "new-sub",
      [UNDELETED_KEY]: "other-user-sub",
    });
    expect(context.logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("other-user-sub"),
    );
  });

  it("retries the subscriptions an earlier deploy could not delete", async () => {
    const client = createMockClient([]);
    const context = createContext({
      [FLOW_KEY]: "last-sub",
      [UNDELETED_KEY]: "stuck-a,stuck-b",
    });

    const result = await replaceSubscriptionOnDeploy(
      client as never,
      {
        resource: "users",
        changeType: "updated",
        expirationDateTime: "2026-12-01T00:00:00.000Z",
      },
      context as never,
    );

    expect(deletedIds(client)).toEqual([
      "/subscriptions/last-sub",
      "/subscriptions/stuck-a",
      "/subscriptions/stuck-b",
    ]);
    expect(result.crossFlowState[UNDELETED_KEY]).toBe("");
  });
});

describe("deleteSubscriptionTrigger", () => {
  it("deletes the stored subscription by ID when the current token cannot list it", async () => {
    const client = createMockClient([subscription("visible-sub", WEBHOOK_URL)]);
    const context = createContext({ [FLOW_KEY]: "app-only-sub" });

    await deleteSubscriptionTrigger(client as never, context as never);

    expect(deletedIds(client)).toEqual([
      "/subscriptions/app-only-sub",
      "/subscriptions/visible-sub",
    ]);
  });

  it("deletes a stored subscription that is also listed only once", async () => {
    const client = createMockClient([subscription("visible-sub", WEBHOOK_URL)]);
    const context = createContext({ [FLOW_KEY]: "visible-sub" });

    await deleteSubscriptionTrigger(client as never, context as never);

    expect(deletedIds(client)).toEqual(["/subscriptions/visible-sub"]);
  });

  it("resolves when the stored subscription is already gone (404)", async () => {
    const client = createMockClient([]);
    client.delete.mockRejectedValue(httpError(404));
    const context = createContext({ [FLOW_KEY]: "expired-sub" });

    await expect(
      deleteSubscriptionTrigger(client as never, context as never),
    ).resolves.toBeUndefined();
    expect(context.logger.warn).not.toHaveBeenCalled();
  });

  it("logs and resolves when a stored subscription cannot be deleted", async () => {
    const client = createMockClient([]);
    client.delete.mockRejectedValue(httpError(403));
    const context = createContext({ [FLOW_KEY]: "other-user-sub" });

    await expect(
      deleteSubscriptionTrigger(client as never, context as never),
    ).resolves.toBeUndefined();
    expect(context.logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("other-user-sub"),
    );
  });

  it("deletes the subscriptions an earlier deploy could not delete", async () => {
    const client = createMockClient([]);
    const context = createContext({
      [FLOW_KEY]: "last-sub",
      [UNDELETED_KEY]: "stuck-a",
    });

    await deleteSubscriptionTrigger(client as never, context as never);

    expect(deletedIds(client)).toEqual([
      "/subscriptions/last-sub",
      "/subscriptions/stuck-a",
    ]);
  });

  it("still deletes the stored subscription when a listed one fails, then throws", async () => {
    const client = createMockClient([subscription("visible-sub", WEBHOOK_URL)]);
    client.delete.mockImplementation((url: string) =>
      url.endsWith("visible-sub")
        ? Promise.reject(httpError(500))
        : Promise.resolve({ data: undefined }),
    );
    const context = createContext({ [FLOW_KEY]: "app-only-sub" });

    await expect(
      deleteSubscriptionTrigger(client as never, context as never),
    ).rejects.toThrow("visible-sub");
    expect(deletedIds(client)).toEqual([
      "/subscriptions/app-only-sub",
      "/subscriptions/visible-sub",
    ]);
  });
});
