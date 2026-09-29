import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "./connections";
import dataSources from "./dataSources";
import {
  issuesListForRepoExamplePayload,
  listReposForAuthenticatedUserExamplePayload,
  orgsListForAuthenticatedUserExamplePayload,
  pullsListExamplePayload,
  selectUserFromOrganizationExamplePayload,
} from "./examplePayloads";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const {
  listReposForAuthenticatedUser,
  selectOrganizationsForAuthenticatedUser,
  selectIssueForAuthenticatedUser,
  selectPullRequestFromRepo,
  selectUserFromOrganization,
} = dataSources;
afterEach(() => nock.cleanAll());
const assertElements = (result: unknown) => {
  expect(Array.isArray(result)).toBe(true);
  for (const el of result as Array<Record<string, unknown>>) {
    expect(el).toHaveProperty("key");
    expect(el).toHaveProperty("label");
  }
};
describe("listReposForAuthenticatedUser", () => {
  const repos = [
    {
      ...listReposForAuthenticatedUserExamplePayload.data[0],
      name: "zeta-repo",
    },
    {
      ...listReposForAuthenticatedUserExamplePayload.data[0],
      name: "alpha-repo",
    },
  ];
  test("returns key/label pairs", async () => {
    nock(BASE).get("/user/repos").query(true).reply(200, repos);
    const { result } = await invokeDataSource(listReposForAuthenticatedUser, {
      connection: conn,
    });
    assertElements(result);
    expect(result).toEqual([
      { key: "alpha-repo", label: "alpha-repo" },
      { key: "zeta-repo", label: "zeta-repo" },
    ]);
  });
  test("returns an empty array when the API returns no repos", async () => {
    nock(BASE).get("/user/repos").query(true).reply(200, []);
    const { result } = await invokeDataSource(listReposForAuthenticatedUser, {
      connection: conn,
    });
    expect(result).toEqual([]);
  });
});
describe("selectOrganizationsForAuthenticatedUser", () => {
  test("returns key/label pairs", async () => {
    nock(BASE)
      .get("/user/orgs")
      .query(true)
      .reply(200, orgsListForAuthenticatedUserExamplePayload.data);
    const { result } = await invokeDataSource(
      selectOrganizationsForAuthenticatedUser,
      { connection: conn },
    );
    assertElements(result);
    expect(result.length).toBe(
      orgsListForAuthenticatedUserExamplePayload.data.length,
    );
  });
  test("returns an empty array when the API returns no orgs", async () => {
    nock(BASE).get("/user/orgs").query(true).reply(200, []);
    const { result } = await invokeDataSource(
      selectOrganizationsForAuthenticatedUser,
      { connection: conn },
    );
    expect(result).toEqual([]);
  });
});
describe("selectIssueForAuthenticatedUser", () => {
  const baseInputs = {
    connection: conn,
    owner: "octocat",
    repo: "Hello-World",
    state: "open",
    assignee: undefined,
    labels: undefined,
    sort: "created",
    direction: "asc",
    since: undefined,
  };
  test("returns key/label pairs", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, issuesListForRepoExamplePayload.data);
    const { result } = await invokeDataSource(
      selectIssueForAuthenticatedUser,
      baseInputs,
    );
    assertElements(result);
    expect(result.length).toBe(issuesListForRepoExamplePayload.data.length);
  });
  test("returns an empty array when the API returns no issues", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, []);
    const { result } = await invokeDataSource(
      selectIssueForAuthenticatedUser,
      baseInputs,
    );
    expect(result).toEqual([]);
  });
});
describe("selectPullRequestFromRepo", () => {
  const baseInputs = {
    connection: conn,
    owner: "octocat",
    repo: "Hello-World",
    state: "open",
    head: undefined,
    base: undefined,
    sort: "created",
    direction: "asc",
  };
  test("returns key/label pairs", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/pulls")
      .query(true)
      .reply(200, pullsListExamplePayload.data);
    const { result } = await invokeDataSource(
      selectPullRequestFromRepo,
      baseInputs,
    );
    assertElements(result);
    expect(result.length).toBe(pullsListExamplePayload.data.length);
  });
  test("returns an empty array when the API returns no pull requests", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/pulls")
      .query(true)
      .reply(200, []);
    const { result } = await invokeDataSource(
      selectPullRequestFromRepo,
      baseInputs,
    );
    expect(result).toEqual([]);
  });
});
describe("selectUserFromOrganization", () => {
  const members = [
    selectUserFromOrganizationExamplePayload.data[0],
    {
      ...selectUserFromOrganizationExamplePayload.data[0],
      login: "hubot",
      id: 2,
    },
  ];
  test("returns key/label pairs", async () => {
    nock(BASE).get("/orgs/octocat-org/members").query(true).reply(200, members);
    const { result } = await invokeDataSource(selectUserFromOrganization, {
      connection: conn,
      organization: "octocat-org",
    });
    assertElements(result);
    expect(result).toEqual([
      { key: "hubot", label: "hubot" },
      { key: "octocat", label: "octocat" },
    ]);
  });
  test("returns an empty array when the org has no members", async () => {
    nock(BASE).get("/orgs/octocat-org/members").query(true).reply(200, []);
    const { result } = await invokeDataSource(selectUserFromOrganization, {
      connection: conn,
      organization: "octocat-org",
    });
    expect(result).toEqual([]);
  });
});
