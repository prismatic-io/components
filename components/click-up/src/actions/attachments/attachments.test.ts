import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import { createTaskAttachmentExamplePayload } from "../../examplePayloads";
import { createTaskAttachment } from "./createTaskAttachment";
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
describe("createTaskAttachment", () => {
  const params = {
    taskId: "9hx",
    customTaskIds: false,
    teamId: "",
    file: { data: Buffer.from("hello world"), contentType: "text/plain" },
    fileName: "notes.txt",
  };
  test("happy path uploads the file as multipart form data and returns the response", async () => {
    const req = mockClickUp(
      "POST",
      "/task/9hx/attachment",
      200,
      createTaskAttachmentExamplePayload.data,
    );
    const { result } = await run(createTaskAttachment, params);
    expect(result).toEqual(createTaskAttachmentExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false" });
    expect(String(req.headers?.["content-type"])).toMatch(
      /^multipart\/form-data; boundary=/,
    );
    expect(String(req.body)).toContain(
      'name="attachment"; filename="notes.txt"',
    );
    expect(String(req.body)).toContain("hello world");
  });
});
