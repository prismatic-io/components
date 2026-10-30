import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getVersionExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getVersion } from "./getVersion";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getVersion, { jiraConnection: basicConnection(), versionId: "10000" });

describe("getVersion", () => {
  test("reads the version addressed by its id in the path", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/version/10000")
      .reply(200, getVersionExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getVersionExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/version/10000")
      .reply(404, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
