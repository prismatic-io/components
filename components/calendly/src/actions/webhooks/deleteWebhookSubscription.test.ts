import { describe, expect, test, afterEach } from "vitest";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteWebhookSubscription } from "./deleteWebhookSubscription";
import { calendlyOauth2Connection } from "../../connections";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("deleteWebhookSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("happy path deletes webhook and returns empty data", async () => {
    nock(BASE).delete("/webhook_subscriptions/WH_UUID_1").reply(204, "");
    const { result } = await invoke(deleteWebhookSubscription, {
      connection: conn,
      webhookUuid: "WH_UUID_1",
    });
    expect(result.data).toBeDefined();
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .delete("/webhook_subscriptions/INVALID")
      .reply(404, { title: "Resource Not Found", message: "not found" });
    await expect(
      invoke(deleteWebhookSubscription, {
        connection: conn,
        webhookUuid: "INVALID",
      }),
    ).rejects.toThrow();
  });
});
