import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { updatePlanExamplePayload } from "../../examplePayloads";
import { updatePlan } from "./updatePlan";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const PLAN_URL = `/v1.0/planner/plans/${PLAN_ID}`;
const ETAG = 'W/"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  title: "Q3 Marketing Launch (Revised)",
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("reads the current etag, then renames the plan with If-Match", async () => {
  let patchedBody: unknown;
  nock(BASE).get(PLAN_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(PLAN_URL)
    .matchHeader("If-Match", ETAG)
    .matchHeader("Prefer", "return=representation")
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updatePlanExamplePayload.data];
    });

  const { result } = await invoke(updatePlan, params);

  expect(patchedBody).toEqual({ title: "Q3 Marketing Launch (Revised)" });
  expect(result.data).toEqual(updatePlanExamplePayload.data);
});

test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(PLAN_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(PLAN_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(invoke(updatePlan, params)).rejects.toThrow(/status code 400/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
