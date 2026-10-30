import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { jiraOAuthConnection } from "../connections";
import { webhookEventsExamplePayload } from "../examplePayloads";
import { basicConnection } from "../testHelpers";
import { webhookEvents } from "./webhookEvents";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const CLOUD_ID = "cloud-123";
const STATE_KEY = "flowStableId";
const DAY_MS = 24 * 60 * 60 * 1000;

const oauthConnection = () =>
  createConnection(
    jiraOAuthConnection,
    { version: "3" },
    { access_token: "oauth-token" },
  );

const params = (jiraConnection: ReturnType<typeof basicConnection>) => ({
  jiraConnection,
  eventTypes: ["jira:issue_created"],
  jqlFilter: "project = PROJ",
  fieldIdsFilter: [],
});

const mockAccessibleResources = () =>
  nock("https://api.atlassian.com")
    .get("/oauth/token/accessible-resources")
    .reply(200, [
      { id: CLOUD_ID, url: "https://example.atlassian.net", name: "example" },
    ]);

describe("issueEventsTrigger perform", () => {
  test("returns the payload unchanged under basic auth without calling Jira", async () => {
    const { result } = await invokeTrigger(
      webhookEvents,
      {},
      webhookEventsExamplePayload.payload,
      params(basicConnection()),
    );

    expect(result).toEqual({ payload: webhookEventsExamplePayload.payload });
  });

  test("under OAuth resolves the site and skips the refresh when no webhook is stored", async () => {
    const scope = mockAccessibleResources();

    const { result } = await invokeTrigger(
      webhookEvents,
      { crossFlowState: {} },
      webhookEventsExamplePayload.payload,
      params(oauthConnection()),
    );

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ payload: webhookEventsExamplePayload.payload });
  });

  test("under OAuth leaves a webhook alone while it is far from expiring", async () => {
    const scope = mockAccessibleResources();
    const stored = {
      webhookId: 7,
      expirationDate: new Date(Date.now() + 30 * DAY_MS).toISOString(),
    };
    const crossFlowState: Record<string, unknown> = { [STATE_KEY]: stored };

    const { result } = await invokeTrigger(
      webhookEvents,
      { crossFlowState },
      webhookEventsExamplePayload.payload,
      params(oauthConnection()),
    );

    expect(scope.isDone()).toBe(true);
    expect(crossFlowState[STATE_KEY]).toEqual(stored);
    expect(result).toEqual({ payload: webhookEventsExamplePayload.payload });
  });

  test("under OAuth refreshes a webhook close to expiry and stores the new expiration", async () => {
    const newExpiration = new Date(Date.now() + 30 * DAY_MS).toISOString();
    const resources = mockAccessibleResources();
    const refresh = nock("https://api.atlassian.com")
      .put(`/ex/jira/${CLOUD_ID}/rest/api/3/webhook/refresh`, {
        webhookIds: [7],
      })
      .reply(200, { expirationDate: newExpiration });
    const crossFlowState: Record<string, unknown> = {
      [STATE_KEY]: {
        webhookId: 7,
        expirationDate: new Date(Date.now() + 2 * DAY_MS).toISOString(),
      },
    };

    const { result } = await invokeTrigger(
      webhookEvents,
      { crossFlowState },
      webhookEventsExamplePayload.payload,
      params(oauthConnection()),
    );

    expect(resources.isDone()).toBe(true);
    expect(refresh.isDone()).toBe(true);
    expect(crossFlowState[STATE_KEY]).toEqual({
      webhookId: 7,
      expirationDate: newExpiration,
    });
    expect(result).toEqual({ payload: webhookEventsExamplePayload.payload });
  });
});
