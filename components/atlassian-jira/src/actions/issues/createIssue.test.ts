import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { createIssue } from "./createIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

type VersionRefs = Array<{ id: string }>;

const create = (
  overrides: { fixVersions?: VersionRefs; versions?: VersionRefs } = {},
) =>
  invoke(createIssue, {
    jiraConnection: basicConnection(),
    projectId: "10000",
    summary: "Login bug",
    description: "Users cannot log in.",
    ADFdescription: undefined,
    issueType: "",
    issueTypeId: "10001",
    assignee: undefined,
    reporter: undefined,
    priority: undefined,
    labels: undefined,
    additionalFields: {
      dueDate: undefined,
      versions: overrides.versions,
      fixVersions: overrides.fixVersions,
    },
    dynamicValues: {},
    fieldValues: {},
  });

const expectFields = (check: (fields: Record<string, unknown>) => boolean) =>
  jiraApi().post("/rest/api/3/issue", (body) => check(body.fields));

describe("createIssue", () => {
  test("sends the version references the inputs cleaned", async () => {
    const scope = expectFields(
      (fields) =>
        JSON.stringify(fields.fixVersions) ===
          JSON.stringify([{ id: "10001" }, { id: "10002" }]) &&
        JSON.stringify(fields.versions) === JSON.stringify([{ id: "10000" }]),
    ).reply(201, createIssueExamplePayload.data);

    const { result } = await create({
      fixVersions: [{ id: "10001" }, { id: "10002" }],
      versions: [{ id: "10000" }],
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createIssueExamplePayload.data);
  });

  test("omits the optional fields when none are given", async () => {
    const scope = expectFields(
      (fields) =>
        !("fixVersions" in fields) &&
        !("versions" in fields) &&
        !("assignee" in fields) &&
        !("reporter" in fields) &&
        !("priority" in fields) &&
        !("duedate" in fields),
    ).reply(201, createIssueExamplePayload.data);

    await create();

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/issue")
      .reply(400, { errorMessages: ["bad request"] });

    await expect(create()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
