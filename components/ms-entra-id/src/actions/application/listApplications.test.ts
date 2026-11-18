import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listApplicationsExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  emptyOdataQueryParams,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listApplications } from "./listApplications";

describe("listApplications", () => {
  afterEach(resetNock);

  test("happy path returns a single page with the query and consistency header forwarded", async () => {
    const scope = mockGraph()
      .matchHeader("ConsistencyLevel", "Eventual")
      .get(`${API_PATH}/applications`)
      .query({ $count: "true", $top: "5" })
      .reply(200, listApplicationsExamplePayload.data);
    const { result } = await invoke(listApplications, {
      connection,
      getAllPaginatedResults: false,
      odataQueryParams: { ...emptyOdataQueryParams, $count: true, $top: 5 },
      eventualConsistencyLevelHeader: true,
    });
    expect(result).toEqual(listApplicationsExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .get(`${API_PATH}/applications`)
      .query(true)
      .reply(403, graphError);
    await expect(
      invoke(listApplications, {
        connection,
        getAllPaginatedResults: false,
        odataQueryParams: emptyOdataQueryParams,
        eventualConsistencyLevelHeader: false,
      }),
    ).rejects.toThrow();
  });
});
