import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { updateVersionExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { updateVersion } from "./updateVersion";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const update = () =>
  invoke(updateVersion, {
    jiraConnection: basicConnection(),
    versionId: "10000",
    description: "Patch release",
    versionName: undefined,
    releaseDetails: {
      archived: undefined,
      released: true,
      startDate: undefined,
      releaseDate: "2026-11-01",
    },
    projectKey: undefined,
    projectId: "10000",
    dynamicValues: {},
    fieldValues: {},
  });

describe("updateVersion", () => {
  test("updates the version addressed by its id in the path with only the fields that were set", async () => {
    let sent: Record<string, unknown> | undefined;
    const scope = jiraApi()
      .put("/rest/api/3/version/10000", (body) => {
        sent = body;
        return true;
      })
      .reply(200, updateVersionExamplePayload.data);

    const { result } = await update();

    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({
      description: "Patch release",
      released: true,
      releaseDate: "2026-11-01",
      projectId: "10000",
    });
    expect(result.data).toEqual(updateVersionExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .put("/rest/api/3/version/10000")
      .reply(404, { errorMessages: ["not found"] });

    await expect(update()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
