import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listUsersExamplePayload } from "../examplePayloads";
import { API_PATH, connection, mockGraph, resetNock } from "../testHelpers";
import { selectUser } from "./selectUser";

describe("selectUser", () => {
  afterEach(resetNock);

  test("maps users to { key, label } elements", async () => {
    mockGraph()
      .get(`${API_PATH}/users`)
      .query({ $select: "id,displayName" })
      .reply(200, listUsersExamplePayload.data);
    const { result } = await invokeDataSource(selectUser, { connection });
    expect(result).toEqual(
      listUsersExamplePayload.data.value.map(({ id, displayName }) => ({
        key: id,
        label: displayName,
      })),
    );
  });

  test("returns an empty list when there are no users", async () => {
    mockGraph().get(`${API_PATH}/users`).query(true).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectUser, { connection });
    expect(result).toEqual([]);
  });
});
