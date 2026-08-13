import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listUsersExamplePayload } from "../examplePayloads";
import { selectUser } from "./selectUser";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
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
const listReply = listUsersExamplePayload.data;
describe("selectUser", () => {
  afterEach(() => nock.cleanAll());
  test("maps the user list to label/key elements wrapped in result", async () => {
    nock(HOST).get("/v1.0/users").reply(200, listReply);
    const { result } = await invokeDataSource(selectUser, { connection });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Conf Room Adams",
        key: "6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
      },
      {
        label: "MOD Administrator",
        key: "4562bcc8-c436-4f95-b7c0-4f8ce89dca5e",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no users", async () => {
    nock(HOST).get("/v1.0/users").reply(200, { value: [] });
    const { result } = await invokeDataSource(selectUser, { connection });
    expect(result).toEqual([]);
  });
});
