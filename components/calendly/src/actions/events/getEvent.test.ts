import { afterEach, describe, expect, test } from "vitest";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getEvent } from "./getEvent";
import { calendlyOauth2Connection } from "../../connections";
import { getEventExamplePayload } from "../../examplePayloads";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("getEvent", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns event resource", async () => {
    nock(BASE)
      .get("/scheduled_events/GBGBDCAADAEDCRZ2")
      .reply(200, getEventExamplePayload.data);
    const { result } = await invoke(getEvent, {
      connection: conn,
      organization: "",
      uuid: "GBGBDCAADAEDCRZ2",
    });
    expect(result.data).toEqual(getEventExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/scheduled_events/INVALID")
      .reply(404, { title: "Resource Not Found", message: "not found" });
    await expect(
      invoke(getEvent, { connection: conn, organization: "", uuid: "INVALID" }),
    ).rejects.toThrow();
  });
});
