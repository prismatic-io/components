import type { Connection } from "@prismatic-io/spectral";
import { invoke, invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { selectSuiteQl } from "../../dataSources/selectSuiteQl";
import { suiteQLQueryCustomersExamplePayload } from "../../examplePayloads";
import { suiteQlParametersClean } from "../../utils";
import { suiteQLQuery } from "./suiteQLQuery";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const QUERY = "SELECT id, email FROM customer WHERE id BETWEEN ? AND ?";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

const suiteQlReply = suiteQLQueryCustomersExamplePayload.data.data;

describe("suiteQlParametersClean", () => {
  test.each([
    [undefined, []],
    ["", []],
    ["  ", []],
    ['["-7", "0"]', ["-7", "0"]],
    [["107"], ["107"]],
  ])("cleans %j to %j", (value, expected) => {
    expect(suiteQlParametersClean(value)).toEqual(expected);
  });

  test("rejects a value that is not a JSON array", () => {
    expect(() => suiteQlParametersClean('{"id": "107"}')).toThrow(
      'Query Parameters must be a JSON array of values, such as ["-7", "0"].',
    );
  });
});

describe("SuiteQL bound parameters", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("SuiteQL Query sends the parameters with the query", async () => {
    nock(ORIGIN)
      .post("/services/rest/query/v1/suiteql", {
        q: QUERY,
        params: ["-7", "0"],
      })
      .query({ limit: "10", offset: "0" })
      .reply(200, suiteQlReply);

    await invoke(suiteQLQuery, {
      connection,
      suiteQLInput: QUERY,
      parameters: ["-7", "0"],
      pagination: { limitInput: 10, offsetInput: 0 },
    });

    expect(nock.isDone()).toBe(true);
  });

  test("SuiteQL Query rejects when NetSuite responds with an error", async () => {
    nock(ORIGIN)
      .post("/services/rest/query/v1/suiteql")
      .query(true)
      .reply(400, { title: "Bad Request", status: 400 });

    await expect(
      invoke(suiteQLQuery, {
        connection,
        suiteQLInput: QUERY,
        parameters: [],
        pagination: { limitInput: 10, offsetInput: 0 },
      }),
    ).rejects.toThrow();
  });

  test("SuiteQL Query sends only the query when no parameters are set", async () => {
    nock(ORIGIN)
      .post(
        "/services/rest/query/v1/suiteql",
        (body) => JSON.stringify(body) === JSON.stringify({ q: QUERY }),
      )
      .query({ limit: "10", offset: "0" })
      .reply(200, suiteQlReply);

    await invoke(suiteQLQuery, {
      connection,
      suiteQLInput: QUERY,
      parameters: [],
      pagination: { limitInput: 10, offsetInput: 0 },
    });

    expect(nock.isDone()).toBe(true);
  });

  test("Select SuiteQL sends the parameters with the query", async () => {
    nock(ORIGIN)
      .post("/services/rest/query/v1/suiteql", {
        q: QUERY,
        params: ["-7", "0"],
      })
      .query({ limit: "10", offset: "0" })
      .reply(200, suiteQlReply);

    await invokeDataSource(selectSuiteQl, {
      connection,
      query: QUERY,
      parameters: ["-7", "0"],
      key: "id",
      label: "email",
      pagination: { limit: 10, offset: 0 },
    });

    expect(nock.isDone()).toBe(true);
  });

  test("Select SuiteQL maps the chosen key and label columns of each row", async () => {
    nock(ORIGIN)
      .post("/services/rest/query/v1/suiteql")
      .query({ limit: "10", offset: "0" })
      .reply(200, suiteQlReply);

    const { result } = await invokeDataSource(selectSuiteQl, {
      connection,
      query: QUERY,
      parameters: [],
      key: "id",
      label: "email",
      pagination: { limit: 10, offset: 0 },
    });

    expect(result).toEqual([
      { key: "12345", label: "contact@acmecorp.example.com" },
      { key: "12346", label: "contact@globalindustries.example.com" },
    ]);
  });

  test("Select SuiteQL returns an empty list when the query has no rows", async () => {
    nock(ORIGIN)
      .post("/services/rest/query/v1/suiteql")
      .query(true)
      .reply(200, { count: 0, offset: 0, hasMore: false, items: [] });

    const { result } = await invokeDataSource(selectSuiteQl, {
      connection,
      query: QUERY,
      parameters: [],
      key: "id",
      label: "email",
      pagination: { limit: 10, offset: 0 },
    });

    expect(result).toEqual([]);
  });
});
