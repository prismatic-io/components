import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { createApplicationExamplePayload } from "../examplePayloads";
import { API_PATH, connection, mockGraph, resetNock } from "../testHelpers";
import { selectApplication } from "./selectApplication";

describe("selectApplication", () => {
  afterEach(resetNock);

  test("maps applications to { key, label } elements", async () => {
    const application = createApplicationExamplePayload.data;
    mockGraph()
      .get(`${API_PATH}/applications`)
      .query({ $select: "id,displayName" })
      .reply(200, { value: [application] });
    const { result } = await invokeDataSource(selectApplication, {
      connection,
    });
    expect(result).toEqual([
      { key: application.id, label: application.displayName },
    ]);
  });

  test("returns an empty list when there are no applications", async () => {
    mockGraph()
      .get(`${API_PATH}/applications`)
      .query(true)
      .reply(200, { value: [] });
    const { result } = await invokeDataSource(selectApplication, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
