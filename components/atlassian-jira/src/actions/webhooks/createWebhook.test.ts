import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { createWebhook } from "./createWebhook";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const WEBHOOK_URL = "https://hooks.example.com/trigger/abc123";

const create = () =>
  invoke(createWebhook, {
    jiraConnection: basicConnection(),
    webhookUrl: WEBHOOK_URL,
    webhookDetails: {
      name: "Issue created",
      events: ["jira:issue_created"],
      filters: { "issue-related-events-section": "project = PROJ" },
    },
  });

describe("createWebhook under basic auth", () => {
  test("posts the details merged with the url to the legacy webhook API", async () => {
    const scope = jiraApi()
      .post(
        "/rest/webhooks/1.0/webhook",
        (body) =>
          body.url === WEBHOOK_URL &&
          body.name === "Issue created" &&
          body.events[0] === "jira:issue_created" &&
          !("webhooks" in body),
      )
      .reply(201, createWebhookExamplePayload.data);

    const { result } = await create();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createWebhookExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/webhooks/1.0/webhook")
      .reply(400, { errorMessages: ["bad request"] });

    await expect(create()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
