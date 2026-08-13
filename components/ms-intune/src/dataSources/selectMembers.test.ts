import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listMembersExamplePayload } from "../examplePayloads";
import { selectMember } from "./selectMembers";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const GROUP_ID = "45b7d2e7-b882-4a80-ba97-10b7a63b8fa4";
const PATH = `/v1.0/groups/${GROUP_ID}/members`;
const connection = createConnection(
  msIntuneOAuth2,
  {
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: ACCESS_TOKEN },
);
const listReply = listMembersExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectMember, {
    connection,
    groupId: GROUP_ID,
  })) as unknown as Element[];
describe("selectMember", () => {
  afterEach(() => nock.cleanAll());
  test("maps the group member list to a bare array of label/key elements", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const result = await invokeBare();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "user1@contoso.com",
        key: "11111111-2222-3333-4444-555555555555",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the group has no members", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
