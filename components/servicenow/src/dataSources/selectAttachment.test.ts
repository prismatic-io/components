import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { basic } from "../connections";
import { selectAttachment } from "./selectAttachment";
const conn = createConnection(basic, {
  username: "test-user",
  password: "test-pass",
});
const BASE = "https://instance.service-now.com";
describe("selectAttachment", () => {
  afterEach(() => nock.cleanAll());
  test("mocked list response returns {label, key}[] Element shape", async () => {
    const stub = [
      { table_name: "incident", file_name: "screenshot.png", sys_id: "att_1" },
      { table_name: "problem", file_name: "log.txt", sys_id: "att_2" },
    ];
    nock(BASE)
      .get("/api/now/v2/attachment")
      .query(true)
      .reply(200, { result: stub });
    const { result } = await invokeDataSource(selectAttachment, {
      connection: conn,
      instanceUrlInput: BASE,
      apiVersionInput: "v2",
      sysparmQuery: undefined,
    });
    expect(Array.isArray(result)).toBe(true);
    const items = result as {
      label: string;
      key: string;
    }[];
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      label: "incident - screenshot.png",
      key: "att_1",
    });
    expect(items[1]).toEqual({ label: "problem - log.txt", key: "att_2" });
  });
  test("empty result returns empty array", async () => {
    nock(BASE)
      .get("/api/now/v2/attachment")
      .query(true)
      .reply(200, { result: [] });
    const { result } = await invokeDataSource(selectAttachment, {
      connection: conn,
      instanceUrlInput: BASE,
      apiVersionInput: "v2",
      sysparmQuery: undefined,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});
