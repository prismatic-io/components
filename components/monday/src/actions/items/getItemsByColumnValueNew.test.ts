import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { apiKey } from "../../connections";
import { getItemsByColumnValueNewExamplePayload } from "../../examplePayloads";
import { getItemsByColumnValueNew } from "./getItemsByColumnValueNew";

const BASE = "https://api.monday.com";
const connection = createConnection(apiKey, { apiKey: "test-key" });
const params = {
  connection,
  boardId: 2924980809,
  columnId: "status",
  columnValue: "Done",
  getAllItems: false,
};
const items =
  getItemsByColumnValueNewExamplePayload.data.items_by_column_values;

afterEach(() => nock.cleanAll());

describe("getItemsByColumnValueNew", () => {
  test("happy path flattens the items page into items_by_column_values", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, {
        data: { items_page_by_column_values: { cursor: null, items } },
      });
    const { result } = await invoke(getItemsByColumnValueNew, params);
    expect(result).toEqual(getItemsByColumnValueNewExamplePayload);
  });

  test("getAllItems false does not follow a returned cursor", async () => {
    const scope = nock(BASE)
      .post("/v2")
      .reply(200, {
        data: { items_page_by_column_values: { cursor: "next", items } },
      });
    const { result } = await invoke(getItemsByColumnValueNew, params);
    expect(result).toEqual(getItemsByColumnValueNewExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path rejects", async () => {
    nock(BASE)
      .post("/v2")
      .reply(500, { errors: [{ message: "Internal error" }] });
    await expect(invoke(getItemsByColumnValueNew, params)).rejects.toThrow();
  });
});
