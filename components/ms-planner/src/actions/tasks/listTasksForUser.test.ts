import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { listTasksForUserExamplePayload } from "../../examplePayloads";
import { listTasksForUser } from "./listTasksForUser";
const BASE = "https://graph.microsoft.com";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = { connection };
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("returns every task the paged walk collected", async () => {
  nock(BASE)
    .get("/v1.0/me/planner/tasks")
    .reply(200, listTasksForUserExamplePayload.data);
  const { result } = await invoke(listTasksForUser, params);
  expect(result.data).toEqual({
    ...listTasksForUserExamplePayload.data,
    truncated: false,
  });
});
test("surfaces a failed list request", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/me/planner/tasks")
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(listTasksForUser, params)).rejects.toThrow(
    /status code 403/,
  );
  expect(errorScope.isDone()).toBe(true);
});
