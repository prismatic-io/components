import { afterEach, describe, expect, test } from "vitest";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listEvents } from "./listEvents";
import { calendlyOauth2Connection } from "../../connections";
import { listEventsExamplePayload } from "../../examplePayloads";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("listEvents", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns paginated events", async () => {
    nock(BASE)
      .get("/scheduled_events")
      .query(true)
      .reply(200, {
        collection: listEventsExamplePayload.data,
        pagination: { next_page_token: null },
      });
    const { result } = await invoke(listEvents, {
      connection: conn,
      inviteeEmail: undefined,
      maxStartTime: undefined,
      minStartTime: undefined,
      organization: "https://api.calendly.com/organizations/ORG1",
      sort: undefined,
      status: undefined,
      user: undefined,
    });
    expect(result.data).toEqual(listEventsExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/scheduled_events")
      .query(true)
      .reply(400, { title: "Bad Request", message: "invalid params" });
    await expect(
      invoke(listEvents, {
        connection: conn,
        inviteeEmail: undefined,
        maxStartTime: undefined,
        minStartTime: undefined,
        organization: "https://api.calendly.com/organizations/ORG1",
        sort: undefined,
        status: undefined,
        user: undefined,
      }),
    ).rejects.toThrow();
  });
});
