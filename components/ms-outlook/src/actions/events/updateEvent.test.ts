import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { updateEventExamplePayload } from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";
const EVENT_PATH = `/v1.0/me/events/${EVENT_ID}`;

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("updateEvent", () => {
  test("sends no start or end when Schedule arrives undefined", async () => {
    const scope = nock(GRAPH_HOST)
      .patch(EVENT_PATH, { subject: "Team Meeting" })
      .reply(200, updateEventExamplePayload.data);

    const result = await harness.action("updateEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
      eventDetails: { subject: "Team Meeting" },
      schedule: undefined,
      attendees: [],
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(updateEventExamplePayload.data);
  });

  test("sends start and end with their timezones when Schedule is filled", async () => {
    const scope = nock(GRAPH_HOST)
      .patch(EVENT_PATH, {
        start: { dateTime: "2026-12-15T12:00:00", timeZone: "UTC" },
        end: { dateTime: "2026-12-15T14:00:00", timeZone: "Pacific Standard Time" },
      })
      .reply(200, updateEventExamplePayload.data);

    await harness.action("updateEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
      schedule: {
        start: "2026-12-15T12:00:00",
        startTimezone: "UTC",
        end: "2026-12-15T14:00:00",
        endTimezone: "Pacific Standard Time",
      },
      attendees: [],
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST)
      .patch(EVENT_PATH)
      .reply(404, { error: { code: "ErrorItemNotFound", message: "Not found." } });

    await expect(
      harness.action("updateEvent", {
        connection: delegatedConnection(),
        eventId: EVENT_ID,
        eventDetails: { subject: "Team Meeting" },
        attendees: [],
      }),
    ).rejects.toThrow();
  });
});
