import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listGroupsExamplePayload } from "../examplePayloads";
import { selectGroup } from "./selectGroup";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/beta/groups";
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
const listReply = listGroupsExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectGroup, {
    connection,
  })) as unknown as Element[];
describe("selectGroup", () => {
  afterEach(() => nock.cleanAll());
  test("maps the group list to a bare array of label/key elements", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const result = await invokeBare();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      { label: "Golf Assist", key: "45b7d2e7-b882-4a80-ba97-10b7a63b8fa4" },
      { label: "Golf Discussion", key: "d7797254-3084-44d0-99c9-a3b5ab149538" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the API returns no groups", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
