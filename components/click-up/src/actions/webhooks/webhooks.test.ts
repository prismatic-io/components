import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  createWebhookExamplePayload,
  updateWebhookExamplePayload,
} from "../../examplePayloads";
import { createWebhook } from "./createWebhook";
import { updateWebhook } from "./updateWebhook";
const API = "https://api.clickup.com";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
interface Captured {
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}
const mockClickUp = (
  method: string,
  path: string,
  status: number,
  reply: unknown,
): Captured => {
  const captured: Captured = {};
  nock(API)
    .intercept(`/api/v2${path}`, method, (body) => {
      captured.body = body;
      return true;
    })
    .query((query) => {
      captured.query = query;
      return true;
    })
    .reply(status, function () {
      captured.headers = this.req.headers;
      return reply as nock.Body;
    });
  return captured;
};
type ActionUnderTest = {
  inputs: Record<
    string,
    {
      type?: string;
    }
  >;
  perform: unknown;
};
const run = (action: ActionUnderTest, params: Record<string, unknown>) => {
  const connectionKey = Object.keys(action.inputs).find(
    (key) => action.inputs[key].type === "connection",
  ) as string;
  return invoke(
    action as any,
    { [connectionKey]: connection, ...params } as any,
  );
};
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  const consumed = nock.isDone();
  nock.cleanAll();
  expect(consumed).toBe(true);
});
describe("createWebhook", () => {
  const params = {
    teamId: "9012345",
    endpoint: "https://hooks.example.com/clickup",
    spaceId: "790",
    events: ["taskCreated", "taskUpdated"],
    folderId: "",
    listId: "124",
    taskId: undefined,
  };
  test("happy path converts location IDs to integers and returns the webhook", async () => {
    const req = mockClickUp(
      "POST",
      "/team/9012345/webhook",
      200,
      createWebhookExamplePayload.data,
    );
    const { result } = await run(createWebhook, params);
    expect(result).toEqual(createWebhookExamplePayload);
    expect(req.body).toEqual({
      endpoint: "https://hooks.example.com/clickup",
      events: ["taskCreated", "taskUpdated"],
      space_id: 790,
      list_id: 124,
    });
  });
});
describe("updateWebhook", () => {
  const params = {
    webhookId: "4b67ac88",
    endpoint: "https://hooks.example.com/clickup",
    events: ["taskCreated"],
    allEvents: true,
    status: "active",
  };
  test("happy path sends events '*' when All Events is on and returns the webhook", async () => {
    const req = mockClickUp(
      "PUT",
      "/webhook/4b67ac88",
      200,
      updateWebhookExamplePayload.data,
    );
    const { result } = await run(updateWebhook, params);
    expect(result).toEqual(updateWebhookExamplePayload);
    expect(req.body).toEqual({
      endpoint: "https://hooks.example.com/clickup",
      events: "*",
      status: "active",
    });
  });
});
