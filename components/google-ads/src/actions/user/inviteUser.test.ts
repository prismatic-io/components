import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { inviteUserExamplePayload } from "../../examplePayloads";
import { inviteUser } from "./inviteUser";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/customerUserAccessInvitations:mutate`;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  emailAddress: "john.doe@example.com",
  accessRole: "STANDARD",
};
describe("inviteUser", () => {
  afterEach(() => nock.cleanAll());
  test("posts the invitation and returns the created resource", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        operation: {
          create: {
            accessRole: "STANDARD",
            emailAddress: "john.doe@example.com",
          },
        },
      })
      .reply(200, inviteUserExamplePayload.data);
    const { result } = await invoke(inviteUser, params);
    expect(result.data).toEqual(inviteUserExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid email address" } });
    await expect(invoke(inviteUser, params)).rejects.toThrow();
  });
});
