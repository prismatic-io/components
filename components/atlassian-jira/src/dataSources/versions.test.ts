import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listVersionsExamplePayload } from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import versions from "./versions";

const { selectVersion } = versions;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const params = () => ({
  jiraConnection: basicConnection(),
  projectId: "10000",
});

describe("selectVersion", () => {
  test("reads every page and returns label-sorted key/label elements", async () => {
    const [firstVersion, secondVersion] =
      listVersionsExamplePayload.data.values;
    const scope = jiraApi()
      .get("/rest/api/3/project/10000/version")
      .query({ startAt: "0" })
      .reply(200, {
        ...listVersionsExamplePayload.data,
        values: [secondVersion],
      })
      .get("/rest/api/3/project/10000/version")
      .query({ startAt: "2" })
      .reply(200, {
        ...listVersionsExamplePayload.data,
        startAt: 2,
        isLast: true,
        values: [firstVersion],
      });

    const { result } = await invokeDataSource(selectVersion, params());

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "New Version 1", key: "10000" },
      { label: "Next Version", key: "10010" },
    ]);
  });

  test("returns an empty list when the project has no versions", async () => {
    jiraApi()
      .get("/rest/api/3/project/10000/version")
      .query({ startAt: "0" })
      .reply(200, {
        ...listVersionsExamplePayload.data,
        isLast: true,
        values: [],
      });

    const { result } = await invokeDataSource(selectVersion, params());

    expect(result).toEqual([]);
  });
});
