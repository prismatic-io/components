import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { createFreshserviceClient } from "../client";
import { getItamListData, itamPath, normalizeItamWrite } from "./itam";
beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});
const DOMAIN = "example";
const HOST = `https://${DOMAIN}.freshservice.com`;
const BASE = "/api/v2";
const connection = {
  key: "freshservice-api-key-connection",
  configVarKey: "",
  fields: { freshserviceDomain: DOMAIN, apiKey: "unit-test-key" },
};
const client = () => createFreshserviceClient(connection, { debug: false });
const device = (id: number) => ({ device_id: id, name: `device-${id}` });
afterEach(() => {
  nock.cleanAll();
});
describe("itamPath", () => {
  test("a list read has no trailing slash", () => {
    expect(itamPath("devices")).toBe("/itam/devices");
    expect(itamPath("devices", { op: "list" })).toBe("/itam/devices");
  });
  test("a single-record read has no trailing slash", () => {
    expect(itamPath("devices", { op: "read", id: 5 })).toBe("/itam/devices/5");
  });
  test("a create POST omits the slash for devices", () => {
    expect(itamPath("devices", { op: "create" })).toBe("/itam/devices");
  });
  test("a create POST carries the slash for assets", () => {
    expect(itamPath("assets", { op: "create" })).toBe("/itam/assets/");
  });
  test("an id-addressed update carries the trailing slash", () => {
    expect(itamPath("devices", { op: "update", id: 8 })).toBe(
      "/itam/devices/8/",
    );
  });
  test("a delete carries the trailing slash", () => {
    expect(itamPath("devices", { op: "delete", id: 4 })).toBe(
      "/itam/devices/4/",
    );
  });
  test("a name-matched update targets the collection with a slash", () => {
    expect(itamPath("assets", { op: "updateByName" })).toBe("/itam/assets/");
  });
  test("a create for an unrecorded resource throws instead of guessing", () => {
    expect(() => itamPath("widgets", { op: "create" })).toThrow(
      /trailing-slash/,
    );
  });
  test("an id-addressed operation refuses a missing or zero id", () => {
    expect(() => itamPath("devices", { op: "read" })).toThrow(/record id/);
    expect(() => itamPath("devices", { op: "update", id: 0 })).toThrow(
      /record id/,
    );
  });
});
describe("getItamListData", () => {
  test("a single page returns the envelope and the meta object", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query(true)
      .reply(200, {
        meta: { page: 1, per_page: 100, total_count: 2 },
        devices: [device(1), device(2)],
      });
    const { data, meta } = await getItamListData<
      ReturnType<typeof device>,
      "devices"
    >(client(), "devices", "devices", { fetchAll: false, params: {} });
    expect(data.devices).toHaveLength(2);
    expect(meta.total_count).toBe(2);
    expect(nock.isDone()).toBe(true);
  });
  test("fetchAll walks every page implied by total_count", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query((q) => q.page === "1")
      .reply(200, {
        meta: { page: 1, per_page: 100, total_count: 250 },
        devices: [device(1)],
      })
      .get(`${BASE}/itam/devices`)
      .query((q) => q.page === "2")
      .reply(200, {
        meta: { page: 2, per_page: 100, total_count: 250 },
        devices: [device(2)],
      })
      .get(`${BASE}/itam/devices`)
      .query((q) => q.page === "3")
      .reply(200, {
        meta: { page: 3, per_page: 100, total_count: 250 },
        devices: [device(3)],
      });
    const { data } = await getItamListData<
      ReturnType<typeof device>,
      "devices"
    >(client(), "devices", "devices", { fetchAll: true, params: {} });
    expect(data.devices.map((d) => d.device_id)).toEqual([1, 2, 3]);
    expect(nock.isDone()).toBe(true);
  });
  test("an exact page-size multiple requests no extra page", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query((q) => q.page === "1")
      .reply(200, {
        meta: { page: 1, per_page: 100, total_count: 200 },
        devices: [device(1)],
      })
      .get(`${BASE}/itam/devices`)
      .query((q) => q.page === "2")
      .reply(200, {
        meta: { page: 2, per_page: 100, total_count: 200 },
        devices: [device(2)],
      });
    const { data } = await getItamListData<
      ReturnType<typeof device>,
      "devices"
    >(client(), "devices", "devices", { fetchAll: true, params: {} });
    expect(data.devices).toHaveLength(2);
    expect(nock.isDone()).toBe(true);
  });
  test("a missing envelope key throws instead of returning an empty list", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query(true)
      .reply(200, { meta: { page: 1, per_page: 100, total_count: 2 } });
    await expect(
      getItamListData(client(), "devices", "devices", {
        fetchAll: false,
        params: {},
      }),
    ).rejects.toThrow(/devices/);
  });
  test("a missing meta object throws rather than silently truncating", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query(true)
      .reply(200, { devices: [device(1)] });
    await expect(
      getItamListData(client(), "devices", "devices", {
        fetchAll: true,
        params: {},
      }),
    ).rejects.toThrow(/meta/);
  });
  test("the caller's params object is copied, never mutated", async () => {
    nock(HOST)
      .get(`${BASE}/itam/devices`)
      .query(true)
      .reply(200, {
        meta: { page: 1, per_page: 100, total_count: 1 },
        devices: [device(1)],
      });
    const params = { include_cols: "name" };
    await getItamListData(client(), "devices", "devices", {
      fetchAll: true,
      params,
    });
    expect(params).toEqual({ include_cols: "name" });
  });
});
describe("normalizeItamWrite", () => {
  test("maps the five documented positions of the flat msg tuple", () => {
    const result = normalizeItamWrite({
      msg: ["device added or updated", 46, "db-080-westport", true, true],
      code: 0,
    });
    expect(result).toEqual({
      action: "device added or updated",
      id: 46,
      name: "db-080-westport",
      didSomethingChange: true,
      isNew: true,
      code: 0,
      raw: ["device added or updated", 46, "db-080-westport", true, true],
    });
  });
  test("an unchanged update reports isNew false", () => {
    const result = normalizeItamWrite({
      msg: ["device added or updated", 46, "db-080-westport", false, false],
      code: 0,
    });
    expect(result.isNew).toBe(false);
    expect(result.didSomethingChange).toBe(false);
  });
  test("a missing msg envelope throws", () => {
    expect(() => normalizeItamWrite({})).toThrow(/msg/);
  });
  test("unwraps the nested msg tuple the Assets family sends", () => {
    const result = normalizeItamWrite({
      msg: [["asset added/edited.", 54, "test_api", true, true]],
      code: 0,
    });
    expect(result).toEqual({
      action: "asset added/edited.",
      id: 54,
      name: "test_api",
      didSomethingChange: true,
      isNew: true,
      code: 0,
      raw: ["asset added/edited.", 54, "test_api", true, true],
    });
  });
  test("a tuple whose action slot is not a string throws", () => {
    expect(() => normalizeItamWrite({ msg: [46, "name"] })).toThrow(/msg/);
  });
  test("an object msg throws", () => {
    expect(() =>
      normalizeItamWrite({
        msg: { action: "created" } as unknown as unknown[],
      }),
    ).toThrow(/msg/);
  });
});
