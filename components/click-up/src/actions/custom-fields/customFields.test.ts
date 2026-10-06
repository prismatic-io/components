import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  removeCustomFieldValueExamplePayload,
  setCustomFieldValueExamplePayload,
} from "../../examplePayloads";
import { removeCustomFieldValue } from "./removeCustomFieldValue";
import { setCustomFieldValue } from "./setCustomFieldValue";
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
describe("removeCustomFieldValue", () => {
  const params = {
    taskId: "9hx",
    fieldId: "f-1",
    customTaskIds: false,
    teamId: "",
  };
  test("happy path deletes the value and omits an empty team_id", async () => {
    const req = mockClickUp(
      "DELETE",
      "/task/9hx/field/f-1",
      200,
      removeCustomFieldValueExamplePayload.data,
    );
    const { result } = await run(removeCustomFieldValue, params);
    expect(result).toEqual(removeCustomFieldValueExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false" });
  });
});
describe("setCustomFieldValue", () => {
  const params = {
    taskId: "9hx",
    fieldId: "f-1",
    fieldValue: "2026-01-01T00:00:00.000Z",
    valueType: "date",
  };
  test("happy path converts a date value to Unix milliseconds and returns the response", async () => {
    const req = mockClickUp(
      "POST",
      "/task/9hx/field/f-1",
      200,
      setCustomFieldValueExamplePayload.data,
    );
    const { result } = await run(setCustomFieldValue, params);
    expect(result).toEqual(setCustomFieldValueExamplePayload);
    expect(req.body).toEqual({ value: 1767225600000 });
  });
});
