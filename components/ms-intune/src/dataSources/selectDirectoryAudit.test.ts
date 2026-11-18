import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDirectoryAuditsExamplePayload } from "../examplePayloads";
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

const listReply = listDirectoryAuditsExamplePayload.data;

describe("selectDirectoryAudit", () => {
  afterEach(() => nock.cleanAll());

  test("maps the audit list to label/key elements wrapped in result", async () => {
    nock(HOST).get(PATH).reply(200, listReply);

    const { result } = await invokeDataSource(selectDirectoryAudit, {
      connection,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Add member to group",
        key: "2f8c1a6e-4b3d-4e9a-8c7f-1d2e3f4a5b6c",
      },
    ]);
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
