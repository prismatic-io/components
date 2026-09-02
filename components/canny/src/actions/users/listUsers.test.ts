import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listUsersExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../../testHelpers";
import { listUsers } from "./listUsers";
const PATH = `${V2}/users/list`;
const params = {
  connection: testConnection,
  fetchAll: false,
  pagination: { cursor: undefined, limit: 10 },
};
describe("listUsers", () => {
  afterEach(() => nock.cleanAll());
  test("returns the first page of users", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listUsersExamplePayload.data);
    const { result } = await invoke(listUsers, params);
    expect(captured.body).toStrictEqual({ apiKey: "test-api-key", limit: 10 });
    expect(result.data).toStrictEqual(listUsersExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listUsers, params)).rejects.toThrow();
  });
});
