import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getUserExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { getUser } from "./getUser";

const USER_ID = getUserExamplePayload.data.id;

describe("getUser", () => {
  afterEach(resetNock);

  test("happy path returns the user", async () => {
    const scope = mockGraph()
      .get(`${API_PATH}/users/${USER_ID}`)
      .query({ $select: "displayName,mail" })
      .reply(200, getUserExamplePayload.data);
    const { result } = await invoke(getUser, {
      connection,
      userId: USER_ID,
      $select: "displayName,mail",
    });
    expect(result).toEqual(getUserExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/users/${USER_ID}`).reply(404, graphError);
    await expect(
      invoke(getUser, { connection, userId: USER_ID, $select: undefined }),
    ).rejects.toThrow();
  });
});
