import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listUsersExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../testHelpers";
import { selectUser } from "./selectUser";
const USERS_LIST = `${V2}/users/list`;
describe("selectUser", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs labelled with name and email", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(USERS_LIST, matcher)
      .reply(200, { ...listUsersExamplePayload.data, hasNextPage: false });
    const { result } = await invokeDataSource(selectUser, {
      connection: testConnection,
    });
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      limit: 100,
    });
    expect(result).toStrictEqual([
      {
        label: "Sally Doe (sally.doe@example.com)",
        key: "553c3ef8b8cdcd1501ba123a",
      },
    ]);
  });
  test("returns an empty picklist when the account has no users", async () => {
    nock(CANNY_HOST)
      .post(USERS_LIST)
      .reply(200, { users: [], hasNextPage: false, cursor: "" });
    const { result } = await invokeDataSource(selectUser, {
      connection: testConnection,
    });
    expect(result).toStrictEqual([]);
  });
});
