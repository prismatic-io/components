import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { oauthClientCredentials, templatedOauth } from "../connections";
import { listPlansInGroupExamplePayload } from "../examplePayloads";
import { selectPlan } from "./selectPlan";
const BASE = "https://graph.microsoft.com";
const GROUP_ID = "ebf3b108-5234-4e22-b93d-656d7dae5874";
const USER_ID = "48d31887-5fad-4d73-a9f5-3c356e68a038";
const authCode = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const clientCredentials = createConnection(
  oauthClientCredentials,
  { userId: USER_ID },
  { access_token: "test-token" },
);
const plans = listPlansInGroupExamplePayload.data;
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("reads a group's plans when a Group ID is selected", async () => {
  nock(BASE).get(`/v1.0/groups/${GROUP_ID}/planner/plans`).reply(200, plans);
  const { result } = await invokeDataSource(selectPlan, {
    connection: authCode,
    groupId: GROUP_ID,
  });
  expect(result).toEqual([
    { label: "Q3 Marketing Launch", key: plans.value[0].id },
  ]);
});
test("reads the signed-in user's plans when no Group ID is selected", async () => {
  nock(BASE).get("/v1.0/me/planner/plans").reply(200, plans);
  const { result } = await invokeDataSource(selectPlan, {
    connection: authCode,
    groupId: undefined,
  });
  expect(result).toHaveLength(1);
});
test("rewrites the /me path to /users/{userId} on a client credentials connection", async () => {
  nock(BASE).get(`/v1.0/users/${USER_ID}/planner/plans`).reply(200, plans);
  const { result } = await invokeDataSource(selectPlan, {
    connection: clientCredentials,
    groupId: undefined,
  });
  expect(result).toHaveLength(1);
});
test("returns an empty picklist when the group holds no plans", async () => {
  nock(BASE)
    .get(`/v1.0/groups/${GROUP_ID}/planner/plans`)
    .reply(200, { value: [] });
  const { result } = await invokeDataSource(selectPlan, {
    connection: authCode,
    groupId: GROUP_ID,
  });
  expect(result).toEqual([]);
});
