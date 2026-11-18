import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listUsersExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  emptyOdataQueryParams,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listUsers } from "./listUsers";

const NEXT_LINK = `https://graph.microsoft.com${API_PATH}/users?$skiptoken=page2`;

describe("listUsers", () => {
  afterEach(resetNock);

  test("happy path follows @odata.nextLink across two pages when fetching all", async () => {
    const [user] = listUsersExamplePayload.data.value;
    const secondUser = { ...user, id: "second-user-id" };
    const scope = mockGraph()
      .get(`${API_PATH}/users`)
      .query({ $count: "false", $filter: "startswith(givenName,'A')" })
      .reply(200, {
        ...listUsersExamplePayload.data,
        "@odata.nextLink": NEXT_LINK,
      })
      .get(`${API_PATH}/users`)
      .query({ $skiptoken: "page2" })
      .reply(200, { ...listUsersExamplePayload.data, value: [secondUser] });
    const { result } = await invoke(listUsers, {
      connection,
      getAllPaginatedResults: true,
      odataQueryParams: {
        ...emptyOdataQueryParams,
        $filter: "startswith(givenName,'A')",
      },
      eventualConsistencyLevelHeader: false,
    });
    expect(result).toEqual({
      data: { ...listUsersExamplePayload.data, value: [user, secondUser] },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/users`).query(true).reply(400, graphError);
    await expect(
      invoke(listUsers, {
        connection,
        getAllPaginatedResults: false,
        odataQueryParams: emptyOdataQueryParams,
        eventualConsistencyLevelHeader: false,
      }),
    ).rejects.toThrow();
  });
});
