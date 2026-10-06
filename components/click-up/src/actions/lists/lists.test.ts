import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import { createListExamplePayload } from "../../examplePayloads";
import { createList } from "./createList";
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
describe("createList", () => {
  const params = {
    folderId: "457",
    name: "Sprint 12",
    content: "",
    dueDate: 1767225600000,
    dueDateTime: false,
    priority: 2,
    assigneeInt: undefined,
    status: "red",
  };
  test("happy path posts only the populated fields and returns the response", async () => {
    const req = mockClickUp(
      "POST",
      "/folder/457/list",
      200,
      createListExamplePayload.data,
    );
    const { result } = await run(createList, params);
    expect(result).toEqual(createListExamplePayload);
    expect(req.body).toEqual({
      name: "Sprint 12",
      due_date: 1767225600000,
      due_date_time: false,
      priority: 2,
      status: "red",
    });
  });
});
