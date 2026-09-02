import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createEntryExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createEntry } from "./createEntry";
const PATH = `${V1}/entries/create`;
const params = {
  connection: testConnection,
  entryTitle: "New Dashboard Features",
  entryDetails: "We have added several new features to the dashboard.",
  entryType: "new",
  additionalFields: {
    notify: false,
    published: true,
    additionalFields: {},
  },
};
describe("createEntry", () => {
  afterEach(() => nock.cleanAll());
  test("creates a changelog entry and flattens the additional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createEntryExamplePayload.data);
    const { result } = await invoke(createEntry, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      title: "New Dashboard Features",
      details: "We have added several new features to the dashboard.",
      type: "new",
      notify: false,
      published: true,
    });
    expect(result.data).toStrictEqual(createEntryExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid type" });
    await expect(invoke(createEntry, params)).rejects.toThrow();
  });
});
