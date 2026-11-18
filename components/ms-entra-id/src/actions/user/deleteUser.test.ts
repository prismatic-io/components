import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getUserExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { deleteUser } from "./deleteUser";

const USER_ID = getUserExamplePayload.data.id;

describe("deleteUser", () => {
  afterEach(resetNock);

  test("happy path returns the delete record on 204", async () => {
    const scope = mockGraph().delete(`${API_PATH}/users/${USER_ID}`).reply(204);
    const { result } = await invoke(deleteUser, {
      connection,
      userId: USER_ID,
    });
    expect(result).toEqual({
      data: {
        success: true,
        id: USER_ID,
        message: "User deleted successfully",
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().delete(`${API_PATH}/users/${USER_ID}`).reply(404, graphError);
    await expect(
      invoke(deleteUser, { connection, userId: USER_ID }),
    ).rejects.toThrow();
  });
});
