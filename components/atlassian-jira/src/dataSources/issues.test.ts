import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  listIssueCustomFieldsExamplePayload,
  listIssueFieldsExamplePayload,
  listIssueTypesExamplePayload,
  searchIssuesExamplePayload,
} from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import issues from "./issues";

const {
  selectIssueType,
  selectIssueTypes,
  issueFields,
  selectIssue,
  selectIssueTypeFromProject,
} = issues;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const [task, bug, story] = listIssueTypesExamplePayload.data;

const mockIssueTypes = (projectId: string, body: unknown[]) =>
  jiraApi()
    .get("/rest/api/3/issuetype/project")
    .query({ projectId })
    .reply(200, body);

describe("selectIssueType", () => {
  test("returns name-sorted key/label elements for one project", async () => {
    const scope = mockIssueTypes("10000", listIssueTypesExamplePayload.data);

    const { result } = await invokeDataSource(selectIssueType, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000" }],
      returnIssueTypeName: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "Bug", key: "10001" },
      { label: "Story", key: "10002" },
      { label: "Task", key: "10000" },
    ]);
  });

  test("labels types unique to one project with its name and merges shared ones", async () => {
    mockIssueTypes("10000", [task, bug]);
    mockIssueTypes("10001", [task, story]);

    const { result } = await invokeDataSource(selectIssueType, {
      connection: basicConnection(),
      projectIds: [
        { projectId: "10000", projectName: "EX - Example Project" },
        { projectId: "10001", projectName: "ABC - Another Project" },
      ],
      returnIssueTypeName: false,
    });

    expect(result).toEqual([
      { label: "Bug (EX - Example Project)", key: "10001" },
      { label: "Story (ABC - Another Project)", key: "10002" },
      { label: "Task", key: "10000" },
    ]);
  });

  test("keys each element by name when returnIssueTypeName is true", async () => {
    mockIssueTypes("10000", [task, bug]);

    const { result } = await invokeDataSource(selectIssueType, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000" }],
      returnIssueTypeName: true,
    });

    expect(result).toEqual([
      { label: "Bug", key: "Bug" },
      { label: "Task", key: "Task" },
    ]);
  });

  test("returns a shared type twice when returnIssueTypeName is true", async () => {
    mockIssueTypes("10000", [task]);
    mockIssueTypes("10001", [task]);

    const { result } = await invokeDataSource(selectIssueType, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000" }, { projectId: "10001" }],
      returnIssueTypeName: true,
    });

    expect(result).toEqual([
      { label: "Task", key: "Task" },
      { label: "Task", key: "Task" },
    ]);
  });

  test("returns an empty list when the project has no issue types", async () => {
    mockIssueTypes("10000", []);

    const { result } = await invokeDataSource(selectIssueType, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000" }],
      returnIssueTypeName: false,
    });

    expect(result).toEqual([]);
  });
});

describe("selectIssueTypes", () => {
  test("wraps each issue type element as an object selection", async () => {
    mockIssueTypes("10000", [task, bug]);

    const { result } = await invokeDataSource(selectIssueTypes, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000", projectName: "EX - Example Project" }],
    });

    expect(result).toEqual([
      { object: { label: "Bug", key: "10001" } },
      { object: { label: "Task", key: "10000" } },
    ]);
  });

  test("returns an empty list when the project has no issue types", async () => {
    mockIssueTypes("10000", []);

    const { result } = await invokeDataSource(selectIssueTypes, {
      connection: basicConnection(),
      projectIds: [{ projectId: "10000" }],
    });

    expect(result).toEqual([]);
  });
});

describe("selectIssueTypeFromProject", () => {
  test("returns the project's issue types as key/label elements", async () => {
    const scope = mockIssueTypes("10000", [task, bug]);

    const { result } = await invokeDataSource(selectIssueTypeFromProject, {
      connection: basicConnection(),
      projectId: "10000",
      returnIssueTypeName: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "Bug", key: "10001" },
      { label: "Task", key: "10000" },
    ]);
  });

  test("returns an empty list when the project has no issue types", async () => {
    mockIssueTypes("10000", []);

    const { result } = await invokeDataSource(selectIssueTypeFromProject, {
      connection: basicConnection(),
      projectId: "10000",
      returnIssueTypeName: false,
    });

    expect(result).toEqual([]);
  });
});

describe("issueFields", () => {
  const allFields = [
    ...listIssueFieldsExamplePayload.data,
    ...listIssueCustomFieldsExamplePayload.data,
  ];

  test("returns every field, sorted by name, as key/label elements", async () => {
    jiraApi().get("/rest/api/3/field").reply(200, allFields);

    const { result } = await invokeDataSource(issueFields, {
      connection: basicConnection(),
      onlyCustomFields: false,
    });

    expect(result).toEqual([
      { label: "Description", key: "description" },
      { label: "Story Points", key: "customfield_10000" },
      { label: "Summary", key: "summary" },
    ]);
  });

  test("keeps only custom fields when onlyCustomFields is true", async () => {
    jiraApi().get("/rest/api/3/field").reply(200, allFields);

    const { result } = await invokeDataSource(issueFields, {
      connection: basicConnection(),
      onlyCustomFields: true,
    });

    expect(result).toEqual([
      { label: "Story Points", key: "customfield_10000" },
    ]);
  });

  test("returns an empty list when Jira reports no fields", async () => {
    jiraApi().get("/rest/api/3/field").reply(200, []);

    const { result } = await invokeDataSource(issueFields, {
      connection: basicConnection(),
      onlyCustomFields: false,
    });

    expect(result).toEqual([]);
  });
});

describe("selectIssue", () => {
  test("searches the project's issues and labels each by its key", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/search/jql")
      .query({ jql: "project=10000", maxResults: "1000", fields: "id,key" })
      .reply(200, searchIssuesExamplePayload.data);

    const { result } = await invokeDataSource(selectIssue, {
      jiraConnection: basicConnection(),
      projectId: "10000",
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toHaveLength(searchIssuesExamplePayload.data.issues.length);
    expect(result[0]).toEqual({ label: "HSP-1", key: "10001" });
  });

  test("returns an empty list when the project has no issues", async () => {
    jiraApi()
      .get("/rest/api/3/search/jql")
      .query(true)
      .reply(200, { isLast: true, issues: [] });

    const { result } = await invokeDataSource(selectIssue, {
      jiraConnection: basicConnection(),
      projectId: "10000",
    });

    expect(result).toEqual([]);
  });
});
