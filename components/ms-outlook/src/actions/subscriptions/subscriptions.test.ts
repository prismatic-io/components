import type { ActionContext } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  createEventSubscriptionExamplePayload,
  createMailFolderSubscriptionExamplePayload,
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
