import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("rawRequest", () => {
  test("forwards the request to the v1.0 Graph host with the bearer token and returns the response", async () => {
    const scope = nock(GRAPH_HOST, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "x-custom": "custom-value",
      },
    })
      .get("/v1.0/me/calendars")
      .reply(200, rawRequestExamplePayload.data);

    const result = await harness.action("rawRequest", {
      connection: delegatedConnection(),
      url: "/me/calendars",
      method: "GET",
      headers: [{ key: "X-Custom", value: "custom-value" }],
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(rawRequestExamplePayload.data);
  });
});
