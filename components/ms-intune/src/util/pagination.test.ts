import { createClient } from "@prismatic-io/spectral/http";
import nock from "nock";
import { paginateResults } from "./pagination";

const HOST = "https://graph.microsoft.com";
const BASE_URL = `${HOST}/v1.0`;
const PATH = "/users";

const client = createClient({ baseUrl: BASE_URL });

describe("paginateResults", () => {
  afterEach(() => nock.cleanAll());

  test("collects every page's items when Fetch All is true", async () => {
    const firstPage = nock(HOST)
      .get(`/v1.0${PATH}`)
      .query({ $filter: "accountEnabled eq true" })
      .reply(200, {
        value: [{ id: "1" }],
        "@odata.nextLink": `${BASE_URL}${PATH}?$skiptoken=page2`,
      });
    const secondPage = nock(HOST)
      .get(`/v1.0${PATH}`)
      .query({ $skiptoken: "page2" })
      .reply(200, {
        "@odata.context": `${BASE_URL}/$metadata#users`,
        value: [{ id: "2" }, { id: "3" }],
      });

    const data = await paginateResults(client, PATH, true, {
      $filter: "accountEnabled eq true",
      $top: 1,
    });

    expect(firstPage.isDone()).toBe(true);
    expect(secondPage.isDone()).toBe(true);
    expect(data).toEqual({
      "@odata.context": `${BASE_URL}/$metadata#users`,
      value: [{ id: "1" }, { id: "2" }, { id: "3" }],
    });
  });

  test("returns the first page as sent when Fetch All is false", async () => {
    const page = {
      value: [{ id: "1" }],
      "@odata.nextLink": `${BASE_URL}${PATH}?$skiptoken=page2`,
    };
    const scope = nock(HOST)
      .get(`/v1.0${PATH}`)
      .query({ $top: "1" })
      .reply(200, page);

    const data = await paginateResults(client, PATH, false, { $top: 1 });

    expect(scope.isDone()).toBe(true);
    expect(data).toEqual(page);
  });
});
