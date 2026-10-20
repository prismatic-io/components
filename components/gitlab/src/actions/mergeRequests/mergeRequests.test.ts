import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getMergeRequestExamplePayload,
  updateMergeRequestExamplePayload,
} from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { acceptMergeRequest } from "./acceptMergeRequest";
import { createMergeRequest } from "./createMergeRequest";
import { getMergeRequest } from "./getMergeRequest";
import { listMergeRequests } from "./listMergeRequests";
import { updateMergeRequest } from "./updateMergeRequest";
const exampleMergeRequest = getMergeRequestExamplePayload.data;
afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
const project = "278964";
test("List Merge Requests maps state and branch filters", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/merge_requests`)
    .query({ state: "merged", target_branch: "main" })
    .reply(200, [exampleMergeRequest]);
  const { result } = await invoke(listMergeRequests, {
    connection,
    project,
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
    mergeRequestState: "merged",
    sourceBranch: undefined,
    targetBranch: "main",
    labels: undefined,
    search: undefined,
    updatedAfter: undefined,
  });
  expect(result?.data).toEqual([exampleMergeRequest]);
});
test("Get Merge Request uses the IID route", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/merge_requests/17`)
    .reply(200, exampleMergeRequest);
  const { result } = await invoke(getMergeRequest, {
    connection,
    project,
    mergeRequestIid: 17,
  });
  expect(result?.data).toEqual(exampleMergeRequest);
});
test("Create Merge Request sends branches and title", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/merge_requests`, {
      source_branch: "feature/ach-retry",
      target_branch: "main",
      title: "CU-86b1x2 Retry failed ACH settlements",
      remove_source_branch: true,
    })
    .reply(201, exampleMergeRequest);
  const { result } = await invoke(createMergeRequest, {
    connection,
    project,
    sourceBranch: "feature/ach-retry",
    targetBranch: "main",
    title: "CU-86b1x2 Retry failed ACH settlements",
    labels: undefined,
    assigneeIds: undefined,
    additionalFields: {
      description: undefined,
      removeSourceBranch: true,
      squash: undefined,
    },
  });
  expect(result?.data).toEqual(exampleMergeRequest);
});
test("Update Merge Request sends only provided fields", async () => {
  nock(GITLAB_URL)
    .put(`/api/v4/projects/${project}/merge_requests/17`, {
      state_event: "close",
    })
    .reply(200, { ...exampleMergeRequest, state: "closed" });
  const { result } = await invoke(updateMergeRequest, {
    connection,
    project,
    mergeRequestIid: 17,
    labels: undefined,
    assigneeIds: undefined,
    targetBranch: undefined,
    additionalFields: {
      title: undefined,
      description: undefined,
      stateEvent: "close",
    },
  });
  expect(
    (
      result?.data as {
        state: string;
      }
    ).state,
  ).toBe("closed");
});
test("Update Merge Request maps every field to the GitLab body and returns the updated merge request", async () => {
  const scope = nock(GITLAB_URL)
    .put(`/api/v4/projects/${project}/merge_requests/17`, {
      title: updateMergeRequestExamplePayload.data.title,
      description: "Retries ACH settlements that failed with a timeout.",
      labels: "backend,payments",
      assignee_ids: [1001, 1002],
      target_branch: "release/2026.10",
      state_event: "reopen",
    })
    .reply(200, updateMergeRequestExamplePayload.data);
  const { result } = await invoke(updateMergeRequest, {
    connection,
    project,
    mergeRequestIid: 17,
    labels: "backend,payments",
    assigneeIds: [1001, 1002],
    targetBranch: "release/2026.10",
    additionalFields: {
      title: updateMergeRequestExamplePayload.data.title,
      description: "Retries ACH settlements that failed with a timeout.",
      stateEvent: "reopen",
    },
  });
  expect(scope.isDone()).toBe(true);
  expect(result).toEqual(updateMergeRequestExamplePayload);
});
test("Update Merge Request rejects an update with every field empty", async () => {
  await expect(
    invoke(updateMergeRequest, {
      connection,
      project,
      mergeRequestIid: 17,
      labels: undefined,
      assigneeIds: undefined,
      targetBranch: undefined,
      additionalFields: undefined,
    }),
  ).rejects.toThrow(/at least one field to update/);
});
test("Accept Merge Request calls the merge route with the guard SHA", async () => {
  nock(GITLAB_URL)
    .put(`/api/v4/projects/${project}/merge_requests/17/merge`, {
      sha: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
      squash: false,
    })
    .reply(200, { ...exampleMergeRequest, state: "merged" });
  const { result } = await invoke(acceptMergeRequest, {
    connection,
    project,
    mergeRequestIid: 17,
    mergeOptions: {
      mergeCommitMessage: undefined,
      squash: false,
      shouldRemoveSourceBranch: undefined,
      sha: "8d2f5c7a9b1e3f4d6c8a0b2e4f6a8c0d2e4f6a8c",
    },
  });
  expect(
    (
      result?.data as {
        state: string;
      }
    ).state,
  ).toBe("merged");
});
describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  test("List Merge Requests rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/merge_requests`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listMergeRequests, {
        connection,
        project,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        mergeRequestState: undefined,
        sourceBranch: undefined,
        targetBranch: undefined,
        labels: undefined,
        search: undefined,
        updatedAfter: undefined,
      }),
    ).rejects.toThrow();
  });
  test("Get Merge Request rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/merge_requests/999`)
      .reply(404, notFound);
    await expect(
      invoke(getMergeRequest, { connection, project, mergeRequestIid: 999 }),
    ).rejects.toThrow();
  });
  test("Create Merge Request rejects on 409", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/merge_requests`)
      .reply(409, {
        message: [
          "Another open merge request already exists for this source branch",
        ],
      });
    await expect(
      invoke(createMergeRequest, {
        connection,
        project,
        sourceBranch: "feature/ach-retry",
        targetBranch: "main",
        title: "CU-86b1x2 Retry failed ACH settlements",
        labels: undefined,
        assigneeIds: undefined,
        additionalFields: undefined,
      }),
    ).rejects.toThrow();
  });
  test("Update Merge Request rejects on 422", async () => {
    nock(GITLAB_URL)
      .put(`/api/v4/projects/${project}/merge_requests/17`)
      .reply(422, { message: "Unprocessable Entity" });
    await expect(
      invoke(updateMergeRequest, {
        connection,
        project,
        mergeRequestIid: 17,
        labels: undefined,
        assigneeIds: undefined,
        targetBranch: undefined,
        additionalFields: { stateEvent: "close" },
      }),
    ).rejects.toThrow();
  });
  test("Accept Merge Request rejects on 409 SHA mismatch", async () => {
    nock(GITLAB_URL)
      .put(`/api/v4/projects/${project}/merge_requests/17/merge`)
      .reply(409, { message: "SHA does not match HEAD of source branch" });
    await expect(
      invoke(acceptMergeRequest, {
        connection,
        project,
        mergeRequestIid: 17,
        mergeOptions: {
          sha: "0000000000000000000000000000000000000000",
        },
      }),
    ).rejects.toThrow();
  });
});
