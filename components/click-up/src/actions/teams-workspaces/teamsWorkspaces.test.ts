import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import { clickUpOauth2Connection } from "../../connections/clickUpOauth2Connection";
import { getAuthorizedTeamsExamplePayload } from "../../examplePayloads";
import { getAuthorizedTeams } from "./getAuthorizedTeams";
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
describe("getAuthorizedTeams", () => {
  const oauthConnection = createConnection(
    clickUpOauth2Connection,
    {},
    { access_token: "oauth-token" },
  );
  test("happy path authenticates with the OAuth access token and returns the workspaces", async () => {
    const req = mockClickUp(
      "GET",
      "/team",
      200,
      getAuthorizedTeamsExamplePayload.data,
    );
    const { result } = await run(getAuthorizedTeams, {
      clickUpConnection: oauthConnection,
    });
    expect(result).toEqual(getAuthorizedTeamsExamplePayload);
    expect(req.headers?.authorization).toBe("Bearer oauth-token");
  });
});
