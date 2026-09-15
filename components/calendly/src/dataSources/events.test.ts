import { afterEach, describe, expect, test } from "vitest";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { events } from "./events";
import { calendlyOauth2Connection } from "../connections";
import { listEventsExamplePayload } from "../examplePayloads";
import { LIVE_API_URL } from "../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("events datasource", () => {
  afterEach(() => nock.cleanAll());
  test("returns key/label pairs from event list", async () => {
    nock(BASE)
      .get("/scheduled_events")
      .query(true)
      .reply(200, {
        collection: listEventsExamplePayload.data,
        pagination: { next_page_token: null },
      });
    const { result } = await invokeDataSource(events, {
      connection: conn,
      inviteeEmail: undefined,
      maxStartTime: undefined,
      minStartTime: undefined,
      organization: "https://api.calendly.com/organizations/ORG1",
      returnUuidOnly: false,
      sort: undefined,
      status: undefined,
      user: undefined,
    });
    expect(Array.isArray(result)).toBe(true);
    (
      result as {
        key: string;
        label: string;
      }[]
    ).forEach((item) => {
      expect(item).toHaveProperty("key");
      expect(item).toHaveProperty("label");
    });
  });
  test("returns empty array when no events exist", async () => {
    nock(BASE)
      .get("/scheduled_events")
      .query(true)
      .reply(200, {
        collection: [],
        pagination: { next_page_token: null },
      });
    const { result } = await invokeDataSource(events, {
      connection: conn,
      inviteeEmail: undefined,
      maxStartTime: undefined,
      minStartTime: undefined,
      organization: "https://api.calendly.com/organizations/ORG1",
      returnUuidOnly: false,
      sort: undefined,
      status: undefined,
      user: undefined,
    });
    expect(result).toEqual([]);
  });
});
