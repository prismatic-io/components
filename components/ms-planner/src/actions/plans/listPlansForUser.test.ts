import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { listPlansForUserExamplePayload } from "../../examplePayloads";
import { listPlansForUser } from "./listPlansForUser";
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
test("returns every plan the paged walk collected", async () => {
  nock(BASE)
    .get("/v1.0/me/planner/plans")
    .reply(200, listPlansForUserExamplePayload.data);
  const { result } = await invoke(listPlansForUser, params);
  expect(result.data).toEqual({
    ...listPlansForUserExamplePayload.data,
    truncated: false,
  });
});
test("surfaces a failed list request", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/me/planner/plans")
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(listPlansForUser, params)).rejects.toThrow(
    /status code 403/,
  );
  expect(errorScope.isDone()).toBe(true);
});
