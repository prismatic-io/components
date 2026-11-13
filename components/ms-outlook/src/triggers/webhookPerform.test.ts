import { invokeTrigger } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  getCalendarEventExamplePayload,
  listMessagesExamplePayload,
  mailFolderWebhookExamplePayload,
  webhookLifecycleExamplePayload,
  webhookExamplePayload,
} from "../examplePayloads";
import { mailFolderWebhookInputs } from "../inputs";
import { delegatedConnection, GRAPH_HOST } from "../testHelpers";
import { mailFolderWebhook } from "./mailFolderWebhook";
import { webhook } from "./webhook";
import { webhookLifecycle } from "./webhookLifecycle";

const VALIDATION_TOKEN = "Validation: Testing client application reachability";
const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";

const validationPayload = () =>
  ({
    ...webhookExamplePayload.payload,
    headers: {},
    queryParameters: { validationToken: VALIDATION_TOKEN },
    body: { data: "" },
  }) as never;

const eventNotification = (changeType: string) => {
  const payload = structuredClone(webhookLifecycleExamplePayload.payload);
  const { eventData: _eventData, ...fixture } = (
    payload.body.data as { value: Record<string, unknown>[] }
  ).value[0];
  const notification = { ...fixture, changeType };
  payload.body.data = { value: [notification] };
  return { payload, notification };
};

const MESSAGE_ID = "AAMkAGUAAAwTW09AAA=";
const fetchedMessage = listMessagesExamplePayload.data.value[0];

const messageNotification = (changeType: string) => {
  const payload = structuredClone(mailFolderWebhookExamplePayload.payload);
  const { messageData: _messageData, ...fixture } = (
    payload.body.data as { value: Record<string, unknown>[] }
  ).value[0];
  const notification = { ...fixture, changeType };
  payload.body.data = { value: [notification] };
  return { payload, notification };
};

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe.each([
  ["webhook", webhook],
  ["webhookLifecycle", webhookLifecycle],
  ["mailFolderWebhook", mailFolderWebhook],
] as const)("%s URL validation", (_name, trigger) => {
  test("echoes the validation token as text/plain without calling Graph", async () => {
    const { result } = await invokeTrigger(trigger as never, {}, validationPayload(), {
      connection: delegatedConnection(),
    } as never);

    expect(result).toMatchObject({
      branch: "URL Validation",
      response: { statusCode: 200, contentType: "text/plain", body: VALIDATION_TOKEN },
    });
  });
});

describe("webhook notification", () => {
  test("passes the notification through on the Notification branch", async () => {
    const payload = structuredClone(webhookExamplePayload.payload);

    const { result } = await invokeTrigger(webhook, {}, payload, {} as never);

    expect(result?.branch).toBe("Notification");
    expect(result?.payload.body).toEqual(webhookExamplePayload.payload.body);
  });
});

describe("webhookLifecycle notification", () => {
  test("attaches the fetched event to each notification as eventData", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}`)
      .reply(200, getCalendarEventExamplePayload.data);

    const { payload, notification } = eventNotification("updated");

    const { result } = await invokeTrigger(webhookLifecycle, {}, payload, {
      connection: delegatedConnection(),
    } as never);

    expect(scope.isDone()).toBe(true);
    expect(result?.branch).toBe("Notification");
    expect(result?.payload.body.data).toEqual({
      value: [{ ...notification, eventData: getCalendarEventExamplePayload.data }],
    });
  });

  test("skips the fetch for a deleted event", async () => {
    const { payload, notification } = eventNotification("deleted");

    const { result, loggerMock } = await invokeTrigger(webhookLifecycle, {}, payload, {
      connection: delegatedConnection(),
    } as never);

    expect(result?.branch).toBe("Notification");
    expect(result?.payload.body.data).toEqual({ value: [notification] });
    expect(loggerMock.warn).not.toHaveBeenCalled();
  });
});

describe("mailFolderWebhook notification", () => {
  test("attaches the fetched message as messageData by default", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}`)
      .reply(200, fetchedMessage);
    const { payload, notification } = messageNotification("created");

    const { result } = await invokeTrigger(mailFolderWebhook, {}, payload, {
      connection: delegatedConnection(),
      skipMessageFetch: false,
    } as never);

    expect(scope.isDone()).toBe(true);
    expect(result?.branch).toBe("Notification");
    expect(result?.payload.body.data).toEqual({
      value: [{ ...notification, messageData: fetchedMessage }],
    });
  });

  test("still fetches when Skip Message Fetch has no value", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}`)
      .reply(200, fetchedMessage);
    const { payload } = messageNotification("created");

    await invokeTrigger(mailFolderWebhook, {}, payload, {
      connection: delegatedConnection(),
    } as never);

    expect(scope.isDone()).toBe(true);
  });

  test("returns the notification without calling Graph when Skip Message Fetch is on", async () => {
    const { payload, notification } = messageNotification("created");

    const { result, loggerMock } = await invokeTrigger(mailFolderWebhook, {}, payload, {
      connection: delegatedConnection(),
      skipMessageFetch: true,
    } as never);

    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(result?.branch).toBe("Notification");
    expect(result?.payload.body.data).toEqual({ value: [notification] });
  });

  test("never fetches a deleted message", async () => {
    const { payload, notification } = messageNotification("deleted");

    const { result, loggerMock } = await invokeTrigger(mailFolderWebhook, {}, payload, {
      connection: delegatedConnection(),
      skipMessageFetch: false,
    } as never);

    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(result?.payload.body.data).toEqual({ value: [notification] });
  });
});

describe("notification without a resource id", () => {
  test("fetches nothing rather than reading the whole collection", async () => {
    const { payload, notification } = messageNotification("created");
    const { resourceData: _resourceData, ...withoutResource } = notification as Record<
      string,
      unknown
    >;
    payload.body.data = { value: [withoutResource] };

    const { result, loggerMock } = await invokeTrigger(mailFolderWebhook, {}, payload, {
      connection: delegatedConnection(),
      skipMessageFetch: false,
    } as never);

    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(result?.payload.body.data).toEqual({ value: [withoutResource] });
  });
});

describe("skipMessageFetch.clean", () => {
  const clean = mailFolderWebhookInputs.skipMessageFetch.clean;

  test("keeps fetching when the value is missing or false", () => {
    expect(clean(undefined)).toBe(false);
    expect(clean("")).toBe(false);
    expect(clean("false")).toBe(false);
  });

  test("skips the fetch only when explicitly true", () => {
    expect(clean("true")).toBe(true);
    expect(clean(true)).toBe(true);
  });
});
