import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/testing";
import { createClient } from "../client";
import { MISSING_CHANGE_TYPE_MESSAGE, TriggerBranches } from "../constants";
import { cleanArrayInput } from "../util";
import { resourceTrigger } from "./resourceTrigger";

vi.mock("../client", () => ({ createClient: vi.fn() }));

const notification = {
  value: [
    {
      subscriptionId: "0fc0d6db-0073-42e5-a186-853da75fb308",
      changeType: "updated",
      resource: "Users/6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
    },
  ],
};

type ObservedTriggerResult = {
  branch: string;
  payload: { body: { data: unknown } };
  response?: { statusCode: number; contentType: string; body: string };
};

describe("resourceTrigger", () => {
  test("URL Validation branch echoes the validation token as a text/plain 200", async () => {
    const validationToken = "validation-token-value";
    const payload = {
      ...defaultTriggerPayload(),
      queryParameters: { validationToken },
    };

    const { result } = await invokeTrigger(resourceTrigger, {}, payload);
    const observed = result as unknown as ObservedTriggerResult;

    expect(observed.branch).toBe(TriggerBranches.URLValidation);
    expect(observed.response).toEqual({
      statusCode: 200,
      contentType: "text/plain",
      body: validationToken,
    });
    expect(result?.payload).toEqual(payload);
  });

  test("Notification branch returns the parsed webhook payload with no response", async () => {
    const base = defaultTriggerPayload();
    const payload = {
      ...base,
      queryParameters: {},
      body: { data: notification, contentType: "application/json" },
      rawBody: {
        data: Buffer.from(JSON.stringify(notification)),
        contentType: "application/json",
      },
    };

    const { result } = await invokeTrigger(resourceTrigger, {}, payload);
    const observed = result as unknown as ObservedTriggerResult;

    expect(observed.branch).toBe(TriggerBranches.Notification);
    expect(observed.payload.body.data).toEqual(notification);
    expect(observed.response).toBeUndefined();
  });
});

const FLOW_KEY = "SW5zdGFuY2VGbG93";
const UNDELETED_KEY = `${FLOW_KEY}:undeleted`;
const WEBHOOK_URL = `https://hooks.example.com/trigger/${FLOW_KEY}`;
const EXPIRATION = "2026-12-01T00:00:00.0000000Z";
const RESOURCE = "users";

const subscription = (id: string, changeType: string, resource = RESOURCE) => ({
  id,
  resource,
  changeType,
  notificationUrl: WEBHOOK_URL,
  expirationDateTime: EXPIRATION,
});

const createMockClient = (listed: ReturnType<typeof subscription>[]) => ({
  get: vi.fn().mockResolvedValue({ data: { value: listed } }),
  post: vi
    .fn()
    .mockImplementation(
      (_url: string, body: { resource: string; changeType: string }) =>
        Promise.resolve({
          data: subscription("new-sub", body.changeType, body.resource),
        }),
    ),
  patch: vi.fn(),
  delete: vi.fn().mockResolvedValue({ data: undefined }),
});

const createContext = (crossFlowState: Record<string, unknown> = {}) => ({
  crossFlowState,
  debug: { enabled: false },
  flow: { id: "flow-id", name: "Flow" },
  logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() },
  webhookUrls: { Flow: WEBHOOK_URL },
});

const connection = { key: "msIntuneOAuth2", token: { access_token: "token" } };

describe("resourceTrigger webhook lifecycle", () => {
  const handlers = resourceTrigger.webhookLifecycleHandlers as NonNullable<
    typeof resourceTrigger.webhookLifecycleHandlers
  >;

  beforeEach(() => {
    vi.mocked(createClient).mockReset();
  });

  test("redeploy replaces the per-change-type subscriptions of an earlier deploy with one built from the current inputs", async () => {
    const client = createMockClient([
      subscription("legacy-created", "created", "users"),
      subscription("legacy-updated", "updated", "users"),
    ]);
    vi.mocked(createClient).mockReturnValue(client as never);

    const result = await handlers.create(
      createContext() as never,
      {
        connection,
        changeType: ["created", "deleted"],
        expirationDateTime: EXPIRATION,
        resource: RESOURCE,
      } as never,
    );

    expect(createClient).toHaveBeenCalledWith(connection, false);
    expect(client.post).toHaveBeenCalledTimes(1);
    expect(client.post).toHaveBeenCalledWith("/subscriptions", {
      changeType: "created,deleted",
      notificationUrl: WEBHOOK_URL,
      resource: RESOURCE,
      expirationDateTime: EXPIRATION,
      clientState: undefined,
    });
    expect(client.patch).not.toHaveBeenCalled();
    expect(client.delete).toHaveBeenCalledTimes(2);
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/legacy-created");
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/legacy-updated");
    expect(result).toEqual({
      crossFlowState: { [FLOW_KEY]: "new-sub", [UNDELETED_KEY]: "" },
    });
  });

  test("redeploy deletes the stored subscription by ID when the current token cannot list it", async () => {
    const client = createMockClient([]);
    vi.mocked(createClient).mockReturnValue(client as never);

    await handlers.create(
      createContext({ [FLOW_KEY]: "stored-sub" }) as never,
      {
        connection,
        changeType: ["updated"],
        expirationDateTime: undefined,
        resource: RESOURCE,
      } as never,
    );

    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({
        changeType: "updated",
        expirationDateTime: expect.any(String),
      }),
    );
    expect(client.delete).toHaveBeenCalledTimes(1);
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/stored-sub");
  });

  test("redeploy keeps a subscription it could not delete in crossFlowState for the next deploy", async () => {
    const client = createMockClient([subscription("old-sub", "updated")]);
    client.delete.mockRejectedValue(new Error("Forbidden"));
    vi.mocked(createClient).mockReturnValue(client as never);

    const result = await handlers.create(
      createContext({ [FLOW_KEY]: "old-sub" }) as never,
      {
        connection,
        changeType: ["updated"],
        expirationDateTime: EXPIRATION,
        resource: RESOURCE,
      } as never,
    );

    expect(result).toEqual({
      crossFlowState: { [FLOW_KEY]: "new-sub", [UNDELETED_KEY]: "old-sub" },
    });
  });

  test("deploy fails with a clear message and creates nothing when Change Type is empty", async () => {
    const client = createMockClient([]);
    vi.mocked(createClient).mockReturnValue(client as never);

    await expect(
      handlers.create(
        createContext() as never,
        {
          connection,
          changeType: cleanArrayInput(""),
          expirationDateTime: EXPIRATION,
          resource: RESOURCE,
        } as never,
      ),
    ).rejects.toThrow(MISSING_CHANGE_TYPE_MESSAGE);
    expect(client.post).not.toHaveBeenCalled();
    expect(client.delete).not.toHaveBeenCalled();
  });

  test("instance deletion deletes the listed and the stored subscriptions", async () => {
    const client = createMockClient([subscription("listed-sub", "updated")]);
    vi.mocked(createClient).mockReturnValue(client as never);

    await handlers.delete(
      createContext({
        [FLOW_KEY]: "stored-sub",
        [UNDELETED_KEY]: "undeleted-sub",
      }) as never,
      { connection } as never,
    );

    expect(client.delete).toHaveBeenCalledTimes(3);
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/listed-sub");
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/stored-sub");
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/undeleted-sub");
  });
});
