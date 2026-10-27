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
  reposListForOrgExamplePayload,
  selectIssueForAuthenticatedUserExamplePayload,
  selectOrganizationsForAuthenticatedUserExamplePayload,
  selectPullRequestFromRepoExamplePayload,
  selectUserFromOrganizationExamplePayload,
} from "./examplePayloads";
const BASE = "https://api.github.com";
const exampleRepository = reposListForOrgExamplePayload.data[0];
const exampleUser = exampleRepository.owner;
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
      ...exampleRepository,
      name: "zeta-repo",
    },
    {
      ...exampleRepository,
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
    exampleUser,
    {
      ...exampleUser,
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
describe("examplePayload matches perform output", () => {
  const repoInputs = { owner: "octocat", repo: "Hello-World" };
  test.each([
    {
      name: "listReposForAuthenticatedUser",
      path: "/user/repos",
      reply: [exampleRepository],
      examplePayload: listReposForAuthenticatedUser.examplePayload,
      run: () =>
        invokeDataSource(listReposForAuthenticatedUser, { connection: conn }),
      expected: listReposForAuthenticatedUserExamplePayload,
    },
    {
      name: "selectOrganizationsForAuthenticatedUser",
      path: "/user/orgs",
      reply: orgsListForAuthenticatedUserExamplePayload.data,
      examplePayload: selectOrganizationsForAuthenticatedUser.examplePayload,
      run: () =>
        invokeDataSource(selectOrganizationsForAuthenticatedUser, {
          connection: conn,
        }),
      expected: selectOrganizationsForAuthenticatedUserExamplePayload,
    },
    {
      name: "selectIssueForAuthenticatedUser",
      path: "/repos/octocat/Hello-World/issues",
      reply: issuesListForRepoExamplePayload.data,
      examplePayload: selectIssueForAuthenticatedUser.examplePayload,
      run: () =>
        invokeDataSource(selectIssueForAuthenticatedUser, {
          connection: conn,
          ...repoInputs,
          state: "open",
          assignee: undefined,
          labels: undefined,
          sort: "created",
          direction: "asc",
          since: undefined,
        }),
      expected: selectIssueForAuthenticatedUserExamplePayload,
    },
    {
      name: "selectPullRequestFromRepo",
      path: "/repos/octocat/Hello-World/pulls",
      reply: pullsListExamplePayload.data,
      examplePayload: selectPullRequestFromRepo.examplePayload,
      run: () =>
        invokeDataSource(selectPullRequestFromRepo, {
          connection: conn,
          ...repoInputs,
          state: "open",
          head: undefined,
          base: undefined,
          sort: "created",
          direction: "asc",
        }),
      expected: selectPullRequestFromRepoExamplePayload,
    },
    {
      name: "selectUserFromOrganization",
      path: "/orgs/octocat-org/members",
      reply: [exampleUser],
      examplePayload: selectUserFromOrganization.examplePayload,
      run: () =>
        invokeDataSource(selectUserFromOrganization, {
          connection: conn,
          organization: "octocat-org",
        }),
      expected: selectUserFromOrganizationExamplePayload,
    },
  ])("$name", async ({ path, reply, examplePayload, run, expected }) => {
    nock(BASE).get(path).query(true).reply(200, reply);
    const { result } = await run();
    expect(result).toEqual(expected.result);
    expect(examplePayload).toBe(expected);
  });
});
