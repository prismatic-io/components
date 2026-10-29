import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { oauthClientCredentials, templatedOauth } from "../connections";
import { DIRECTORY_PAGE_SIZE } from "../constants";
import { selectGroupExamplePayload } from "../examplePayloads";
import { selectGroup } from "./selectGroup";

const BASE = "https://graph.microsoft.com";
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

const [exampleGroup] = selectGroupExamplePayload.result;
const groups = {
  value: [
    { id: exampleGroup.key, displayName: exampleGroup.label },
    { id: "1b2f1f4a-6f0e-4c6d-9a4a-6c2ef1f5d901", displayName: "Engineering" },
  ],
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("reads the signed-in user's groups on an authorization code connection", async () => {
  nock(BASE)
    .get("/v1.0/me/memberOf/microsoft.graph.group")
    .query({ $select: "id,displayName", $top: String(DIRECTORY_PAGE_SIZE) })
    .reply(200, groups);

  const { result } = await invokeDataSource(selectGroup, {
    connection: authCode,
  });

  expect(result).toEqual([
    { label: "Marketing", key: "ebf3b108-5234-4e22-b93d-656d7dae5874" },
    { label: "Engineering", key: "1b2f1f4a-6f0e-4c6d-9a4a-6c2ef1f5d901" },
  ]);
});

test("falls back to the tenant group list, filtered to Microsoft 365 groups, on client credentials", async () => {
  nock(BASE)
    .get("/v1.0/groups")
    .query({
      $filter: "groupTypes/any(c:c eq 'Unified')",
      $select: "id,displayName",
      $top: String(DIRECTORY_PAGE_SIZE),
    })
    .reply(200, groups);

  const { result } = await invokeDataSource(selectGroup, {
    connection: clientCredentials,
  });

  expect(result).toHaveLength(2);
  expect(result[0]).toEqual({
    label: "Marketing",
    key: "ebf3b108-5234-4e22-b93d-656d7dae5874",
  });
});

test("returns an empty picklist when the tenant has no matching groups", async () => {
  nock(BASE)
    .get("/v1.0/me/memberOf/microsoft.graph.group")
    .query(true)
    .reply(200, { value: [] });

  const { result } = await invokeDataSource(selectGroup, {
    connection: authCode,
  });

  expect(result).toEqual([]);
});
