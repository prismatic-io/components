import { type ActionContext, testing } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import component from "../..";
import {
  createEventSubscriptionExamplePayload,
  createMailFolderSubscriptionExamplePayload,
  listSubscriptionsExamplePayload,
  updateEventSubscriptionExamplePayload,
} from "../../examplePayloads";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../../testHelpers";
import { createEventSubscription } from "./createEventSubscription";
import { createMailFolderSubscription } from "./createMailFolderSubscription";

const NOTIFICATION_URL = "https://hooks.example.com/trigger/abc";
const FLOW_NAME = "Outlook Flow";
const USER = `users/${CLIENT_CREDENTIALS_USER_ID}`;

const connections = [
  ["delegated", delegatedConnection, "me"],
  ["client-credentials", clientCredentialsConnection, USER],
] as const;

const expectSubscription = (reply: object) => {
  const sent: { resource?: string } = {};
  const scope = nock(GRAPH_HOST)
    .post("/v1.0/subscriptions", (body) => Object.assign(sent, body) !== undefined)
    .reply(201, reply);
  return { sent, scope };
};

const flowContext = {
  flow: { id: "flow-id", name: FLOW_NAME },
  webhookUrls: { [FLOW_NAME]: NOTIFICATION_URL },
} as unknown as Partial<ActionContext>;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe.each(connections)("with a %s connection", (_label, connection, owner) => {
  test("createEventSubscription subscribes to the mailbox's events", async () => {
    const { sent, scope } = expectSubscription(createEventSubscriptionExamplePayload.data);

    await invoke(
      createEventSubscription,
      {
        connection: connection(),
        notificationUrl: NOTIFICATION_URL,
        expirationDateTime: "",
        allowDuplicates: true,
      },
      flowContext,
    );

    expect(sent.resource).toBe(`${owner}/events`);
    expect(scope.isDone()).toBe(true);
  });

  test("createMailFolderSubscription subscribes to the mailbox's Inbox", async () => {
    nock(GRAPH_HOST).get("/v1.0/subscriptions").reply(200, { value: [] });
    const { sent, scope } = expectSubscription(createMailFolderSubscriptionExamplePayload.data);

    await invoke(createMailFolderSubscription, {
      connection: connection(),
      notificationUrl: NOTIFICATION_URL,
      expirationDateTime: "",
      changeType: "created",
    });

    expect(sent.resource).toBe(`${owner}/mailFolders('Inbox')/messages`);
    expect(scope.isDone()).toBe(true);
  });
});

const harness = testing.createHarness(component);
const SUBSCRIPTION_ID = "e9d5b726-4478-4412-bfba-268530484566";
const GRAPH_ERROR = { error: { code: "ExtensionError", message: "Operation failed." } };
const [exampleSubscription] = listSubscriptionsExamplePayload.data.value;
const instanceSubscription = { ...exampleSubscription, notificationUrl: NOTIFICATION_URL };
const otherSubscription = { ...exampleSubscription, id: "other-subscription-id" };

describe("createEventSubscription errors", () => {
  test("rejects when Graph refuses the subscription", async () => {
    nock(GRAPH_HOST).get("/v1.0/subscriptions").reply(200, { value: [] });
    nock(GRAPH_HOST).post("/v1.0/subscriptions").reply(400, GRAPH_ERROR);

    await expect(
      harness.action(
        "createEventSubscription",
        { connection: delegatedConnection(), notificationUrl: NOTIFICATION_URL },
        flowContext,
      ),
    ).rejects.toThrow();
  });
});

describe("createMailFolderSubscription errors", () => {
  test("rejects when Graph refuses the subscription", async () => {
    nock(GRAPH_HOST).get("/v1.0/subscriptions").reply(200, { value: [] });
    nock(GRAPH_HOST).post("/v1.0/subscriptions").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("createMailFolderSubscription", {
        connection: delegatedConnection(),
        notificationUrl: NOTIFICATION_URL,
        changeType: ["created"],
      }),
    ).rejects.toThrow();
  });
});

describe("listSubscriptions", () => {
  test("returns only the subscriptions pointed at this instance's webhooks", async () => {
    const scope = nock(GRAPH_HOST)
      .get("/v1.0/subscriptions")
      .reply(200, {
        ...listSubscriptionsExamplePayload.data,
        value: [instanceSubscription, otherSubscription],
      });

    const result = await harness.action(
      "listSubscriptions",
      { connection: delegatedConnection() },
      flowContext,
    );

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      "@odata.context": listSubscriptionsExamplePayload.data["@odata.context"],
      value: [instanceSubscription],
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/subscriptions").reply(403, GRAPH_ERROR);

    await expect(
      harness.action("listSubscriptions", { connection: delegatedConnection() }, flowContext),
    ).rejects.toThrow();
  });
});

describe("updateEventSubscription", () => {
  test("patches the subscription's expiration", async () => {
    const scope = nock(GRAPH_HOST)
      .patch(`/v1.0/subscriptions/${SUBSCRIPTION_ID}`, {
        expirationDateTime: "2026-12-31T23:59:59.999Z",
      })
      .reply(200, updateEventSubscriptionExamplePayload.data);

    const result = await harness.action("updateEventSubscription", {
      connection: delegatedConnection(),
      subscriptionId: SUBSCRIPTION_ID,
      expirationDateTime: "2026-12-31T23:59:59.999Z",
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(updateEventSubscriptionExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).patch(`/v1.0/subscriptions/${SUBSCRIPTION_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("updateEventSubscription", {
        connection: delegatedConnection(),
        subscriptionId: SUBSCRIPTION_ID,
      }),
    ).rejects.toThrow();
  });
});

describe("deleteSubscription", () => {
  test("deletes the subscription", async () => {
    const scope = nock(GRAPH_HOST).delete(`/v1.0/subscriptions/${SUBSCRIPTION_ID}`).reply(204);

    const result = await harness.action("deleteSubscription", {
      connection: delegatedConnection(),
      subscriptionId: SUBSCRIPTION_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: SUBSCRIPTION_ID,
      message: "Subscription deleted successfully",
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).delete(`/v1.0/subscriptions/${SUBSCRIPTION_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("deleteSubscription", {
        connection: delegatedConnection(),
        subscriptionId: SUBSCRIPTION_ID,
      }),
    ).rejects.toThrow();
  });
});

describe("deleteAllInstanceSubscriptions", () => {
  test("deletes only the subscriptions pointed at this instance's webhooks", async () => {
    nock(GRAPH_HOST)
      .get("/v1.0/subscriptions")
      .reply(200, { value: [instanceSubscription, otherSubscription] });
    const deleteScope = nock(GRAPH_HOST)
      .delete(`/v1.0/subscriptions/${instanceSubscription.id}`)
      .reply(204);

    const result = await harness.action(
      "deleteAllInstanceSubscriptions",
      { connection: delegatedConnection() },
      flowContext,
    );

    expect(deleteScope.isDone()).toBe(true);
    expect(result?.data).toEqual({ subscriptionsRemoved: [instanceSubscription.id] });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/subscriptions").reply(500, GRAPH_ERROR);

    await expect(
      harness.action(
        "deleteAllInstanceSubscriptions",
        { connection: delegatedConnection() },
        flowContext,
      ),
    ).rejects.toThrow();
  });
});
