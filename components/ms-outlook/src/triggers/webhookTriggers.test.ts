import type { ActionContext, Connection } from "@prismatic-io/spectral";
import nock from "nock";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../testHelpers";
import { mailFolderWebhook } from "./mailFolderWebhook";
import { webhookLifecycle } from "./webhookLifecycle";

const FLOW_NAME = "Outlook Flow";

const connections = [
  ["delegated", delegatedConnection, "me"],
  ["client-credentials", clientCredentialsConnection, `users/${CLIENT_CREDENTIALS_USER_ID}`],
] as const;

const expectSubscription = () => {
  const sent: { resource?: string } = {};
  nock(GRAPH_HOST)
    .post("/v1.0/subscriptions", (body) => Object.assign(sent, body) !== undefined)
    .reply(201, { id: "subscription-id" });
  return sent;
};

const deployContext = (): ActionContext =>
  ({
    flow: { id: "flow-id", name: FLOW_NAME },
    webhookUrls: { [FLOW_NAME]: "https://hooks.example.com/trigger/abc" },
    debug: { enabled: false },
    logger: { info: () => undefined, warn: () => undefined },
    crossFlowState: {},
  }) as unknown as ActionContext;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe.each(connections)("deploying with a %s connection", (_label, connection, owner) => {
  test("the Calendar Event Webhook subscribes to the mailbox's events", async () => {
    const sent = expectSubscription();

    await webhookLifecycle.webhookLifecycleHandlers?.create?.(deployContext(), {
      connection: connection() as Connection,
      allowDuplicates: true,
      expirationDateTime: "",
    } as never);

    expect(sent.resource).toBe(`${owner}/events`);
  });

  test.each([
    [undefined, "messages"],
    ["AAMkFolder=", "mailFolders/AAMkFolder=/messages"],
  ])("the Mail Message Webhook with folder %s subscribes to %s", async (folderId, path) => {
    const sent = expectSubscription();

    await mailFolderWebhook.webhookLifecycleHandlers?.create?.(deployContext(), {
      connection: connection() as Connection,
      allowDuplicates: true,
      expirationDateTime: "",
      folderId,
      changeTypes: ["created"],
    } as never);

    expect(sent.resource).toBe(`${owner}/${path}`);
  });
});
