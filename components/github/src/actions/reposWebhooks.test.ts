import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import {
  reposCreateWebhookExamplePayload,
  reposListWebhooksExamplePayload,
} from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const {
  reposListWebhooks,
  reposCreateWebhook,
  reposDeleteWebhook,
  reposDeleteInstanceWebhooks,
} = actions;
afterEach(() => nock.cleanAll());
describe("reposListWebhooks", () => {
  test("happy path returns webhooks from a single page (no rel=next)", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/hooks")
      .query(true)
      .reply(200, reposListWebhooksExamplePayload.data);
    const { result } = await invoke(
      reposListWebhooks,
      {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        showOnlyInstanceWebhooks: false,
      },
      { webhookUrls: {} },
    );
    expect(result.data).toEqual(reposListWebhooksExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/hooks")
      .query(true)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(
        reposListWebhooks,
        {
          connection: conn,
          owner: "octocat",
          repo: "Hello-World",
          showOnlyInstanceWebhooks: false,
        },
        { webhookUrls: {} },
      ),
    ).rejects.toThrow();
  });
});
describe("reposCreateWebhook", () => {
  test("happy path returns the created webhook", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/hooks")
      .reply(201, reposCreateWebhookExamplePayload.data);
    const { result } = await invoke(reposCreateWebhook, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      callbackUrl: "https://example.com/webhook",
      events: ["push", "pull_request"],
      webhookSecret: undefined,
    });
    expect(result.data).toEqual(reposCreateWebhookExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/hooks")
      .reply(422, { message: "Validation failed" });
    await expect(
      invoke(reposCreateWebhook, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        callbackUrl: "https://example.com/webhook",
        events: ["push"],
        webhookSecret: undefined,
      }),
    ).rejects.toThrow();
  });
});
describe("reposDeleteWebhook", () => {
  test("happy path returns the (empty) 204 body", async () => {
    nock(BASE).delete("/repos/octocat/Hello-World/hooks/12345678").reply(204);
    const { result } = await invoke(reposDeleteWebhook, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      hookId: 12345678,
    });
    expect(result.data).toBe("");
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .delete("/repos/octocat/Hello-World/hooks/12345678")
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(reposDeleteWebhook, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        hookId: 12345678,
      }),
    ).rejects.toThrow();
  });
});
describe("reposDeleteInstanceWebhooks", () => {
  test("deletes only the hooks whose config.url points at this instance", async () => {
    const instanceUrl = "https://example.com/webhook";
    const list = [
      { id: 12345678, config: { url: instanceUrl } },
      { id: 12345679, config: { url: "https://other.example.com/webhook" } },
    ];
    nock(BASE)
      .get("/repos/octocat/Hello-World/hooks")
      .query(true)
      .reply(200, list);
    const deleteInstance = nock(BASE)
      .delete("/repos/octocat/Hello-World/hooks/12345678")
      .reply(204);
    const deleteOther = nock(BASE)
      .delete("/repos/octocat/Hello-World/hooks/12345679")
      .reply(204);
    const { result } = await invoke(
      reposDeleteInstanceWebhooks,
      {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
      },
      { webhookUrls: { flowA: instanceUrl } },
    );
    expect(result.data).toEqual({});
    expect(deleteInstance.isDone()).toBe(true);
    expect(deleteOther.isDone()).toBe(false);
  });
});
