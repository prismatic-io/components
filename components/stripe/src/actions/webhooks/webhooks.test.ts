import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  deleteWebhookExamplePayload,
  getWebhookExamplePayload,
  listWebhooksExamplePayload,
} from "../../examplePayloads/webhooks";
import { createWebhook } from "./createWebhook";
import { deleteWebhook } from "./deleteWebhook";
import { deleteWebhooks } from "./deleteWebhooks";
import { getWebhook } from "./getWebhook";
import { listWebhooks } from "./listWebhooks";
import { updateWebhook } from "./updateWebhook";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const WEBHOOK_ID = getWebhookExamplePayload.data.id;
const WEBHOOK_URL = getWebhookExamplePayload.data.url;
afterEach(() => nock.cleanAll());
describe("createWebhook", () => {
  it("creates the endpoint and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/webhook_endpoints")
      .reply(200, getWebhookExamplePayload.data);
    const { result } = await invoke(
      createWebhook,
      params({
        webhookUrl: WEBHOOK_URL,
        webhookEvents: ["charge.succeeded", "charge.failed"],
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(getWebhookExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/webhook_endpoints")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid URL: must be an absolute URL",
        },
      });
    await expect(
      invoke(
        createWebhook,
        params({
          webhookUrl: "not-a-url",
          webhookEvents: ["*"],
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Invalid URL");
  });
});
describe("getWebhook", () => {
  it("returns the endpoint for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/webhook_endpoints/${WEBHOOK_ID}`)
      .reply(200, getWebhookExamplePayload.data);
    const { result } = await invoke(
      getWebhook,
      params({ webhookId: WEBHOOK_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getWebhookExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/webhook_endpoints/we_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such webhook endpoint",
        },
      });
    await expect(
      invoke(
        getWebhook,
        params({ webhookId: "we_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such webhook endpoint");
  });
});
describe("listWebhooks", () => {
  it("returns a single page of endpoints", async () => {
    const scope = nock(BASE)
      .get("/v1/webhook_endpoints")
      .query({ limit: "10" })
      .reply(200, listWebhooksExamplePayload.data);
    const { result } = await invoke(
      listWebhooks,
      params({
        fetchAll: false,
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(listWebhooksExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/webhook_endpoints")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(
        listWebhooks,
        params({ fetchAll: false, pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updateWebhook", () => {
  it("updates the endpoint and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/webhook_endpoints/${WEBHOOK_ID}`)
      .reply(200, getWebhookExamplePayload.data);
    const { result } = await invoke(
      updateWebhook,
      params({
        webhookId: WEBHOOK_ID,
        webhookUrl: WEBHOOK_URL,
        webhookEvents: ["charge.succeeded"],
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(getWebhookExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/webhook_endpoints/we_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such webhook endpoint",
        },
      });
    await expect(
      invoke(
        updateWebhook,
        params({
          webhookId: "we_missing",
          webhookUrl: WEBHOOK_URL,
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such webhook endpoint");
  });
});
describe("deleteWebhook", () => {
  it("deletes the endpoint and returns the deletion confirmation", async () => {
    const scope = nock(BASE)
      .delete(`/v1/webhook_endpoints/${WEBHOOK_ID}`)
      .reply(200, deleteWebhookExamplePayload.data);
    const { result } = await invoke(
      deleteWebhook,
      params({ webhookId: WEBHOOK_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(deleteWebhookExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .delete("/v1/webhook_endpoints/we_missing")
      .reply(404, {
        error: {
          type: "invalid_request_error",
          message: "No such webhook endpoint",
        },
      });
    await expect(
      invoke(
        deleteWebhook,
        params({ webhookId: "we_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such webhook endpoint");
  });
});
describe("deleteWebhooks", () => {
  it("deletes only the endpoints matching the instance's flow URLs", async () => {
    const otherEndpoint = {
      ...getWebhookExamplePayload.data,
      id: "we_other",
      url: "https://example.com/some/other/instance",
    };
    const list = nock(BASE)
      .get("/v1/webhook_endpoints")
      .query(true)
      .reply(200, {
        object: "list",
        url: "/v1/webhook_endpoints",
        has_more: false,
        data: [getWebhookExamplePayload.data, otherEndpoint],
      });
    const deletion = nock(BASE)
      .delete(`/v1/webhook_endpoints/${WEBHOOK_ID}`)
      .reply(200, deleteWebhookExamplePayload.data);
    const { result } = await invoke(
      deleteWebhooks,
      params({ stripeConnection: conn }),
      {
        webhookUrls: { "Flow 1": WEBHOOK_URL },
      },
    );
    expect(result.data).toEqual([deleteWebhookExamplePayload.data]);
    expect(list.isDone()).toBe(true);
    expect(deletion.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/webhook_endpoints")
      .query(true)
      .reply(401, {
        error: {
          type: "invalid_request_error",
          message: "Invalid API Key provided",
        },
      });
    await expect(
      invoke(deleteWebhooks, params({ stripeConnection: conn }), {
        webhookUrls: { "Flow 1": WEBHOOK_URL },
      }),
    ).rejects.toThrow("Invalid API Key provided");
  });
});
