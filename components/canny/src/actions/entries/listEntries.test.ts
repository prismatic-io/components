import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { listEntries } from "./listEntries";
const PATH = `${V1}/entries/list`;
const params = {
  connection: testConnection,
  entryType: "new",
  entrySort: "created",
  fetchAll: false,
  pagination: { limit: 10, skip: 0 },
};
describe("listEntries", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of changelog entries", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listEntriesExamplePayload.data);
    const { result } = await invoke(listEntries, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      type: "new",
      sort: "created",
      limit: 10,
      skip: 0,
    });
    expect(result.data).toStrictEqual(listEntriesExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listEntries, params)).rejects.toThrow();
  });
});
