import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import {
  gitCreateBlobExamplePayload,
  gitCreateRefExamplePayload,
  gitCreateTreeExamplePayload,
  gitGetRefExamplePayload,
  issuesCreateCommentExamplePayload,
  issuesListCommentsExamplePayload,
  issuesListForRepoExamplePayload,
  pullsCreateExamplePayload,
  pullsListExamplePayload,
} from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const {
  actionsCreateWorkflowDispatch,
  gitCreateBlob,
  gitCreateRef,
  gitCreateTree,
  gitGetRef,
  issuesCreateComment,
  issuesListComments,
  issuesListForRepo,
  pullsCreate,
  pullsList,
} = actions;
afterEach(() => nock.cleanAll());
describe("actionsCreateWorkflowDispatch", () => {
  test("happy path returns the (empty) response body", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/actions/workflows/main.yml/dispatches")
      .reply(204);
    const { result } = await invoke(actionsCreateWorkflowDispatch, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      workflowId: "main.yml",
      ref: "main",
      inputs: undefined,
    });
    expect(result.data).toBe("");
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/actions/workflows/main.yml/dispatches")
      .reply(422, { message: "Unprocessable" });
    await expect(
      invoke(actionsCreateWorkflowDispatch, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        workflowId: "main.yml",
        ref: "main",
        inputs: undefined,
      }),
    ).rejects.toThrow();
  });
});
describe("gitCreateBlob", () => {
  test("happy path returns the created blob", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/blobs")
      .reply(201, gitCreateBlobExamplePayload.data);
    const { result } = await invoke(gitCreateBlob, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      content: "hello",
      encoding: "utf-8",
    });
    expect(result.data).toEqual(gitCreateBlobExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/blobs")
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(gitCreateBlob, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        content: "hello",
        encoding: "utf-8",
      }),
    ).rejects.toThrow();
  });
});
describe("gitCreateRef", () => {
  test("happy path returns the created ref", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/refs")
      .reply(201, gitCreateRefExamplePayload.data);
    const { result } = await invoke(gitCreateRef, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      ref: "refs/heads/feature-branch",
      sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
      key: undefined,
    });
    expect(result.data).toEqual(gitCreateRefExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/refs")
      .reply(422, { message: "Reference already exists" });
    await expect(
      invoke(gitCreateRef, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        ref: "refs/heads/feature-branch",
        sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
        key: undefined,
      }),
    ).rejects.toThrow();
  });
});
describe("gitCreateTree", () => {
  test("happy path returns the created tree", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/trees")
      .reply(201, gitCreateTreeExamplePayload.data);
    const { result } = await invoke(gitCreateTree, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      tree: [{ path: "test.txt", mode: "100644", content: "This is a test" }],
      baseTree: undefined,
    });
    expect(result.data).toEqual(gitCreateTreeExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/git/trees")
      .reply(422, { message: "Invalid tree" });
    await expect(
      invoke(gitCreateTree, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        tree: [{ path: "test.txt", mode: "100644", content: "This is a test" }],
        baseTree: undefined,
      }),
    ).rejects.toThrow();
  });
});
describe("gitGetRef", () => {
  test("happy path returns the ref", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/git/ref/heads/main")
      .reply(200, gitGetRefExamplePayload.data);
    const { result } = await invoke(gitGetRef, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      ref: "heads/main",
    });
    expect(result.data).toEqual(gitGetRefExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/git/ref/heads/missing")
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(gitGetRef, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        ref: "heads/missing",
      }),
    ).rejects.toThrow();
  });
});
describe("issuesListForRepo", () => {
  test("happy path returns a single page of issues", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(200, issuesListForRepoExamplePayload.data);
    const { result } = await invoke(issuesListForRepo, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      fetchAll: false,
      milestone: undefined,
      state: "open",
      assignee: undefined,
      creator: undefined,
      mentioned: undefined,
      labels: undefined,
      sort: "created",
      direction: "asc",
      since: undefined,
      pagination: { page: 1, perPage: 30 },
    });
    expect(result.data).toEqual(issuesListForRepoExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues")
      .query(true)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(issuesListForRepo, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        fetchAll: false,
        milestone: undefined,
        state: "open",
        assignee: undefined,
        creator: undefined,
        mentioned: undefined,
        labels: undefined,
        sort: "created",
        direction: "asc",
        since: undefined,
        pagination: { page: 1, perPage: 30 },
      }),
    ).rejects.toThrow();
  });
});
describe("issuesListComments", () => {
  test("happy path returns comments", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues/1347/comments")
      .query(true)
      .reply(200, issuesListCommentsExamplePayload.data);
    const { result } = await invoke(issuesListComments, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      issueNumber: 1347,
      since: undefined,
      pagination: { page: 1, perPage: 30 },
    });
    expect(result.data).toEqual(issuesListCommentsExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/issues/1347/comments")
      .query(true)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(issuesListComments, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        issueNumber: 1347,
        since: undefined,
        pagination: { page: 1, perPage: 30 },
      }),
    ).rejects.toThrow();
  });
});
describe("issuesCreateComment", () => {
  test("happy path returns the created comment", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/issues/1347/comments")
      .reply(201, issuesCreateCommentExamplePayload.data);
    const { result } = await invoke(issuesCreateComment, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      issueNumber: 1347,
      body: "Nice work",
    });
    expect(result.data).toEqual(issuesCreateCommentExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/issues/1347/comments")
      .reply(422, { message: "Validation failed" });
    await expect(
      invoke(issuesCreateComment, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        issueNumber: 1347,
        body: "Nice work",
      }),
    ).rejects.toThrow();
  });
});
describe("pullsList", () => {
  test("happy path returns pull requests", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/pulls")
      .query(true)
      .reply(200, pullsListExamplePayload.data);
    const { result } = await invoke(pullsList, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      state: "open",
      head: undefined,
      base: undefined,
      sort: "created",
      direction: undefined,
      pagination: { page: 1, perPage: 30 },
    });
    expect(result.data).toEqual(pullsListExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/repos/octocat/Hello-World/pulls")
      .query(true)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(pullsList, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        state: "open",
        head: undefined,
        base: undefined,
        sort: "created",
        direction: undefined,
        pagination: { page: 1, perPage: 30 },
      }),
    ).rejects.toThrow();
  });
});
describe("pullsCreate", () => {
  test("happy path returns the created pull request", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/pulls")
      .reply(201, pullsCreateExamplePayload.data);
    const { result } = await invoke(pullsCreate, {
      connection: conn,
      owner: "octocat",
      repo: "Hello-World",
      title: "Amazing new feature",
      head: "feature-branch",
      base: "main",
      body: "Please pull these changes",
      maintainerCanModify: undefined,
      draft: undefined,
      issueNumber: 1347,
    });
    expect(result.data).toEqual(pullsCreateExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .post("/repos/octocat/Hello-World/pulls")
      .reply(422, { message: "Validation failed" });
    await expect(
      invoke(pullsCreate, {
        connection: conn,
        owner: "octocat",
        repo: "Hello-World",
        title: "Amazing new feature",
        head: "feature-branch",
        base: "main",
        body: "Please pull these changes",
        maintainerCanModify: undefined,
        draft: undefined,
        issueNumber: 1347,
      }),
    ).rejects.toThrow();
  });
});
