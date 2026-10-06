import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  createTaskExamplePayload,
  listTasksExamplePayload,
  updateTaskExamplePayload,
} from "../../examplePayloads";
import { createTask } from "./createTask";
import { listTasks } from "./listTasks";
import { updateTask } from "./updateTask";
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
describe("createTask", () => {
  const params = {
    listId: "124",
    name: "Design Homepage",
    customTaskIds: false,
    teamId: "",
    description: "Homepage refresh",
    assignees: [183],
    tags: ["design"],
    status: "to do",
    priority: 3,
    schedule: {
      startDate: 1767225600000,
      startDateTime: false,
      dueDate: 1767312000000,
      dueDateTime: true,
    },
    parent: undefined,
    linksTo: "",
    additionalFields: {
      markdownDescription: "**Homepage**",
      notifyAll: true,
      checkRequiredCustomFields: false,
    },
    customFields: [{ key: "f-1", value: 5 }],
  };
  test("happy path maps structured objects and custom fields into the body", async () => {
    const req = mockClickUp(
      "POST",
      "/list/124/task",
      200,
      createTaskExamplePayload.data,
    );
    const { result } = await run(createTask, params);
    expect(result).toEqual(createTaskExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false" });
    expect(req.body).toEqual({
      name: "Design Homepage",
      markdown_description: "**Homepage**",
      description: "Homepage refresh",
      assignees: [183],
      tags: ["design"],
      status: "to do",
      priority: 3,
      due_date: 1767312000000,
      due_date_time: true,
      start_date: 1767225600000,
      start_date_time: false,
      notify_all: true,
      check_required_custom_fields: false,
      custom_fields: [{ id: "f-1", value: "5" }],
    });
  });
});
describe("listTasks", () => {
  const params = {
    listId: "124",
    page: 0,
    subTasks: true,
    filters: {
      orderBy: "created",
      reverse: false,
      archived: false,
      includeClosed: true,
      customFieldsCode: JSON.stringify({
        custom_fields: [{ field_id: "f-1", operator: "=", value: "1" }],
      }),
    },
    assignees: ["183"],
    tags: [],
    dateRangeFilters: {
      dueDateGt: "1767225600000",
      dateUpdatedLt: "1767312000000",
      dateDoneGt: "",
    },
  };
  test("happy path maps the structured-object filters to query params and returns the tasks", async () => {
    const req = mockClickUp(
      "GET",
      "/list/124/task",
      200,
      listTasksExamplePayload.data,
    );
    const { result } = await run(listTasks, params);
    expect(result).toEqual(listTasksExamplePayload);
    expect(req.query).toEqual({
      archived: "false",
      page: "0",
      order_by: "created",
      reverse: "false",
      subtasks: "true",
      include_closed: "true",
      due_date_gt: "1767225600000",
      date_updated_lt: "1767312000000",
      "assignees[]": "183",
      "custom_fields[0][field_id]": "f-1",
      "custom_fields[0][operator]": "=",
      "custom_fields[0][value]": "1",
    });
  });
});
describe("updateTask", () => {
  const params = {
    taskId: "9hx",
    customTaskIds: false,
    teamId: "",
    name: "Design Homepage v2",
    description: undefined,
    markdownDescription: undefined,
    status: "in progress",
    priority: 2,
    schedule: { dueDate: 1767312000000, timeEstimate: 3600000 },
    parent: undefined,
    addAssignees: [183],
    removeAssignees: undefined,
    archived: false,
  };
  test("happy path builds the add/rem assignee object and returns the response", async () => {
    const req = mockClickUp(
      "PUT",
      "/task/9hx",
      200,
      updateTaskExamplePayload.data,
    );
    const { result } = await run(updateTask, params);
    expect(result).toEqual(updateTaskExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false" });
    expect(req.body).toEqual({
      name: "Design Homepage v2",
      status: "in progress",
      priority: 2,
      due_date: 1767312000000,
      time_estimate: 3600000,
      assignees: { add: [183], rem: [] },
      archived: false,
    });
  });
});
