import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { vi } from "vitest";
import { oauth } from "../../connections/oauth";
import {
  createSiteListSubscriptionExamplePayload,
  createSubscriptionExamplePayload,
  deleteAllInstanceSubscriptionsExamplePayload,
  deleteSubscriptionExamplePayload,
  listSubscriptionsExamplePayload,
  renewSubscriptionExamplePayload,
  updateSiteListSubscriptionExpirationExamplePayload,
} from "../../examplePayloads";
import { createSiteListSubscription } from "./createSiteListSubscription";
import { createSubscription } from "./createSubscription";
import { deleteAllInstanceSubscriptions } from "./deleteAllInstanceSubscriptions";
import { deleteSubscription } from "./deleteSubscription";
import { listSubscriptions } from "./listSubscriptions";
import { renewSubscription } from "./renewSubscription";
import { updateSiteListSubscriptionExpiration } from "./updateSiteListSubscriptionExpiration";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const LIST_ID = "3a3c0f6a-86da-4567-94d4-3b939da63200";
const [driveRootSubscription, siteListSubscription] = listSubscriptionsExamplePayload.data.value;
const NOTIFICATION_URL = driveRootSubscription.notificationUrl;
const OTHER_URL = "https://hooks.example.com/trigger/T3RoZXJJbnN0YW5jZUZsb3c=";
const NOW = new Date("2026-11-09T12:00:00.000Z");
const notFound = {
  error: { code: "ResourceNotFound", message: "The object was not found." },
};
const badRequest = {
  error: { code: "InvalidRequest", message: "Subscription validation request failed." },
};
const serverError = {
  error: { code: "generalException", message: "An unspecified error has occurred." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  vi.useRealTimers();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("createSubscription", () => {
  const params = {
    connection,
    changeType: driveRootSubscription.changeType,
    notificationUrl: NOTIFICATION_URL,
    resource: driveRootSubscription.resource,
    expirationDateTime: driveRootSubscription.expirationDateTime,
    clientState: createSubscriptionExamplePayload.data.clientState,
  };

  test("posts the subscription when duplicates are allowed", async () => {
    const scope = nock(GRAPH)
      .post("/v1.0/subscriptions", {
        changeType: params.changeType,
        notificationUrl: params.notificationUrl,
        resource: params.resource,
        expirationDateTime: params.expirationDateTime,
        clientState: params.clientState,
      })
      .reply(201, createSubscriptionExamplePayload.data);

    const { result } = await invoke(createSubscription, { ...params, allowDuplicates: true });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(createSubscriptionExamplePayload);
  });

  test("returns the existing subscription for the same URL instead of posting", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, listSubscriptionsExamplePayload.data);

    const { result } = await invoke(createSubscription, { ...params, allowDuplicates: false });

    expect(result).toEqual({ data: driveRootSubscription });
  });

  test("rejects when Graph cannot validate the notification URL", async () => {
    nock(GRAPH).post("/v1.0/subscriptions").reply(400, badRequest);

    await expect(invoke(createSubscription, { ...params, allowDuplicates: true })).rejects.toThrow(
      "Request failed with status code 400",
    );
  });
});

describe("deleteSubscription", () => {
  test("deletes the subscription and returns the standard delete record", async () => {
    const scope = nock(GRAPH).delete(`/v1.0/subscriptions/${driveRootSubscription.id}`).reply(204);

    const { result } = await invoke(deleteSubscription, {
      connection,
      subscriptionId: driveRootSubscription.id,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({
      data: { ...deleteSubscriptionExamplePayload.data, id: driveRootSubscription.id },
    });
  });

  test("rejects when the subscription does not exist", async () => {
    nock(GRAPH).delete(`/v1.0/subscriptions/${driveRootSubscription.id}`).reply(404, notFound);

    await expect(
      invoke(deleteSubscription, { connection, subscriptionId: driveRootSubscription.id }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("deleteAllInstanceSubscriptions", () => {
  test("deletes every subscription pointed at the notification URL", async () => {
    nock(GRAPH)
      .get("/v1.0/subscriptions")
      .reply(200, {
        ...listSubscriptionsExamplePayload.data,
        value: [
          ...listSubscriptionsExamplePayload.data.value,
          {
            ...siteListSubscription,
            id: "5b1a7c3e-0f2d-4e6a-9c8b-7d6e5f4a3b2c",
            notificationUrl: OTHER_URL,
          },
        ],
      });
    const deletions = nock(GRAPH)
      .delete(`/v1.0/subscriptions/${driveRootSubscription.id}`)
      .reply(204)
      .delete(`/v1.0/subscriptions/${siteListSubscription.id}`)
      .reply(204);

    const { result } = await invoke(deleteAllInstanceSubscriptions, {
      connection,
      notificationUrl: NOTIFICATION_URL,
    });

    expect(deletions.isDone()).toBe(true);
    const { subscriptionsRemoved, count } = deleteAllInstanceSubscriptionsExamplePayload.data;
    expect(result.data.count).toBe(count);
    expect([...result.data.subscriptionsRemoved].sort()).toEqual([...subscriptionsRemoved].sort());
  });

  test("falls back to the flow's own webhook URL", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, listSubscriptionsExamplePayload.data);
    nock(GRAPH)
      .delete(`/v1.0/subscriptions/${driveRootSubscription.id}`)
      .reply(204)
      .delete(`/v1.0/subscriptions/${siteListSubscription.id}`)
      .reply(204);

    const { result } = await invoke(
      deleteAllInstanceSubscriptions,
      { connection, notificationUrl: undefined },
      {
        flow: { id: "flowId", name: "Flow 1", stableId: "flowStableId" },
        webhookUrls: { "Flow 1": NOTIFICATION_URL },
      },
    );

    expect(result.data.count).toBe(2);
  });

  test("rejects when the subscriptions cannot be listed", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(500, serverError);

    await expect(
      invoke(deleteAllInstanceSubscriptions, { connection, notificationUrl: NOTIFICATION_URL }),
    ).rejects.toThrow("Request failed with status code 500");
  });
});

describe("listSubscriptions", () => {
  test("returns every subscription", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, listSubscriptionsExamplePayload.data);

    const { result } = await invoke(listSubscriptions, {
      connection,
      showInstanceSubscriptions: false,
    });

    expect(result).toEqual(listSubscriptionsExamplePayload);
  });

  test("keeps only the subscriptions that point at this instance's webhooks", async () => {
    const foreign = { ...siteListSubscription, notificationUrl: OTHER_URL };
    nock(GRAPH)
      .get("/v1.0/subscriptions")
      .reply(200, {
        ...listSubscriptionsExamplePayload.data,
        value: [driveRootSubscription, foreign],
      });

    const { result } = await invoke(
      listSubscriptions,
      { connection, showInstanceSubscriptions: true },
      { webhookUrls: { "Flow 1": NOTIFICATION_URL } },
    );

    expect(result.data.value).toEqual([driveRootSubscription]);
  });

  test("rejects when the subscriptions cannot be listed", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(500, serverError);

    await expect(
      invoke(listSubscriptions, { connection, showInstanceSubscriptions: false }),
    ).rejects.toThrow("Request failed with status code 500");
  });
});

describe("renewSubscription", () => {
  test("patches the expiration the given number of days ahead", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    const expirationDateTime = new Date(NOW.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const scope = nock(GRAPH)
      .patch(`/v1.0/subscriptions/${driveRootSubscription.id}`, { expirationDateTime })
      .reply(200, renewSubscriptionExamplePayload.data);

    const { result } = await invoke(renewSubscription, {
      connection,
      subscriptionId: driveRootSubscription.id,
      expirationDays: 3,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(renewSubscriptionExamplePayload);
  });

  test("rejects when the subscription has already expired", async () => {
    nock(GRAPH).patch(`/v1.0/subscriptions/${driveRootSubscription.id}`).reply(404, notFound);

    await expect(
      invoke(renewSubscription, {
        connection,
        subscriptionId: driveRootSubscription.id,
        expirationDays: 3,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("createSiteListSubscription", () => {
  const params = {
    connection,
    siteId: SITE_ID,
    listId: LIST_ID,
    notificationUrl: NOTIFICATION_URL,
    expirationDateTime: siteListSubscription.expirationDateTime,
  };

  test("posts an updated-only subscription on the list", async () => {
    const scope = nock(GRAPH)
      .post("/v1.0/subscriptions", {
        resource: `sites/${SITE_ID}/lists/${LIST_ID}`,
        notificationUrl: NOTIFICATION_URL,
        changeType: "updated",
        expirationDateTime: params.expirationDateTime,
      })
      .reply(201, createSiteListSubscriptionExamplePayload.data);

    const { result } = await invoke(createSiteListSubscription, {
      ...params,
      allowDuplicates: true,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(createSiteListSubscriptionExamplePayload);
  });

  test("returns the existing subscription for the same URL instead of posting", async () => {
    nock(GRAPH).get("/v1.0/subscriptions").reply(200, listSubscriptionsExamplePayload.data);

    const { result } = await invoke(createSiteListSubscription, {
      ...params,
      allowDuplicates: false,
    });

    expect(result).toEqual({ data: driveRootSubscription });
  });

  test("rejects when Graph cannot validate the notification URL", async () => {
    nock(GRAPH).post("/v1.0/subscriptions").reply(400, badRequest);

    await expect(
      invoke(createSiteListSubscription, { ...params, allowDuplicates: true }),
    ).rejects.toThrow("Request failed with status code 400");
  });
});

describe("updateSiteListSubscriptionExpiration", () => {
  const { expirationDateTime } = updateSiteListSubscriptionExpirationExamplePayload.data;

  test("patches the new expiration", async () => {
    const scope = nock(GRAPH)
      .patch(`/v1.0/subscriptions/${siteListSubscription.id}`, { expirationDateTime })
      .reply(200, updateSiteListSubscriptionExpirationExamplePayload.data);

    const { result } = await invoke(updateSiteListSubscriptionExpiration, {
      connection,
      subscriptionId: siteListSubscription.id,
      expirationDateTime,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(updateSiteListSubscriptionExpirationExamplePayload);
  });

  test("rejects when the subscription does not exist", async () => {
    nock(GRAPH).patch(`/v1.0/subscriptions/${siteListSubscription.id}`).reply(404, notFound);

    await expect(
      invoke(updateSiteListSubscriptionExpiration, {
        connection,
        subscriptionId: siteListSubscription.id,
        expirationDateTime,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
