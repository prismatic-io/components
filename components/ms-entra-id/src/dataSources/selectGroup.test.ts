import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listGroupExamplePayload } from "../examplePayloads";
import { API_PATH, connection, mockGraph, resetNock } from "../testHelpers";
import { selectGroup } from "./selectGroup";

describe("selectGroup", () => {
  afterEach(resetNock);

  test("maps groups to { key, label } elements in API order", async () => {
    mockGraph()
      .get(`${API_PATH}/groups`)
      .query({ $select: "id,displayName" })
      .reply(200, listGroupExamplePayload.data);
    const { result } = await invokeDataSource(selectGroup, { connection });
    expect(result).toEqual(
      listGroupExamplePayload.data.value.map(({ id, displayName }) => ({
        key: id,
        label: displayName,
      })),
    );
  });

  test("returns an empty list when there are no groups", async () => {
    mockGraph().get(`${API_PATH}/groups`).query(true).reply(200, { value: [] });
    const { result } = await invokeDataSource(selectGroup, { connection });
    expect(result).toEqual([]);
  });
});
