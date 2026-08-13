import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getGroupExamplePayload } from "../../examplePayloads";
import { createGroup } from "./createGroup";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/groups";
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
const groupReply = getGroupExamplePayload.data;
const emptyAdditionalFields = {
  description: undefined,
  assignedLabels: undefined,
  visibility: undefined,
};
describe("createGroup", () => {
  afterEach(() => nock.cleanAll());
  test("posts the flattened group body and returns the created group", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        displayName: "HR Taskforce",
        mailEnabled: true,
        mailNickname: "HRTaskforce",
        securityEnabled: false,
        description: "Welcome to the HR Taskforce team.",
      })
      .reply(201, groupReply);
    const { result } = await invoke(createGroup, {
      connection,
      displayName: "HR Taskforce",
      mailNickname: "HRTaskforce",
      securityEnabled: false,
      mailEnabled: true,
      additionalFields: {
        ...emptyAdditionalFields,
        description: "Welcome to the HR Taskforce team.",
      },
      bodyFields: {},
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(groupReply);
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "Request_BadRequest" } });
    await expect(
      invoke(createGroup, {
        connection,
        displayName: "HR Taskforce",
        mailNickname: "HRTaskforce",
        securityEnabled: false,
        mailEnabled: true,
        additionalFields: emptyAdditionalFields,
        bodyFields: {},
      }),
    ).rejects.toThrow();
  });
});
