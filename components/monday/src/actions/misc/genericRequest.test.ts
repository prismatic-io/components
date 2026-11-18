import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterEach, expect, test } from "vitest";
import { apiKey } from "../../connections";
import { CURRENT_API_VERSION } from "../../constants";
import { genericRequest } from "./genericRequest";

const BASE = "https://api.monday.com";
const connection = createConnection(apiKey, { apiKey: "test-key" });

afterEach(() => nock.cleanAll());

test("forwards the merged variables and headers, and returns data untouched", async () => {
  const query = "query ($id: ID!, $limit: Int) { boards(ids: [$id]) { id } }";
  let body: unknown;
  let headers: Record<string, string | string[] | undefined> = {};
  const response = { boards: [{ id: "1" }] };
  nock(BASE)
    .post("/v2", (b) => {
      body = b;
      return true;
    })
    .reply(function () {
      headers = this.req.headers;
      return [200, { data: response }];
    });

  const { result } = await invoke(genericRequest, {
    connection,
    query,
    variables: { id: "1", limit: 5 },
    variablesObject: { limit: 10, extra: true },
    apiVersion: "2020-01",
  });

  expect(result).toEqual({ data: response });
  expect(body).toEqual({
    query,
    variables: { id: "1", limit: 10, extra: true },
  });
  expect(headers.authorization).toBe("Bearer test-key");
  expect(headers["api-version"]).toBe(CURRENT_API_VERSION);
});
