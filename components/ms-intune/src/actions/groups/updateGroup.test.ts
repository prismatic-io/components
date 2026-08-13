import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { updateGroupExamplePayload } from "../../examplePayloads";
import { updateGroup } from "./updateGroup";
const HOST = "https://graph.microsoft.com";
const GROUP_ID = "02bd9fd6-8f93-4758-87c3-1fb73740a315";
const PATH = `/v1.0/groups/${GROUP_ID}`;
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
const emptyAdditionalFields = {
  description: undefined,
  assignedLabels: undefined,
  visibility: undefined,
};
describe("updateGroup", () => {
  afterEach(() => nock.cleanAll());
  test("patches the group and returns the fixed success payload rather than the API body", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        displayName: "HR Taskforce Renamed",
        mailNickname: "HRTaskforce",
        securityEnabled: true,
        visibility: "Private",
      })
      .reply(204);
    const { result } = await invoke(updateGroup, {
      connection,
      groupId: GROUP_ID,
      displayName: "HR Taskforce Renamed",
      mailNickname: "HRTaskforce",
      securityEnabled: true,
      additionalFields: { ...emptyAdditionalFields, visibility: "Private" },
      bodyFields: {},
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(NO_RESPONSE_SUCCESSFULL_PAYLOAD);
    expect(result.data).toEqual(updateGroupExamplePayload.data);
  });
  test("surfaces the failure when the group cannot be updated", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(404, { error: { code: "Request_ResourceNotFound" } });
    await expect(
      invoke(updateGroup, {
        connection,
        groupId: GROUP_ID,
        displayName: "HR Taskforce Renamed",
        mailNickname: "HRTaskforce",
        securityEnabled: true,
        additionalFields: emptyAdditionalFields,
        bodyFields: {},
      }),
    ).rejects.toThrow();
  });
});
