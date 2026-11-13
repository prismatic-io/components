import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  listCalendarsExamplePayload,
  listEventsExamplePayload,
  listMailFoldersExamplePayload,
  listMessagesExamplePayload,
  listSubscriptionsExamplePayload,
  listSupportedLanguagesExamplePayload,
  listSupportedTimezonesExamplePayload,
} from "../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../testHelpers";
import { selectCalendar } from "./selectCalendar";
import { selectEvent } from "./selectEvent";
import { selectLanguage } from "./selectLanguage";
import { selectMailFolder } from "./selectMailFolder";
import { selectMessage } from "./selectMessage";
import { selectSubscription } from "./selectSubscription";
import { selectTimezone } from "./selectTimezone";

const EMPTY_LIST = { "@odata.context": "context", value: [] };

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const cases = [
  [
    "selectCalendar",
    selectCalendar,
    "/v1.0/me/calendars",
    listCalendarsExamplePayload.data,
    listCalendarsExamplePayload.data.value.map((calendar) => ({
      label: calendar.name,
      key: calendar.id,
    })),
  ],
  [
    "selectEvent",
    selectEvent,
    "/v1.0/me/events",
    listEventsExamplePayload.data,
    listEventsExamplePayload.data.value.map((event) => ({ label: event.subject, key: event.id })),
  ],
  [
    "selectMailFolder",
    selectMailFolder,
    "/v1.0/me/mailFolders",
    listMailFoldersExamplePayload.data,
    listMailFoldersExamplePayload.data.value.map((folder) => ({
      label: folder.displayName,
      key: folder.id,
    })),
  ],
  [
    "selectMessage",
    selectMessage,
    "/v1.0/me/messages",
    listMessagesExamplePayload.data,
    listMessagesExamplePayload.data.value.map((message) => ({
      label: message.subject,
      key: message.id,
    })),
  ],
  [
    "selectSubscription",
    selectSubscription,
    "/v1.0/subscriptions",
    listSubscriptionsExamplePayload.data,
    listSubscriptionsExamplePayload.data.value.map((subscription) => ({
      label: `${subscription.resource} (${subscription.notificationUrl})`,
      key: subscription.id,
    })),
  ],
  [
    "selectLanguage",
    selectLanguage,
    "/v1.0/me/outlook/supportedLanguages",
    listSupportedLanguagesExamplePayload.data,
    [
      { label: "English (United States) (en-US)", key: "en-US" },
      { label: "Spanish (Spain) (es-ES)", key: "es-ES" },
    ],
  ],
  [
    "selectTimezone",
    selectTimezone,
    "/v1.0/me/outlook/supportedTimeZones",
    listSupportedTimezonesExamplePayload.data,
    [
      {
        label: "(UTC-05:00) Eastern Time (US & Canada) (Eastern Standard Time)",
        key: "Eastern Standard Time",
      },
      {
        label: "(UTC-08:00) Pacific Time (US & Canada) (Pacific Standard Time)",
        key: "Pacific Standard Time",
      },
    ],
  ],
] as const;

describe.each(cases)("%s", (_name, dataSource, path, reply, expected) => {
  test("maps each item to a label and key", async () => {
    const scope = nock(GRAPH_HOST).get(path).reply(200, reply);

    const { result } = await invokeDataSource(dataSource as never, {
      connection: delegatedConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(expected);
  });

  test("returns an empty list when Graph returns no items", async () => {
    nock(GRAPH_HOST).get(path).reply(200, EMPTY_LIST);

    const { result } = await invokeDataSource(dataSource as never, {
      connection: delegatedConnection(),
    });

    expect(result).toEqual([]);
  });
});
