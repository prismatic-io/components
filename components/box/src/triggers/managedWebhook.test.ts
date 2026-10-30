import { createHmac } from "node:crypto";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import {
  boxApiError,
  webhookResponse,
  webhooksResponse,
} from "../../tests/boxSdkResponses";
import { getStoreKey } from "../util";
import { managedWebhook } from "./managedWebhook";

const mockCreateWebhook = vi.fn();
const mockDeleteWebhookById = vi.fn();
const mockGetWebhooks = vi.fn();
const mockGetWebhookById = vi.fn();

vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    webhooks: {
      createWebhook: (...args: unknown[]) => mockCreateWebhook(...args),
      deleteWebhookById: (...args: unknown[]) => mockDeleteWebhookById(...args),
      getWebhooks: (...args: unknown[]) => mockGetWebhooks(...args),
      getWebhookById: (...args: unknown[]) => mockGetWebhookById(...args),
    },
  }),
}));

const FLOW_NAME = "Flow 1";
const OLD_PRIMARY_KEY = "old-primary-signature-key";
const OLD_SECONDARY_KEY = "old-secondary-signature-key";
const NEW_PRIMARY_KEY = "new-primary-signature-key";
const NEW_SECONDARY_KEY = "new-secondary-signature-key";
const REJECTION = "The request has failed Box signature validation. Rejecting.";

const body = JSON.stringify({
  type: "webhook_event",
  id: "0f46a6ca-86bf-44ab-8cf5-f08e1e02876b",
  trigger: "FILE.UPLOADED",
});

const sign = (key: string, timestamp: string): string =>
  createHmac("sha256", key).update(body).update(timestamp).digest("base64");

const signedPayload = (primaryKey: string) => {
  const timestamp = new Date().toISOString();
  return {
    rawBody: { data: body },
    body: { data: JSON.parse(body) },
    headers: {
      "box-delivery-id": "f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f",
      "box-delivery-timestamp": timestamp,
      "box-signature-algorithm": "HmacSHA256",
      "box-signature-version": "1",
      "box-signature-primary": sign(primaryKey, timestamp),
    },
  } as unknown as Parameters<typeof invokeTrigger>[2];
};

const unsignedPayload = () =>
  ({
    rawBody: { data: body },
    body: { data: JSON.parse(body) },
    headers: { "content-type": "application/json" },
  }) as unknown as Parameters<typeof invokeTrigger>[2];

const blankInputs = { primarySignatureKey: "", secondarySignatureKey: "" };

const storedState = () => ({
  [getStoreKey(FLOW_NAME)]: {
    existingWebhookId: "1234",
    primarySignatureKey: OLD_PRIMARY_KEY,
    secondarySignatureKey: OLD_SECONDARY_KEY,
  },
});

const triggerUnderTest = managedWebhook as unknown as Parameters<
  typeof invokeTrigger
>[0];

const deliver = (
  payload: Parameters<typeof invokeTrigger>[2],
  inputs: { primarySignatureKey: string; secondarySignatureKey: string },
  crossFlowState: Record<string, unknown> = storedState(),
) =>
  invokeTrigger(
    triggerUnderTest,
    {
      crossFlowState,
      flow: { id: "flowId", name: FLOW_NAME, stableId: "flowStableId" },
    } as unknown as Parameters<typeof invokeTrigger>[1],
    payload,
    inputs as unknown as Parameters<typeof invokeTrigger>[3],
  );

describe("managedWebhook signature validation", () => {
  test("accepts a delivery signed with rotated keys configured on the trigger inputs", async () => {
    const payload = signedPayload(NEW_PRIMARY_KEY);

    const { result } = await deliver(payload, {
      primarySignatureKey: NEW_PRIMARY_KEY,
      secondarySignatureKey: NEW_SECONDARY_KEY,
    });

    expect(
      (result as { payload: { rawBody: unknown } }).payload.rawBody,
    ).toEqual({ data: body });
  });

  test("falls back to the stored keys when the trigger inputs are blank", async () => {
    const payload = signedPayload(OLD_PRIMARY_KEY);

    const { result } = await deliver(payload, {
      primarySignatureKey: "",
      secondarySignatureKey: "",
    });

    expect(
      (result as { payload: { rawBody: unknown } }).payload.rawBody,
    ).toEqual({ data: body });
  });

  test("rejects a delivery whose signature matches no configured key", async () => {
    const payload = signedPayload("not-a-configured-key");

    await expect(
      deliver(payload, {
        primarySignatureKey: NEW_PRIMARY_KEY,
        secondarySignatureKey: NEW_SECONDARY_KEY,
      }),
    ).rejects.toThrow(REJECTION);
  });

  test("rejects an unsigned delivery when the stored state holds keys", async () => {
    await expect(deliver(unsignedPayload(), blankInputs)).rejects.toThrow(
      REJECTION,
    );
  });

  test("passes an unsigned delivery through when no signature key is configured", async () => {
    const { result } = await deliver(unsignedPayload(), blankInputs, {});

    expect(
      (result as { payload: { rawBody: unknown } }).payload.rawBody,
    ).toEqual({ data: body });
  });
});

const WEBHOOK_URL = "https://hooks.example.com/trigger/flow-1";
const OTHER_URL = "https://hooks.example.com/trigger/other-instance";
const STORE_KEY = getStoreKey(FLOW_NAME);

type LifecycleHandler = (
  context: Record<string, unknown>,
  params: Record<string, unknown>,
) => Promise<{ crossFlowState: Record<string, unknown> } | undefined>;

const handlers = (
  managedWebhook as unknown as {
    webhookLifecycleHandlers: {
      create: LifecycleHandler;
      delete: LifecycleHandler;
    };
  }
).webhookLifecycleHandlers;

const lifecycleContext = (crossFlowState: Record<string, unknown>) => ({
  crossFlowState,
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
  flow: { id: "flowId", name: FLOW_NAME, stableId: "flowStableId" },
  webhookUrls: { [FLOW_NAME]: WEBHOOK_URL },
});

const lifecycleParams = {
  connection: { key: "apiKey", fields: { apiKey: "test-token" } },
  targetId: "111",
  targetType: "folder",
  triggerTypes: ["FILE.UPLOADED"],
  primarySignatureKey: NEW_PRIMARY_KEY,
  secondarySignatureKey: NEW_SECONDARY_KEY,
};

const createdWebhook = (id: string) =>
  webhookResponse({
    id,
    type: "webhook",
    target: { id: "111", type: "folder" },
    address: WEBHOOK_URL,
    triggers: ["FILE.UPLOADED"],
  });

describe("managedWebhook lifecycle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteWebhookById.mockResolvedValue(undefined);
  });

  test("delete clears the stored state when Box no longer has the webhook", async () => {
    mockDeleteWebhookById.mockRejectedValue(boxApiError(404));
    const crossFlowState: Record<string, unknown> = storedState();

    const result = await handlers.delete(
      lifecycleContext(crossFlowState),
      lifecycleParams,
    );

    expect(mockDeleteWebhookById).toHaveBeenCalledWith("1234");
    expect(result?.crossFlowState[STORE_KEY]).toBeUndefined();
  });

  test("delete surfaces any other Box error", async () => {
    mockDeleteWebhookById.mockRejectedValue(boxApiError(500));

    await expect(
      handlers.delete(lifecycleContext(storedState()), lifecycleParams),
    ).rejects.toThrow("Box responded 500");
  });

  test("create replaces a changed webhook even when Box already deleted the old one", async () => {
    mockDeleteWebhookById.mockRejectedValue(boxApiError(404));
    mockCreateWebhook.mockResolvedValue(createdWebhook("5555"));
    const crossFlowState: Record<string, unknown> = storedState();

    const result = await handlers.create(
      lifecycleContext(crossFlowState),
      lifecycleParams,
    );

    expect(mockCreateWebhook).toHaveBeenCalledTimes(1);
    expect(result?.crossFlowState[STORE_KEY]).toMatchObject({
      existingWebhookId: "5555",
    });
  });

  test("create replaces a conflicting webhook that already points to this flow", async () => {
    mockCreateWebhook
      .mockRejectedValueOnce(boxApiError(409))
      .mockResolvedValueOnce(createdWebhook("7777"));
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({
        entries: [
          {
            id: "6666",
            type: "webhook",
            target: { id: "111", type: "folder" },
          },
          { id: "8888", type: "webhook", target: { id: "222", type: "file" } },
        ],
      }),
    );
    mockGetWebhookById.mockImplementation((id: string) =>
      Promise.resolve({
        id,
        type: "webhook",
        address: id === "6666" ? WEBHOOK_URL : OTHER_URL,
      }),
    );

    const result = await handlers.create(lifecycleContext({}), lifecycleParams);

    expect(mockDeleteWebhookById).toHaveBeenCalledTimes(1);
    expect(mockDeleteWebhookById).toHaveBeenCalledWith("6666");
    expect(mockCreateWebhook).toHaveBeenCalledTimes(2);
    expect(result?.crossFlowState[STORE_KEY]).toMatchObject({
      existingWebhookId: "7777",
    });
  });

  test("create refuses to replace a conflicting webhook that points elsewhere", async () => {
    mockCreateWebhook.mockRejectedValue(boxApiError(409));
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({
        entries: [
          {
            id: "6666",
            type: "webhook",
            target: { id: "111", type: "folder" },
          },
        ],
      }),
    );
    mockGetWebhookById.mockResolvedValue({
      id: "6666",
      type: "webhook",
      address: OTHER_URL,
    });

    await expect(
      handlers.create(lifecycleContext({}), lifecycleParams),
    ).rejects.toThrow(
      "A Box webhook for folder 111 already exists for this application and user",
    );
    expect(mockDeleteWebhookById).not.toHaveBeenCalled();
  });
});
