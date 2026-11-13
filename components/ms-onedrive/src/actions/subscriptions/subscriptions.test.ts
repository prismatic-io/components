import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import {
  createSubscriptionExamplePayload,
  listSubscriptionsExamplePayload,
} from "../../examplePayloads";
import { createSubscription } from "./createSubscription";
import { deleteSubscription } from "./deleteSubscription";
import { deleteSubscriptions } from "./deleteSubscriptions";
import { listSubscriptions } from "./listSubscriptions";

const oneDriveConnection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const [instanceSubscription] = listSubscriptionsExamplePayload.data.value;
const instanceContext = {
  webhookUrls: { "Drive flow": instanceSubscription.notificationUrl },
};
const NEW_NOTIFICATION_URL =
  "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOm5ldy1mbG93";
const createParams = {
  oneDriveConnection,
  changeType: "updated",
  notificationUrl: NEW_NOTIFICATION_URL,
  resource: "/me/drive/root",
  expirationDateTime: "2026-11-12T12:00:00.000Z",
  clientState: "client-specific-string",
  allowDuplicates: false,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("createSubscription", () => {
  test("creates the subscription when no existing one uses the notification URL", async () => {
    nock(BASE_URL)
      .get("/subscriptions")
      .reply(200, listSubscriptionsExamplePayload.data);
    nock(BASE_URL)
      .post("/subscriptions", {
        changeType: "updated",
        notificationUrl: NEW_NOTIFICATION_URL,
        resource: "/me/drive/root",
        expirationDateTime: "2026-11-12T12:00:00.000Z",
        clientState: "client-specific-string",
      })
      .reply(201, createSubscriptionExamplePayload.data);

    const { result } = await invoke(createSubscription, createParams);

    expect(result).toEqual(createSubscriptionExamplePayload);
  });

  test("rejects when Graph refuses the subscription", async () => {
    nock(BASE_URL)
      .get("/subscriptions")
      .reply(200, listSubscriptionsExamplePayload.data);
    nock(BASE_URL)
      .post("/subscriptions")
      .reply(400, {
        error: {
          code: "InvalidRequest",
          message: "Subscription validation request failed.",
        },
      });

    await expect(invoke(createSubscription, createParams)).rejects.toThrow();
  });
});

describe("deleteSubscription", () => {
  test("deletes the subscription", async () => {
    const scope = nock(BASE_URL)
      .delete(`/subscriptions/${instanceSubscription.id}`)
      .reply(204);

    const { result } = await invoke(deleteSubscription, {
      oneDriveConnection,
      subscriptionId: instanceSubscription.id,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: "" });
  });

  test("rejects when the subscription does not exist", async () => {
    nock(BASE_URL)
      .delete(`/subscriptions/${instanceSubscription.id}`)
      .reply(404, {
        error: { code: "ResourceNotFound", message: "Not found" },
      });

    await expect(
      invoke(deleteSubscription, {
        oneDriveConnection,
        subscriptionId: instanceSubscription.id,
      }),
    ).rejects.toThrow();
  });
});

describe("deleteSubscriptions", () => {
  test("deletes only the subscriptions pointing at this instance's webhooks", async () => {
    nock(BASE_URL)
      .get("/subscriptions")
      .reply(200, listSubscriptionsExamplePayload.data);
    const deletion = nock(BASE_URL)
      .delete(`/subscriptions/${instanceSubscription.id}`)
      .reply(204);

    const { result } = await invoke(
      deleteSubscriptions,
      { oneDriveConnection },
      instanceContext,
    );

    expect(deletion.isDone()).toBe(true);
    expect(result).toEqual({
      data: { subscriptionsRemoved: [instanceSubscription.id] },
    });
  });

  test("rejects when listing subscriptions fails", async () => {
    nock(BASE_URL).get("/subscriptions").reply(503, {});

    await expect(
      invoke(deleteSubscriptions, { oneDriveConnection }, instanceContext),
    ).rejects.toThrow();
  });
});

describe("listSubscriptions", () => {
  test("keeps only this instance's subscriptions when asked", async () => {
    nock(BASE_URL)
      .get("/subscriptions")
      .reply(200, listSubscriptionsExamplePayload.data);

    const { result } = await invoke(
      listSubscriptions,
      { oneDriveConnection, showInstanceSubscriptions: true },
      instanceContext,
    );

    expect(result).toEqual({
      data: {
        ...listSubscriptionsExamplePayload.data,
        value: [instanceSubscription],
      },
    });
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).get("/subscriptions").reply(403, {});

    await expect(
      invoke(
        listSubscriptions,
        { oneDriveConnection, showInstanceSubscriptions: true },
        instanceContext,
      ),
    ).rejects.toThrow();
  });
});
