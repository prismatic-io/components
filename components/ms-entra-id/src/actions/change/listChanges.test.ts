import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listChangesExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listChanges } from "./listChanges";

const emptyDeltaParams = {
  $deltatoken: undefined,
  $skiptoken: undefined,
  $select: undefined,
  $filter: undefined,
};

describe("listChanges", () => {
  afterEach(resetNock);

  test("happy path gets the delta URL with the minimal-return header", async () => {
    const scope = mockGraph()
      .matchHeader("Prefer", "return=minimal")
      .get(`${API_PATH}/users/delta`)
      .query({ $deltatoken: "abc" })
      .reply(200, listChangesExamplePayload.data);
    const { result } = await invoke(listChanges, {
      connection,
      deltaURL: "/users/delta",
      odataQueryParams: { ...emptyDeltaParams, $deltatoken: "abc" },
      returnMinimal: true,
    });
    expect(result).toEqual(listChangesExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/users/delta`).reply(400, graphError);
    await expect(
      invoke(listChanges, {
        connection,
        deltaURL: "/users/delta",
        odataQueryParams: emptyDeltaParams,
        returnMinimal: false,
      }),
    ).rejects.toThrow();
  });
});
