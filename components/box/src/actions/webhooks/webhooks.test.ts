import { invoke, invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import {
  boxApiError,
  webhookResponse,
  webhooksResponse,
} from "../../../tests/boxSdkResponses";
import { selectWebhook } from "../../dataSources/selectWebhook";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhook } from "./createWebhook";
import { deleteInstanceWebhooks } from "./deleteInstanceWebhooks";
import { deleteWebhook } from "./deleteWebhook";
import { listWebhooks } from "./listWebhooks";

const mockGetWebhooks = vi.fn();
const mockGetWebhookById = vi.fn();
const mockDeleteWebhookById = vi.fn();
const mockCreateWebhook = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    webhooks: {
      getWebhooks: (...args: unknown[]) => mockGetWebhooks(...args),
      getWebhookById: (...args: unknown[]) => mockGetWebhookById(...args),
      deleteWebhookById: (...args: unknown[]) => mockDeleteWebhookById(...args),
      createWebhook: (...args: unknown[]) => mockCreateWebhook(...args),
    },
  }),
}));

const INSTANCE_URL = "https://hooks.example.com/trigger/instance-flow";
const OTHER_URL = "https://hooks.example.com/trigger/other-integration";

const instanceWebhook = {
  id: "1234",
  type: "webhook",
  target: { id: "111", type: "folder" },
};
const otherWebhook = {
  id: "5678",
  type: "webhook",
  target: { id: "222", type: "file" },
};

const addresses: Record<string, string> = {
  "1234": INSTANCE_URL,
  "5678": OTHER_URL,
};

const boxConnection = { key: "apiKey", fields: { apiKey: "test-token" } };

beforeEach(() => {
  vi.clearAllMocks();
  mockGetWebhooks.mockResolvedValue(
    webhooksResponse({
      entries: [instanceWebhook, otherWebhook],
      limit: 100,
      next_marker: "next-page-marker",
    }),
  );
  mockGetWebhookById.mockImplementation((id: string) =>
    Promise.resolve({ id, type: "webhook", address: addresses[id] }),
  );
  mockDeleteWebhookById.mockResolvedValue(undefined);
});

describe("listWebhooks", () => {
  test("returns the snake_case entries of a single page with its paging members", async () => {
    const { result } = await invoke(listWebhooks, {
      boxConnection,
      fetchAll: false,
      pagination: { limit: 100, marker: "" },
      showOnlyInstanceWebhooks: false,
    } as never);

    expect(result).toEqual({
      data: {
        limit: 100,
        next_marker: "next-page-marker",
        entries: [instanceWebhook, otherWebhook],
      },
    });
  });

  test("returns the snake_case entries of every page when fetching all", async () => {
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({ entries: [instanceWebhook, otherWebhook] }),
    );

    const { result } = await invoke(listWebhooks, {
      boxConnection,
      fetchAll: true,
      pagination: {},
      showOnlyInstanceWebhooks: false,
    } as never);

    expect(result).toEqual({
      data: { entries: [instanceWebhook, otherWebhook] },
    });
  });

  test("keeps only the webhooks that point to this instance", async () => {
    const { result } = await invoke(
      listWebhooks,
      {
        boxConnection,
        fetchAll: false,
        pagination: {},
        showOnlyInstanceWebhooks: true,
      } as never,
      { webhookUrls: { "Instance Flow": INSTANCE_URL } },
    );

    expect(result).toMatchObject({ data: { entries: [instanceWebhook] } });
    expect(mockGetWebhookById).toHaveBeenCalledWith("1234");
    expect(mockGetWebhookById).toHaveBeenCalledWith("5678");
  });

  test("surfaces a Box error from the list call", async () => {
    mockGetWebhooks.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(listWebhooks, {
        boxConnection,
        fetchAll: false,
        pagination: {},
        showOnlyInstanceWebhooks: false,
      } as never),
    ).rejects.toThrow("Box responded 404");
  });
});

describe("deleteInstanceWebhooks", () => {
  test("deletes only the webhooks that point to this instance", async () => {
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({ entries: [instanceWebhook, otherWebhook] }),
    );

    const { result } = await invoke(
      deleteInstanceWebhooks,
      { boxConnection } as never,
      { webhookUrls: { "Instance Flow": INSTANCE_URL } },
    );

    expect(result).toEqual({ data: {} });
    expect(mockDeleteWebhookById).toHaveBeenCalledTimes(1);
    expect(mockDeleteWebhookById).toHaveBeenCalledWith("1234");
  });

  test("surfaces a Box error from the delete call", async () => {
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({ entries: [instanceWebhook] }),
    );
    mockDeleteWebhookById.mockRejectedValue(new Error("Box responded 403"));

    await expect(
      invoke(deleteInstanceWebhooks, { boxConnection } as never, {
        webhookUrls: { "Instance Flow": INSTANCE_URL },
      }),
    ).rejects.toThrow("Box responded 403");
  });
});

describe("selectWebhook", () => {
  test("lists every webhook by address", async () => {
    mockGetWebhooks.mockResolvedValue(
      webhooksResponse({ entries: [instanceWebhook, otherWebhook] }),
    );

    const result = await invokeDataSource(selectWebhook, {
      boxConnection,
    } as never);

    expect(result).toEqual({
      result: [
        { label: INSTANCE_URL, key: "1234" },
        { label: OTHER_URL, key: "5678" },
      ],
    });
  });

  test("returns an empty list when the account has no webhooks", async () => {
    mockGetWebhooks.mockResolvedValue(webhooksResponse({ entries: [] }));

    const result = await invokeDataSource(selectWebhook, {
      boxConnection,
    } as never);

    expect(result).toEqual({ result: [] });
  });
});

describe("createWebhook", () => {
  const createParams = {
    boxConnection,
    address: "https://example.com/webhook",
    targetId: "22222",
    targetType: "folder",
    triggerTypes: ["FILE.DOWNLOADED", "FILE.UPLOADED"],
    primarySignatureKey: "primary-key",
    secondarySignatureKey: "",
  };

  test("creates the webhook, returns its snake_case body and stores the signature key", async () => {
    mockCreateWebhook.mockResolvedValue(
      webhookResponse(createWebhookExamplePayload.data),
    );

    const { result } = await invoke(createWebhook, createParams as never);

    expect(result).toEqual({
      data: createWebhookExamplePayload.data,
      crossFlowState: { primarySignatureKey: "primary-key" },
    });
    expect(mockCreateWebhook).toHaveBeenCalledWith({
      target: { id: "22222", type: "folder" },
      address: "https://example.com/webhook",
      triggers: ["FILE.DOWNLOADED", "FILE.UPLOADED"],
    });
  });

  test("skips creation without failing when Box reports a conflict", async () => {
    mockCreateWebhook.mockRejectedValue(boxApiError(409));

    const { result } = await invoke(createWebhook, createParams as never);

    expect(result).toEqual({
      data: null,
      crossFlowState: { primarySignatureKey: "primary-key" },
    });
  });

  test("surfaces any other Box error from the create call", async () => {
    mockCreateWebhook.mockRejectedValue(boxApiError(404));

    await expect(invoke(createWebhook, createParams as never)).rejects.toThrow(
      "Box responded 404",
    );
  });
});

describe("deleteWebhook", () => {
  test("deletes the webhook by id and returns a null body", async () => {
    const { result } = await invoke(deleteWebhook, {
      boxConnection,
      webhookId: "1234",
    } as never);

    expect(result).toEqual({ data: null });
    expect(mockDeleteWebhookById).toHaveBeenCalledWith("1234");
  });

  test("surfaces a Box error from the delete call", async () => {
    mockDeleteWebhookById.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(deleteWebhook, { boxConnection, webhookId: "1234" } as never),
    ).rejects.toThrow("Box responded 404");
  });
});
