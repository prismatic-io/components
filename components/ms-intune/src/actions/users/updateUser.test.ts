import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { updateUser } from "./updateUser";
const HOST = "https://graph.microsoft.com";
const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const PATH = `/v1.0/users/${USER_ID}`;
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
const baseParams = {
  connection,
  userId: USER_ID,
  accountEnabled: true,
  displayName: "Adele Vance",
  userPrincipalName: "AdeleV",
  domain: "contoso.com",
  name: { givenName: "Adele", surname: "Vance" },
  jobTitle: "Retail Manager",
  additionalProperties: { officeLocation: "18/2111" },
};
describe("updateUser", () => {
  afterEach(() => nock.cleanAll());
  test("joins the principal name to the domain, flattens the name group, and returns the empty 204 body", async () => {
    const scope = nock(HOST)
      .patch(PATH, {
        accountEnabled: true,
        displayName: "Adele Vance",
        userPrincipalName: "AdeleV@contoso.com",
        givenName: "Adele",
        surname: "Vance",
        jobTitle: "Retail Manager",
        officeLocation: "18/2111",
      })
      .reply(204);
    const { result } = await invoke(updateUser, baseParams);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual("");
  });
  test("surfaces the failure when the API rejects the update", async () => {
    nock(HOST)
      .patch(PATH)
      .reply(400, { error: { code: "Request_BadRequest" } });
    await expect(invoke(updateUser, baseParams)).rejects.toThrow();
  });
});
