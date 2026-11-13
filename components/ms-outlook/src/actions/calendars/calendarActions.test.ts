import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import {
  createCalendarExamplePayload,
  getCalendarEventExamplePayload,
  getScheduleExamplePayload,
  listCalendarsExamplePayload,
} from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const CALENDAR_ID = "AAMkADJmMVAAA=";
const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";
const GRAPH_ERROR = { error: { code: "ErrorInvalidRequest", message: "Invalid request." } };

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("listCalendars", () => {
  test("returns the calendars Graph lists for the mailbox", async () => {
    const scope = nock(GRAPH_HOST)
      .get("/v1.0/me/calendars")
      .reply(200, listCalendarsExamplePayload.data);

    const result = await harness.action("listCalendars", { connection: delegatedConnection() });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(listCalendarsExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/me/calendars").reply(403, GRAPH_ERROR);

    await expect(
      harness.action("listCalendars", { connection: delegatedConnection() }),
    ).rejects.toThrow();
  });
});

describe("createCalendar", () => {
  test("posts the name and color and returns the created calendar", async () => {
    const scope = nock(GRAPH_HOST)
      .post("/v1.0/me/calendars", { name: "Volunteer", color: "auto" })
      .reply(201, createCalendarExamplePayload.data);

    const result = await harness.action("createCalendar", {
      connection: delegatedConnection(),
      name: "Volunteer",
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(createCalendarExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post("/v1.0/me/calendars").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("createCalendar", { connection: delegatedConnection(), name: "Volunteer" }),
    ).rejects.toThrow();
  });
});

describe("deleteCalendar", () => {
  test("deletes the calendar", async () => {
    const scope = nock(GRAPH_HOST).delete(`/v1.0/me/calendars/${CALENDAR_ID}`).reply(204);

    const result = await harness.action("deleteCalendar", {
      connection: delegatedConnection(),
      id: CALENDAR_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: CALENDAR_ID,
      message: "Calendar deleted successfully",
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).delete(`/v1.0/me/calendars/${CALENDAR_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("deleteCalendar", { connection: delegatedConnection(), id: CALENDAR_ID }),
    ).rejects.toThrow();
  });
});

describe("getSchedule", () => {
  const scheduleInput = {
    schedules: ["adele.vance@example.com"],
    start: "2026-12-15T09:00:00",
    end: "2026-12-15T18:00:00",
  };

  test("posts the schedules and time window and returns the availability", async () => {
    const scope = nock(GRAPH_HOST)
      .post("/v1.0/me/calendar/getSchedule", {
        availabilityViewInterval: 30,
        schedules: ["adele.vance@example.com"],
        startTime: { dateTime: "2026-12-15T09:00:00", timeZone: "UTC" },
        endTime: { dateTime: "2026-12-15T18:00:00", timeZone: "UTC" },
      })
      .reply(200, getScheduleExamplePayload.data);

    const result = await harness.action("getSchedule", {
      connection: delegatedConnection(),
      ...scheduleInput,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(getScheduleExamplePayload.data);
  });

  test("leaves the interval out when View Interval is cleared, so Graph applies its default", async () => {
    const scope = nock(GRAPH_HOST)
      .post("/v1.0/me/calendar/getSchedule", {
        schedules: ["adele.vance@example.com"],
        startTime: { dateTime: "2026-12-15T09:00:00", timeZone: "UTC" },
        endTime: { dateTime: "2026-12-15T18:00:00", timeZone: "UTC" },
      })
      .reply(200, getScheduleExamplePayload.data);

    await harness.action("getSchedule", {
      connection: delegatedConnection(),
      ...scheduleInput,
      availabilityViewInterval: "",
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post("/v1.0/me/calendar/getSchedule").reply(400, GRAPH_ERROR);

    await expect(
      harness.action("getSchedule", { connection: delegatedConnection(), ...scheduleInput }),
    ).rejects.toThrow();
  });
});

describe("getCalendarEvent", () => {
  test("returns the event", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}`)
      .reply(200, getCalendarEventExamplePayload.data);

    const result = await harness.action("getCalendarEvent", {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(getCalendarEventExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get(`/v1.0/me/events/${EVENT_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("getCalendarEvent", { connection: delegatedConnection(), eventId: EVENT_ID }),
    ).rejects.toThrow();
  });
});
