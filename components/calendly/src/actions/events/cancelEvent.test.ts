import { afterEach, describe, expect, test } from "vitest";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { cancelEvent } from "./cancelEvent";
import { calendlyOauth2Connection } from "../../connections";
import { cancelEventExamplePayload } from "../../examplePayloads";
import { LIVE_API_URL } from "../../constants";
const BASE = LIVE_API_URL;
const conn = createConnection(calendlyOauth2Connection, {
  useLiveServer: true,
  token: { access_token: "test-token" },
});
describe("cancelEvent", () => {
  afterEach(() => nock.cleanAll());
  test("happy path cancels event and returns cancellation data", async () => {
    nock(BASE)
      .post("/scheduled_events/EVT1/cancellation")
      .reply(200, cancelEventExamplePayload.data);
    const { result } = await invoke(cancelEvent, {
      connection: conn,
      organization: "",
      uuid: "EVT1",
      reason: "Scheduling conflict",
    });
    expect(result.data).toEqual(cancelEventExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/scheduled_events/INVALID/cancellation")
      .reply(404, { title: "Resource Not Found", message: "not found" });
    await expect(
      invoke(cancelEvent, {
        connection: conn,
        organization: "",
        uuid: "INVALID",
        reason: "",
      }),
    ).rejects.toThrow();
  });
});
