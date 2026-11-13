import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { createEventExamplePayload, listEventsExamplePayload } from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";
const CALENDAR_ID = "AAMkAGI2TGuLAAA=";
const GRAPH_ERROR = { error: { code: "ErrorItemNotFound", message: "Not found." } };

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("listEvents", () => {
  test("lists the events of the chosen calendar", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/calendars/${CALENDAR_ID}/events`)
      .reply(200, listEventsExamplePayload.data);

    const result = await harness.action("listEvents", {
      connection: delegatedConnection(),
      calendarId: CALENDAR_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(listEventsExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/me/events").reply(500, GRAPH_ERROR);

    await expect(
      harness.action("listEvents", { connection: delegatedConnection() }),
    ).rejects.toThrow();
  });
});

describe("createEvent", () => {
  const eventInput = {
    subject: "Team Meeting",
    body: "<p>Agenda</p>",
    locationName: "Conference Room A",
    start: "2026-12-15T12:00:00",
    end: "2026-12-15T13:00:00",
    attendees: [{ key: "john.doe@example.com", value: "required" }],
  };

  test("posts the event to /me/events and returns the created event", async () => {
    const scope = nock(GRAPH_HOST)
      .post("/v1.0/me/events", {
        subject: "Team Meeting",
        attendees: [{ emailAddress: { address: "john.doe@example.com" }, type: "required" }],
        location: { displayName: "Conference Room A" },
        start: { dateTime: "2026-12-15T12:00:00", timeZone: "UTC" },
        end: { dateTime: "2026-12-15T13:00:00", timeZone: "UTC" },
        body: { contentType: "html", content: "<p>Agenda</p>" },
      })
      .reply(201, createEventExamplePayload.data);

    const result = await harness.action("createEvent", {
      connection: delegatedConnection(),
      ...eventInput,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(createEventExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post("/v1.0/me/events").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("createEvent", { connection: delegatedConnection(), ...eventInput }),
    ).rejects.toThrow();
  });
});

describe("deleteEvent", () => {
  test("deletes the event", async () => {
    const scope = nock(GRAPH_HOST).delete(`/v1.0/me/events/${EVENT_ID}`).reply(204);

    const result = await harness.action("deleteEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: EVENT_ID,
      message: "Event deleted successfully",
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).delete(`/v1.0/me/events/${EVENT_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("deleteEvent", { connection: delegatedConnection(), eventId: EVENT_ID }),
    ).rejects.toThrow();
  });
});

describe("cancelEvent", () => {
  test("posts the cancellation comment", async () => {
    const scope = nock(GRAPH_HOST)
      .post(`/v1.0/me/events/${EVENT_ID}/cancel`, { comment: "Rescheduled." })
      .reply(202);

    const result = await harness.action("cancelEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
      comment: "Rescheduled.",
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: EVENT_ID,
      message: "Event cancelled successfully",
    });
  });

  test("sends no comment when Comment is empty", async () => {
    const scope = nock(GRAPH_HOST).post(`/v1.0/me/events/${EVENT_ID}/cancel`, {}).reply(202);

    await harness.action("cancelEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
      comment: "",
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post(`/v1.0/me/events/${EVENT_ID}/cancel`).reply(400, GRAPH_ERROR);

    await expect(
      harness.action("cancelEvent", { connection: delegatedConnection(), eventId: EVENT_ID }),
    ).rejects.toThrow();
  });
});
