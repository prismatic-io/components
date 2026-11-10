import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { updateCalendarExamplePayload } from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const CALENDAR_ID = "AAMkADJmMVAAA=";
const CALENDAR_PATH = `/v1.0/me/calendars/${CALENDAR_ID}`;

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("updateCalendar", () => {
  test("sends no name when only the color is updated", async () => {
    const scope = nock(GRAPH_HOST)
      .patch(CALENDAR_PATH, { color: "lightRed" })
      .reply(200, updateCalendarExamplePayload.data);

    const result = await harness.action("updateCalendar", {
      connection: delegatedConnection(),
      id: CALENDAR_ID,
      color: "lightRed",
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(updateCalendarExamplePayload.data);
  });

  test("sends the name and the color when both are set", async () => {
    const scope = nock(GRAPH_HOST)
      .patch(CALENDAR_PATH, { name: "Project Calendar", color: "lightRed" })
      .reply(200, updateCalendarExamplePayload.data);

    await harness.action("updateCalendar", {
      connection: delegatedConnection(),
      id: CALENDAR_ID,
      name: "Project Calendar",
      color: "lightRed",
    });

    expect(scope.isDone()).toBe(true);
  });
});
