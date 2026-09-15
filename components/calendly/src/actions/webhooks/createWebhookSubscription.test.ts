import { afterEach, describe, expect, test } from "vitest";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createWebhookSubscription } from "./createWebhookSubscription";
import { calendlyOauth2Connection } from "../../connections";
import { createWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("createWebhookSubscription", () => {
  afterEach(() => nock.cleanAll());
  test("happy path creates webhook and returns resource", async () => {
    nock(BASE)
      .post("/webhook_subscriptions")
      .reply(200, createWebhookSubscriptionExamplePayload.data);
    const { result } = await invoke(createWebhookSubscription, {
      connection: conn,
      url: "https://blah.foo/bar",
      event: ["invitee.created"],
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      scope: "user",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      signingKey: undefined,
    });
    expect(result.data).toEqual(createWebhookSubscriptionExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/webhook_subscriptions")
      .reply(422, { title: "Invalid Argument", message: "bad input" });
    await expect(
      invoke(createWebhookSubscription, {
        connection: conn,
        url: "https://blah.foo/bar",
        event: ["invitee.created"],
        organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
        scope: "user",
        user: undefined,
        signingKey: undefined,
      }),
    ).rejects.toThrow();
  });
});
