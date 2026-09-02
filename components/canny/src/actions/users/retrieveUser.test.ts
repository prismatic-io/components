import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { retrieveUserExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { retrieveUser } from "./retrieveUser";
const PATH = `${V1}/users/retrieve`;
const params = {
  connection: testConnection,
  userId: "553c3ef8b8cdcd1501ba123a",
};
describe("retrieveUser", () => {
  afterEach(() => nock.cleanAll());
  test("retrieves one user by ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, retrieveUserExamplePayload.data);
    const { result } = await invoke(retrieveUser, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba123a",
    });
    expect(result.data).toStrictEqual(retrieveUserExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "user not found" });
    await expect(invoke(retrieveUser, params)).rejects.toThrow();
  });
});
