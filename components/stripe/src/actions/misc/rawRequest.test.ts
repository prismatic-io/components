import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import { rawRequestExamplePayload } from "../../examplePayloads/misc";
import { rawRequest } from "./rawRequest";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
afterEach(() => nock.cleanAll());
describe("rawRequest", () => {
  it("forwards the method, path and bearer token and returns the response untouched", async () => {
    const scope = nock(BASE, {
      reqheaders: { authorization: "Bearer sk_test_123" },
    })
      .get("/v1/products")
      .reply(200, rawRequestExamplePayload.data);
    const { result } = await invoke(
      rawRequest,
      params({ connection: conn, method: "GET", url: "/products" }),
    );
    expect(result.data).toEqual(rawRequestExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
});
