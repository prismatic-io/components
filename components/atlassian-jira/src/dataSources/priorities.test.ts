import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listPrioritiesExamplePayload } from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import priorities from "./priorities";

const { selectPriority } = priorities;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("selectPriority", () => {
  test("maps each priority to a key/label element", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/priority")
      .reply(200, listPrioritiesExamplePayload.data.values);

    const { result } = await invokeDataSource(selectPriority, {
      jiraConnection: basicConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "Highest", key: "1" },
      { label: "High", key: "2" },
      { label: "Medium", key: "3" },
    ]);
  });

  test("returns an empty list when there are no priorities", async () => {
    jiraApi().get("/rest/api/3/priority").reply(200, []);

    const { result } = await invokeDataSource(selectPriority, {
      jiraConnection: basicConnection(),
    });

    expect(result).toEqual([]);
  });
});
