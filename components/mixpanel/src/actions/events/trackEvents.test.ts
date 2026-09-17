import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { trackEvents } from "./trackEvents";
import { apiToken } from "../../connections";
import { trackEventsExamplePayload } from "../../examplePayloads";
const conn = createConnection(apiToken, {
  username: "svc-user",
  password: "svc-pass",
  projectToken: "proj-token",
});
const BASE = "https://api.mixpanel.com";
describe("trackEvents", () => {
  afterEach(() => nock.cleanAll());
  test("happy path posts events and returns response data", async () => {
    nock(BASE).post("/track").reply(200, trackEventsExamplePayload.data);
    const { result } = await invoke(trackEvents, {
      connection: conn,
      region: "api",
      useProjectToken: true,
      events: [{ event: "Signed up", properties: { time: 1 } }],
      deliveryOptions: {
        ip: undefined,
        verbose: undefined,
        redirect: undefined,
        img: undefined,
      },
    });
    expect(result.data).toEqual(trackEventsExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE).post("/track").reply(422, { error: "invalid" });
    await expect(
      invoke(trackEvents, {
        connection: conn,
        region: "api",
        useProjectToken: true,
        events: [{ event: "Signed up", properties: { time: 1 } }],
        deliveryOptions: {
          ip: undefined,
          verbose: undefined,
          redirect: undefined,
          img: undefined,
        },
      }),
    ).rejects.toThrow();
  });
});
