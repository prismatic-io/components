import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { listSubscriptions } from "./listSubscriptions";

describe("listSubscriptions", () => {
  afterEach(resetNock);

  test("happy path returns a single page of subscriptions", async () => {
    mockGraph()
      .get(`${API_PATH}/subscriptions`)
      .reply(200, listSubscriptionsExamplePayload.data);
    const { result } = await invoke(listSubscriptions, {
      connection,
      getAllPaginatedResults: false,
    });
    expect(result).toEqual(listSubscriptionsExamplePayload);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().get(`${API_PATH}/subscriptions`).reply(403, graphError);
    await expect(
      invoke(listSubscriptions, { connection, getAllPaginatedResults: false }),
    ).rejects.toThrow();
  });
});
