import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { updatePlanDetailsExamplePayload } from "../../examplePayloads";
import { updatePlanDetails } from "./updatePlanDetails";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const DETAILS_URL = `/v1.0/planner/plans/${PLAN_ID}/details`;
const ETAG = 'W/"JzEtUGxhbkRldGFpbHNAQEBAQEBAQEBAQEBAQEBARCc="';
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  categoryDescriptions: {},
  sharing: { shareWith: [], unshareWith: [] },
  etag: undefined,
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("maps a shared user to true and an unshared user to false", async () => {
  let patchedBody: unknown;
  nock(BASE).get(DETAILS_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(DETAILS_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updatePlanDetailsExamplePayload.data];
    });
  const { result } = await invoke(updatePlanDetails, {
    ...params,
    categoryDescriptions: { category1: "Blocked" },
    sharing: { shareWith: ["user-a"], unshareWith: ["user-b"] },
  });
  expect(patchedBody).toEqual({
    categoryDescriptions: { category1: "Blocked" },
    sharedWith: { "user-a": true, "user-b": false },
  });
  expect(result.data).toEqual(updatePlanDetailsExamplePayload.data);
});
test("sends an empty body when neither category labels nor sharing were supplied", async () => {
  let patchedBody: unknown;
  nock(BASE).get(DETAILS_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(DETAILS_URL)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updatePlanDetailsExamplePayload.data];
    });
  await invoke(updatePlanDetails, params);
  expect(patchedBody).toEqual({});
});
test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(DETAILS_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(DETAILS_URL)
    .reply(400, { error: { code: "invalidRequest" } });
  await expect(invoke(updatePlanDetails, params)).rejects.toThrow(
    /status code 400/,
  );
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
