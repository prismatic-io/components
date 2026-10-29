import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../connections";
import { DIRECTORY_PAGE_SIZE } from "../constants";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUser } from "./selectUser";
const BASE = "https://graph.microsoft.com";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const [exampleUser] = selectUserExamplePayload.result;
const users = {
  value: [
    {
      id: exampleUser.key,
      displayName: exampleUser.label,
      mail: "jane@example.com",
    },
    {
      id: "8f2e1b6c-0a3d-4f11-93b1-6a7c2d9e4f80",
      displayName: null,
      mail: "ops@example.com",
    },
  ],
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("keys each user by object ID and falls back to mail when displayName is absent", async () => {
  nock(BASE)
    .get("/v1.0/users")
    .query({
      $select: "id,displayName,mail",
      $top: String(DIRECTORY_PAGE_SIZE),
    })
    .reply(200, users);
  const { result } = await invokeDataSource(selectUser, { connection });
  expect(result).toEqual([
    { label: "Jane Smith", key: "fbab97d0-4932-4511-b675-204639209557" },
    { label: "ops@example.com", key: "8f2e1b6c-0a3d-4f11-93b1-6a7c2d9e4f80" },
  ]);
});
test("returns an empty picklist when the directory returns no users", async () => {
  nock(BASE).get("/v1.0/users").query(true).reply(200, { value: [] });
  const { result } = await invokeDataSource(selectUser, { connection });
  expect(result).toEqual([]);
});
