import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../connections/clickUpApiKeyConnection";
import {
  calendarsExamplePayload,
  getAccessibleCustomFieldsExamplePayload,
  getSpaceViewsResponseFixture,
  listTasksExamplePayload,
} from "../examplePayloads";
import { calendars } from "./calendars";
import { customFieldOptions } from "./customFieldOptions";
import { tasks } from "./tasks";
const API = "https://api.clickup.com/api/v2";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
const toElements = (
  items: {
    id: string;
    name: string;
  }[],
) => items.map(({ id, name }) => ({ label: name, key: id }));
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  const consumed = nock.isDone();
  nock.cleanAll();
  expect(consumed).toBe(true);
});
describe("customFieldOptions", () => {
  test("throws when no field has the given name", async () => {
    nock(API)
      .get("/list/124/field")
      .reply(200, getAccessibleCustomFieldsExamplePayload.data);
    await expect(
      invokeDataSource(customFieldOptions, {
        connection,
        listId: "124",
        fieldName: "Missing Field",
      }),
    ).rejects.toThrow("Unable to find custom field options");
  });
});
describe("tasks", () => {
  test("requests open, unarchived top-level tasks and maps them to {label, key} elements", async () => {
    nock(API)
      .get("/list/124/task")
      .query({ archived: "false", include_closed: "false", subtasks: "false" })
      .reply(200, listTasksExamplePayload.data);
    const { result } = await invokeDataSource(tasks, {
      connection,
      listId: "124",
    });
    expect(result).toEqual(toElements(listTasksExamplePayload.data.tasks));
  });
});
describe("calendars", () => {
  test("keeps only calendar views and maps them to {label, key} elements", async () => {
    nock(API)
      .get("/space/790/view")
      .query({ include_closed: "false" })
      .reply(200, getSpaceViewsResponseFixture);
    const { result } = await invokeDataSource(calendars, {
      connection,
      spaceId: "790",
    });
    expect(result).toEqual(calendarsExamplePayload.result);
  });
});
