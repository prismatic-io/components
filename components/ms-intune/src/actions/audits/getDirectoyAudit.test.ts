import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getDirectoryAuditExamplePayload } from "../../examplePayloads";
import { getDirectoyAudit } from "./getDirectoyAudit";
const HOST = "https://graph.microsoft.com";
const AUDIT_ID = "705c034c-034c-705c-4c03-5c704c035c70";
const PATH = `/v1.0/auditLogs/directoryaudits/${AUDIT_ID}`;
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
const auditReply = getDirectoryAuditExamplePayload.data;
describe("getDirectoyAudit", () => {
  afterEach(() => nock.cleanAll());
  test("returns the directory audit for the requested Microsoft Entra ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, auditReply);
    const { result } = await invoke(getDirectoyAudit, {
      connection,
      microsoftEntraId: AUDIT_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(auditReply);
  });
  test("surfaces the failure when the audit does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(getDirectoyAudit, { connection, microsoftEntraId: AUDIT_ID }),
    ).rejects.toThrow();
  });
});
