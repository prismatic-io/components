import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  editUserOnWorkspaceExamplePayload,
  getUserExamplePayload,
} from "../../examplePayloads";
import { editUserOnWorkspace } from "./editUserOnWorkspace";
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
describe("editUserOnWorkspace", () => {
  const params = {
    teamId: "9012345",
    userId: 183,
    admin: true,
    customRoleId: 12,
  };
  test("happy path keeps the current username when none is given", async () => {
    mockClickUp(
      "GET",
      "/team/9012345/user/183",
      200,
      getUserExamplePayload.data,
    );
    const req = mockClickUp(
      "PUT",
      "/team/9012345/user/183",
      200,
      editUserOnWorkspaceExamplePayload.data,
    );
    const { result } = await run(editUserOnWorkspace, params);
    expect(result).toEqual(editUserOnWorkspaceExamplePayload);
    expect(req.body).toEqual({
      username: getUserExamplePayload.data.member.user.username,
      admin: true,
      custom_role_id: 12,
    });
  });
  test("sends the given username without reading the current one", async () => {
    const req = mockClickUp(
      "PUT",
      "/team/9012345/user/183",
      200,
      editUserOnWorkspaceExamplePayload.data,
    );
    await run(editUserOnWorkspace, { ...params, username: "Jane Doe" });
    expect(req.body).toEqual({
      username: "Jane Doe",
      admin: true,
      custom_role_id: 12,
    });
  });
});
