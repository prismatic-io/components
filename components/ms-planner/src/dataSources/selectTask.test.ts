import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../connections";
import { PLANNER_ENDPOINTS } from "../constants";
import { listTasksInPlanExamplePayload } from "../examplePayloads";
import { selectTask } from "./selectTask";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASKS_URL = `/v1.0${PLANNER_ENDPOINTS.PLAN_TASKS(PLAN_ID)}`;
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const tasks = listTasksInPlanExamplePayload.data;
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("lists a plan's tasks as picklist entries", async () => {
  nock(BASE).get(TASKS_URL).reply(200, tasks);
  const { result } = await invokeDataSource(selectTask, {
    connection,
    planId: PLAN_ID,
  });
  expect(result).toEqual([
    { label: "Update the client list", key: tasks.value[0].id },
  ]);
});
test("returns an empty picklist when the plan has no tasks", async () => {
  nock(BASE).get(TASKS_URL).reply(200, { value: [] });
  const { result } = await invokeDataSource(selectTask, {
    connection,
    planId: PLAN_ID,
  });
  expect(result).toEqual([]);
});
