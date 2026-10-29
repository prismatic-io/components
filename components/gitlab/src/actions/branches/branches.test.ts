import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { BRANCH_DELETED_MESSAGE } from "../../constants";
import {
  getBranchExamplePayload,
  getCommitExamplePayload,
  listCommitsExamplePayload,
} from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { toPathSegment } from "../../utils";
import { getCommit } from "../commits/getCommit";
import { listCommits } from "../commits/listCommits";
import { createBranch } from "./createBranch";
import { deleteBranch } from "./deleteBranch";
import { getBranch } from "./getBranch";
import { listBranches } from "./listBranches";

const exampleBranch = getBranchExamplePayload.data;
const exampleCommit = listCommitsExamplePayload.data[0];
const exampleCommitDetail = getCommitExamplePayload.data;

afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
const project = "278964";

test("Get Branch encodes slashes and dots so .json-like names are not format suffixes", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/repository/branches/release%2F1%2E2`)
    .reply(200, exampleBranch);
  const { result } = await invoke(getBranch, {
    connection,
    project,
    branch: toPathSegment("release/1.2"),
  });
  expect(result?.data).toEqual(exampleBranch);
});

test("Create Branch sends branch and ref as query parameters", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/repository/branches`)
    .query({ branch: "feature/CU-86b1x2-ach-retry", ref: "main" })
    .reply(201, exampleBranch);
  const { result } = await invoke(createBranch, {
    connection,
    project,
    newBranch: "feature/CU-86b1x2-ach-retry",
    ref: "main",
  });
  expect(result?.data).toEqual(exampleBranch);
});

test("List Branches and Delete Branch", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/repository/branches`)
    .query({ search: "feature" })
    .reply(200, [exampleBranch])
    .delete(
      `/api/v4/projects/${project}/repository/branches/feature%2Fach-retry`,
    )
    .reply(204);
  expect(
    (
      await invoke(listBranches, {
        connection,
        project,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        search: "feature",
      })
    ).result?.data,
  ).toEqual([exampleBranch]);
  expect(
    (
      await invoke(deleteBranch, {
        connection,
        project,
        branch: "feature%2Fach-retry",
      })
    ).result?.data,
  ).toEqual({ success: true, message: BRANCH_DELETED_MESSAGE });
});

test("List Commits and Get Commit", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/repository/commits`)
    .query({ ref_name: "main", since: "2026-09-01T00:00:00.000Z" })
    .reply(200, [exampleCommit])
    .get(`/api/v4/projects/${project}/repository/commits/8d2f5c7a`)
    .query({ stats: "true" })
    .reply(200, exampleCommitDetail);
  expect(
    (
      await invoke(listCommits, {
        connection,
        project,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        refName: "main",
        since: "2026-09-01T00:00:00.000Z",
        until: undefined,
        path: undefined,
      })
    ).result?.data,
  ).toEqual([exampleCommit]);
  expect(
    (await invoke(getCommit, { connection, project, commitSha: "8d2f5c7a" }))
      .result?.data,
  ).toEqual(exampleCommitDetail);
});

describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  const paging = {
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  };

  test("Get Branch rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/repository/branches/missing`)
      .reply(404, notFound);
    await expect(
      invoke(getBranch, { connection, project, branch: "missing" }),
    ).rejects.toThrow();
  });

  test("Create Branch rejects on 400", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/repository/branches`)
      .query(true)
      .reply(400, { message: "Branch already exists" });
    await expect(
      invoke(createBranch, {
        connection,
        project,
        newBranch: "main",
        ref: "main",
      }),
    ).rejects.toThrow();
  });

  test("List Branches rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/repository/branches`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listBranches, {
        connection,
        project,
        ...paging,
        search: undefined,
      }),
    ).rejects.toThrow();
  });

  test("Delete Branch rejects on 400", async () => {
    nock(GITLAB_URL)
      .delete(`/api/v4/projects/${project}/repository/branches/main`)
      .reply(400, { message: "Cannot remove the default branch" });
    await expect(
      invoke(deleteBranch, { connection, project, branch: "main" }),
    ).rejects.toThrow();
  });

  test("List Commits rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/repository/commits`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listCommits, {
        connection,
        project,
        ...paging,
        refName: undefined,
        since: undefined,
        until: undefined,
        path: undefined,
      }),
    ).rejects.toThrow();
  });

  test("Get Commit rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/repository/commits/deadbeef`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(getCommit, { connection, project, commitSha: "deadbeef" }),
    ).rejects.toThrow();
  });
});
