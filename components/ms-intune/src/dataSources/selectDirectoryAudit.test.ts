import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDirectoryAuditExamplePayload } from "../examplePayloads";
import { selectDirectoryAudit } from "./selectDirectoryAudit";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/v1.0/auditLogs/directoryaudits";
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
const listReply = listDirectoryAuditExamplePayload.data;
describe("selectDirectoryAudit", () => {
  afterEach(() => nock.cleanAll());
  test("maps the audit list to label/key elements wrapped in result", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invokeDataSource(selectDirectoryAudit, {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([{ label: "Add member to group", key: "id" }]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no audits", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectDirectoryAudit, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
