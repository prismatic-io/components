import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createVersionExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { createVersion } from "./createVersion";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const create = () =>
  invoke(createVersion, {
    jiraConnection: basicConnection(),
    description: "First release",
    versionName: "v1.0.0",
    releaseDetails: {
      archived: undefined,
      released: true,
      startDate: "2026-10-01",
      releaseDate: undefined,
    },
    projectKey: undefined,
    projectId: "10000",
    dynamicValues: {},
    fieldValues: {},
  });

describe("createVersion", () => {
  test("posts the version with only the fields that were set", async () => {
    const scope = jiraApi()
      .post(
        "/rest/api/3/version",
        (body) =>
          body.name === "v1.0.0" &&
          body.description === "First release" &&
          body.released === true &&
          body.startDate === "2026-10-01" &&
          body.projectId === 10000 &&
          !("archived" in body) &&
          !("releaseDate" in body) &&
          !("project" in body),
      )
      .reply(201, createVersionExamplePayload.data);

    const { result } = await create();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createVersionExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/version")
      .reply(400, { errorMessages: ["bad request"] });

    await expect(create()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
