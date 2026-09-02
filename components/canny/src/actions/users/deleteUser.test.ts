import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deleteUser } from "./deleteUser";
const PATH = `${V1}/users/delete`;
const params = {
  connection: testConnection,
  userId: "553c3ef8b8cdcd1501ba123a",
};
describe("deleteUser", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a user", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deleteUserExamplePayload.data);
    const { result } = await invoke(deleteUser, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      userID: "553c3ef8b8cdcd1501ba123a",
    });
    expect(result.data).toStrictEqual(deleteUserExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "user not found" });
    await expect(invoke(deleteUser, params)).rejects.toThrow();
  });
});
