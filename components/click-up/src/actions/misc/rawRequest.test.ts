import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";
const API = "https://api.clickup.com";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
interface Captured {
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}
const mockClickUp = (
  method: string,
  path: string,
  status: number,
  reply: unknown,
): Captured => {
  const captured: Captured = {};
  nock(API)
    .intercept(`/api/v2${path}`, method, (body) => {
      captured.body = body;
      return true;
    })
    .query((query) => {
      captured.query = query;
      return true;
    })
    .reply(status, function () {
      captured.headers = this.req.headers;
      return reply as nock.Body;
    });
  return captured;
};
type ActionUnderTest = {
  inputs: Record<
    string,
    {
      type?: string;
    }
  >;
  perform: unknown;
};
const run = (action: ActionUnderTest, params: Record<string, unknown>) => {
  const connectionKey = Object.keys(action.inputs).find(
    (key) => action.inputs[key].type === "connection",
  ) as string;
  return invoke(
    action as any,
    { [connectionKey]: connection, ...params } as any,
  );
};
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  const consumed = nock.isDone();
  nock.cleanAll();
  expect(consumed).toBe(true);
});
describe("rawRequest", () => {
  test("forwards method, path, query, headers, and the API key bearer token; returns the response untouched", async () => {
    const req = mockClickUp(
      "GET",
      "/space/790/tag",
      200,
      rawRequestExamplePayload.data,
    );
    const { result } = await run(rawRequest, {
      url: "/space/790/tag",
      method: "GET",
      queryParams: [{ key: "archived", value: "false" }],
      headers: [{ key: "X-Trace-Id", value: "trace-1" }],
      responseType: "json",
      maxRetries: 0,
    });
    expect(result).toEqual(rawRequestExamplePayload);
    expect(req.query).toEqual({ archived: "false" });
    expect(req.headers?.authorization).toBe("Bearer test-key");
    expect(req.headers?.["x-trace-id"]).toBe("trace-1");
  });
});
