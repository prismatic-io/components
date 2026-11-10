import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { adminApiAccessToken } from "../../connections";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION } from "../../constants";
import {
  deleteInstanceWebhooksExamplePayload,
  deleteWebhookGqlExamplePayload,
  listWebhooksGqlExamplePayload,
} from "../../examplePayloads";
import { deleteInstanceWebhooks } from "./deleteInstanceWebhooks";

const BASE = "https://test-store.myshopify.com";
const PATH = `/admin/api/${DEFAULT_SHOPIFY_GRAPHQL_API_VERSION}/graphql.json`;
const INSTANCE_URL = "https://hooks.example.com/trigger/instance-flow";

const shopifyConnection = createConnection(adminApiAccessToken, {
  host: "test-store.myshopify.com",
  adminApiAccessToken: "shpat_test",
});

const [subscription] = listWebhooksGqlExamplePayload.graphql.data.webhookSubscriptions;
const ownSubscription = {
  ...subscription,
  id: "gid://shopify/WebhookSubscription/1",
  endpoint: { callbackUrl: INSTANCE_URL },
};
const foreignSubscription = {
  ...subscription,
  id: "gid://shopify/WebhookSubscription/2",
  endpoint: { callbackUrl: "https://other.example.com/hook" },
};

const isOperation = (name: string) => (body: { query?: string }) =>
  typeof body.query === "string" && body.query.includes(name);

const context = { webhookUrls: { "Flow 1": INSTANCE_URL } };

beforeEach(() => {
  nock.cleanAll();
  nock.disableNetConnect();
});

afterEach(() => {
  nock.enableNetConnect();
});

describe("deleteInstanceWebhooks", () => {
  test("deletes only the subscription whose callback URL belongs to this instance", async () => {
    nock(BASE)
      .post(PATH, isOperation("query ListWebhooks"))
      .reply(200, {
        data: {
          webhookSubscriptions: {
            nodes: [ownSubscription, foreignSubscription],
            pageInfo: { hasNextPage: false, endCursor: null },
          },
        },
      });
    const deletedIds: string[] = [];
    nock(BASE)
      .post(PATH, (body) => {
        if (!isOperation("mutation DeleteWebhook")(body)) return false;
        deletedIds.push(body.variables.id);
        return true;
      })
      .times(2)
      .reply(200, {
        data: { webhookSubscriptionDelete: deleteWebhookGqlExamplePayload.graphql.data },
      });

    const { result } = await invoke(deleteInstanceWebhooks, { shopifyConnection }, context);

    expect(deletedIds).toEqual([ownSubscription.id]);
    expect(result).toEqual(deleteInstanceWebhooksExamplePayload.restMap);
  });

  test("a 4xx reply to the list request rejects and deletes nothing", async () => {
    nock(BASE)
      .post(PATH, isOperation("query ListWebhooks"))
      .reply(401, { errors: "[API] Invalid API key or access token" });
    const deleteScope = nock(BASE).post(PATH, isOperation("mutation DeleteWebhook")).reply(200, {});

    await expect(invoke(deleteInstanceWebhooks, { shopifyConnection }, context)).rejects.toThrow();
    expect(deleteScope.isDone()).toBe(false);
  });
});
