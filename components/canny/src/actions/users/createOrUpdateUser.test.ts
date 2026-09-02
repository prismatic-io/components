import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createOrUpdateUserExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createOrUpdateUser } from "./createOrUpdateUser";
const PATH = `${V1}/users/create_or_update`;
const params = {
  connection: testConnection,
  userEmail: "jane@example.com",
  userName: "Jane Smith",
  userId: "1234",
  additionalFields: {
    companies: [{ id: "553c3ef8b8cdcd1501ba1111" }],
    customFields: { plan: "pro" },
    additionalFields: {},
  },
};
describe("createOrUpdateUser", () => {
  afterEach(() => nock.cleanAll());
  test("creates or updates a user and flattens the additional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createOrUpdateUserExamplePayload.data);
    const { result } = await invoke(createOrUpdateUser, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      email: "jane@example.com",
      name: "Jane Smith",
      userID: "1234",
      companies: [{ id: "553c3ef8b8cdcd1501ba1111" }],
      customFields: { plan: "pro" },
    });
    expect(result.data).toStrictEqual(createOrUpdateUserExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid email" });
    await expect(invoke(createOrUpdateUser, params)).rejects.toThrow();
  });
});
