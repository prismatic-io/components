import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import { updateTeamExamplePayload } from "../../examplePayloads";
import { updateTeam } from "./updateTeam";
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
describe("updateTeam", () => {
  const params = {
    groupId: "7c3f0b0a",
    teamName: "Design",
    teamHandle: "",
    addMember: [185],
    removeMember: undefined,
  };
  test("happy path sends only the populated fields and member changes", async () => {
    const req = mockClickUp(
      "PUT",
      "/group/7c3f0b0a",
      200,
      updateTeamExamplePayload.data,
    );
    const { result } = await run(updateTeam, params);
    expect(result).toEqual(updateTeamExamplePayload);
    expect(req.body).toEqual({ name: "Design", members: { add: [185] } });
  });
});
