import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import { rawRequestExamplePayload } from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const { rawRequest } = actions;
afterEach(() => nock.cleanAll());
describe("rawRequest", () => {
  test("forwards the GET to the given path and returns the response untouched", async () => {
    const scope = nock(BASE, {
      reqheaders: { authorization: "Bearer test-token" },
    })
      .get("/octocat")
      .reply(200, rawRequestExamplePayload.data);
    const { result } = await invoke(rawRequest, {
      connection: conn,
      method: "GET",
      url: "/octocat",
      headers: [],
      queryParams: [],
      responseType: "json",
    } as never);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(rawRequestExamplePayload.data);
  });
});
