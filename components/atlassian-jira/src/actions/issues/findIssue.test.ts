import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { findIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { findIssue } from "./findIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const find = (searchType: string, searchValue: string) =>
  invoke(findIssue, {
    jiraConnection: basicConnection(),
    searchType,
    searchValue,
    fields: "",
  });

const expectJql = (jql: string) =>
  jiraApi()
    .get("/rest/api/3/search/jql")
    .query(
      (query) => query.jql === jql && query.fields === DEFAULT_ISSUE_FIELDS,
    );

const anySearch = () => jiraApi().get("/rest/api/3/search/jql").query(true);

describe("searchValue clean", () => {
  const clean = findIssue.inputs.searchValue.clean as (
    value: unknown,
  ) => string;

  test("lower-cases and trims the value", () => {
    expect(clean("  PROJ-123 ")).toBe("proj-123");
  });
});

describe("findIssue by summary", () => {
  test("escapes quote marks in the summary text", async () => {
    const scope = expectJql('summary ~ "say \\"hi\\""').reply(
      200,
      findIssueExamplePayload.data,
    );

    const { result } = await find("summary", 'say "hi"');

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(findIssueExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    anySearch().reply(500, { errorMessages: ["boom"] });

    await expect(find("summary", "login bug")).rejects.toMatchObject({
      response: { status: 500 },
    });
  });
});

describe("findIssue by number", () => {
  test.each([
    ["an issue key", "proj-123"],
    ["a numeric id", "10001"],
  ])("searches by id for %s", async (_label, searchValue) => {
    const scope = expectJql(`id=${searchValue}`).reply(
      200,
      findIssueExamplePayload.data,
    );

    const { result } = await find("number", searchValue);

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(findIssueExamplePayload.data);
  });

  test("returns an empty result without calling Jira for a value that is not a key or id", async () => {
    const { result } = await find("number", "abc-1 or project = x");

    expect(result).toEqual({ data: [] });
  });

  test("returns an empty result when Jira rejects the key as unknown", async () => {
    anySearch().reply(400, {
      errorMessages: ["The issue key 'PROJ-999' for field 'id' is invalid."],
    });

    const { result } = await find("number", "proj-999");

    expect(result).toEqual({ data: [] });
  });

  test.each([
    ["an authentication failure", 401],
    ["a rate limit", 429],
    ["a server error", 503],
  ])("rethrows %s instead of hiding it as an empty result", async (_label, status) => {
    anySearch().reply(status, { errorMessages: ["nope"] });

    await expect(find("number", "proj-123")).rejects.toMatchObject({
      response: { status },
    });
  });
});
