import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getEventAttachmentsExamplePayload,
  getEventByIdExamplePayload,
  listEventsExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getEventAttachments } from "./getEventAttachments";
import { getEventById } from "./getEventById";
import { listEvents } from "./listEvents";
const SERVICE = "/ccx/businessProcess/v1";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getEventAttachments", () => {
  const params = {
    connection: oauthTestConnection(),
    eventId: "ev-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
  };
  it("returns one page of attachments", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events/ev-1/attachments`)
      .query({ limit: 10, offset: 0 })
      .reply(200, getEventAttachmentsExamplePayload.data);
    const { result } = await invoke(getEventAttachments, params);
    expect(result).toEqual(getEventAttachmentsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events/ev-1/attachments`)
      .query(true)
      .reply(403, { error: "forbidden" });
    await expect(invoke(getEventAttachments, params)).rejects.toThrow();
  });
});
describe("getEventById", () => {
  const params = { connection: oauthTestConnection(), eventId: "ev-1" };
  it("returns the event", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events/ev-1`)
      .reply(200, getEventByIdExamplePayload.data);
    const { result } = await invoke(getEventById, params);
    expect(result).toEqual(getEventByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events/ev-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getEventById, params)).rejects.toThrow();
  });
});
describe("listEvents", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { initiator: "w-1" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events`)
      .query({ initiator: "w-1", limit: 10, offset: 20 })
      .reply(200, listEventsExamplePayload.data);
    const { result } = await invoke(listEvents, params);
    expect(result).toEqual(listEventsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/events`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listEvents, params)).rejects.toThrow();
  });
});
