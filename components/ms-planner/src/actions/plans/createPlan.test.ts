import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { createPlanExamplePayload } from "../../examplePayloads";
import { createPlan } from "./createPlan";
const BASE = "https://graph.microsoft.com";
const GROUP_ID = "ebf3b108-5234-4e22-b93d-656d7dae5874";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = { connection, groupId: GROUP_ID, title: "Q3 Marketing Launch" };
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("names the container by id and type rather than by a service-root URL", async () => {
  let postedBody: unknown;
  nock(BASE)
    .post("/v1.0/planner/plans")
    .reply((_uri, body) => {
      postedBody = body;
      return [201, createPlanExamplePayload.data];
    });
  const { result } = await invoke(createPlan, params);
  expect(postedBody).toEqual({
    container: { containerId: GROUP_ID, type: "group" },
    title: "Q3 Marketing Launch",
  });
  expect(result.data).toEqual(createPlanExamplePayload.data);
});
test("surfaces a rejected create", async () => {
  const errorScope = nock(BASE)
    .post("/v1.0/planner/plans")
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(createPlan, params)).rejects.toThrow(/status code 403/);
  expect(errorScope.isDone()).toBe(true);
});
