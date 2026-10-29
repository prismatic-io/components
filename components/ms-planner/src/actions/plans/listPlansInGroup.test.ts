import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { listPlansInGroupExamplePayload } from "../../examplePayloads";
import { listPlansInGroup } from "./listPlansInGroup";
const BASE = "https://graph.microsoft.com";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = { connection, groupId: "ebf3b108-5234-4e22-b93d-656d7dae5874" };
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("returns every plan the paged walk collected", async () => {
  nock(BASE)
    .get("/v1.0/groups/ebf3b108-5234-4e22-b93d-656d7dae5874/planner/plans")
    .reply(200, listPlansInGroupExamplePayload.data);
  const { result } = await invoke(listPlansInGroup, params);
  expect(result.data).toEqual({
    ...listPlansInGroupExamplePayload.data,
    truncated: false,
  });
});
test("surfaces a failed list request", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/groups/ebf3b108-5234-4e22-b93d-656d7dae5874/planner/plans")
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(listPlansInGroup, params)).rejects.toThrow(
    /status code 403/,
  );
  expect(errorScope.isDone()).toBe(true);
});
