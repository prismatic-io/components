import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listGroupExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  emptyOdataQueryParams,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listGroup } from "./listGroup";

const NEXT_LINK = `https://graph.microsoft.com${API_PATH}/groups?$skiptoken=page2`;

describe("listGroup", () => {
  afterEach(resetNock);

  test("happy path follows @odata.nextLink across two pages when fetching all", async () => {
    const firstPage = listGroupExamplePayload.data.value;
    const secondGroup = { ...firstPage[0], id: "second-page-group-id" };
    const scope = mockGraph()
      .get(`${API_PATH}/groups`)
      .query({ $count: "false" })
      .reply(200, {
        ...listGroupExamplePayload.data,
        "@odata.nextLink": NEXT_LINK,
      })
      .get(`${API_PATH}/groups`)
      .query({ $skiptoken: "page2" })
      .reply(200, {
        ...listGroupExamplePayload.data,
        value: [secondGroup],
      });
    const { result } = await invoke(listGroup, {
      connection,
      getAllPaginatedResults: true,
      odataQueryParams: { ...emptyOdataQueryParams, $top: 1 },
      eventualConsistencyLevelHeader: false,
    });
    expect(result).toEqual({
      data: {
        ...listGroupExamplePayload.data,
        value: [...firstPage, secondGroup],
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/groups`).query(true).reply(500, graphError);
    await expect(
      invoke(listGroup, {
        connection,
        getAllPaginatedResults: false,
        odataQueryParams: emptyOdataQueryParams,
        eventualConsistencyLevelHeader: false,
      }),
    ).rejects.toThrow();
  });
});
