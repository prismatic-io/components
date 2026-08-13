import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUser } from "./createUser";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/users";
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
const createdUser = createUserExamplePayload.data;
const baseParams = {
  connection,
  accountEnabled: true,
  displayName: "Adele Vance",
  forceChangePasswordNextSignIn: true,
  password: "xWwvJ]6NMw+bWH-d",
  userPrincipalName: "AdeleV",
  domain: "contoso.com",
  additionalProperties: { jobTitle: "Product Marketing Manager" },
};
describe("createUser", () => {
  afterEach(() => nock.cleanAll());
  test("builds the password profile, joins the principal name to the domain, and returns the new user", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        accountEnabled: true,
        displayName: "Adele Vance",
        passwordProfile: {
          forceChangePasswordNextSignIn: true,
          password: "xWwvJ]6NMw+bWH-d",
        },
        mailNickname: "AdeleV",
        userPrincipalName: "AdeleV@contoso.com",
        jobTitle: "Product Marketing Manager",
      })
      .reply(201, createdUser);
    const { result } = await invoke(createUser, baseParams);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createdUser);
  });
  test("surfaces the failure when the API rejects the new user", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "Request_BadRequest" } });
    await expect(invoke(createUser, baseParams)).rejects.toThrow();
  });
});
