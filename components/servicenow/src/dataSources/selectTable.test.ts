import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { basic } from "../connections";
import { selectTable } from "./selectTable";
const conn = createConnection(basic, {
  username: "test-user",
  password: "test-pass",
});
const BASE = "https://instance.service-now.com";
describe("selectTable", () => {
  afterEach(() => nock.cleanAll());
  test("mocked list response returns {label, key}[] Element shape", async () => {
    const stub = [
      { sys_id: "tbl_1", label: "Incident" },
      { sys_id: "tbl_2", label: "Problem" },
    ];
    nock(BASE)
      .get("/api/now/v2/table/sys_db_object")
      .query(true)
      .reply(200, { result: stub });
    const { result } = await invokeDataSource(selectTable, {
      connection: conn,
      instanceUrlInput: BASE,
      sysparmQuery: undefined,
    });
    expect(Array.isArray(result)).toBe(true);
    const items = result as {
      label: string;
      key: string;
    }[];
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({ label: "Incident", key: "tbl_1" });
    expect(items[1]).toEqual({ label: "Problem", key: "tbl_2" });
  });
  test("empty result returns empty array", async () => {
    nock(BASE)
      .get("/api/now/v2/table/sys_db_object")
      .query(true)
      .reply(200, { result: [] });
    const { result } = await invokeDataSource(selectTable, {
      connection: conn,
      instanceUrlInput: BASE,
      sysparmQuery: undefined,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});
