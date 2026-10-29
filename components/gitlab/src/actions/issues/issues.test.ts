import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { ISSUE_DELETED_MESSAGE } from "../../constants";
import { getIssueExamplePayload } from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { createIssue } from "./createIssue";
import { deleteIssue } from "./deleteIssue";
import { getIssue } from "./getIssue";
import { listIssues } from "./listIssues";
import { updateIssue } from "./updateIssue";

const exampleIssue = getIssueExamplePayload.data;

afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
const project = "278964";

test("List Issues maps filters to GitLab parameters", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/issues`)
    .query({
      state: "opened",
      labels: "bug,backend",
      updated_after: "2026-09-01T00:00:00.000Z",
    })
    .reply(200, [exampleIssue]);
  const { result } = await invoke(listIssues, {
    connection,
    project,
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
    issueState: "opened",
    labels: "bug,backend",
    search: undefined,
    updatedAfter: "2026-09-01T00:00:00.000Z",
  });
  expect(result?.data).toEqual([exampleIssue]);
});

test("Get Issue uses the IID route", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/issues/42`)
    .reply(200, exampleIssue);
  const { result } = await invoke(getIssue, {
    connection,
    project,
    issueIid: 42,
  });
  expect(result?.data).toEqual(exampleIssue);
});

test("Create Issue sends only provided fields", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/issues`, {
      title: "Retry failed ACH settlements",
      labels: "bug",
      assignee_ids: [1001],
    })
    .reply(201, exampleIssue);
  const { result } = await invoke(createIssue, {
    connection,
    project,
    title: "Retry failed ACH settlements",
    labels: "bug",
    assigneeIds: [1001],
    milestoneId: undefined,
    additionalFields: {
      description: undefined,
      dueDate: undefined,
      confidential: undefined,
    },
  });
  expect(result?.data).toEqual(exampleIssue);
});

test("Update Issue closes via state_event and leaves unset fields out", async () => {
  nock(GITLAB_URL)
    .put(`/api/v4/projects/${project}/issues/42`, { state_event: "close" })
    .reply(200, { ...exampleIssue, state: "closed" });
  const { result } = await invoke(updateIssue, {
    connection,
    project,
    issueIid: 42,
    labels: undefined,
    assigneeIds: undefined,
    milestoneId: undefined,
    additionalFields: {
      title: undefined,
      description: undefined,
      dueDate: undefined,
      stateEvent: "close",
      confidential: undefined,
    },
  });
  expect((result?.data as { state: string }).state).toBe("closed");
});

test("Delete Issue returns a success message", async () => {
  nock(GITLAB_URL).delete(`/api/v4/projects/${project}/issues/42`).reply(204);
  const { result } = await invoke(deleteIssue, {
    connection,
    project,
    issueIid: 42,
  });
  expect(result?.data).toEqual({
    success: true,
    message: ISSUE_DELETED_MESSAGE,
  });
});

describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  const issueFields = {
    labels: undefined,
    assigneeIds: undefined,
    milestoneId: undefined,
  };

  test("List Issues rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/issues`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listIssues, {
        connection,
        project,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        issueState: undefined,
        labels: undefined,
        search: undefined,
        updatedAfter: undefined,
      }),
    ).rejects.toThrow();
  });

  test("Get Issue rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/issues/999`)
      .reply(404, notFound);
    await expect(
      invoke(getIssue, { connection, project, issueIid: 999 }),
    ).rejects.toThrow();
  });

  test("Create Issue rejects on 400", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/issues`)
      .reply(400, { message: { title: ["can't be blank"] } });
    await expect(
      invoke(createIssue, {
        connection,
        project,
        ...issueFields,
        title: "Retry failed ACH settlements",
        additionalFields: undefined,
      }),
    ).rejects.toThrow();
  });

  test("Update Issue rejects on 422", async () => {
    nock(GITLAB_URL)
      .put(`/api/v4/projects/${project}/issues/42`)
      .reply(422, { message: "Unprocessable Entity" });
    await expect(
      invoke(updateIssue, {
        connection,
        project,
        issueIid: 42,
        ...issueFields,
        additionalFields: { stateEvent: "close" },
      }),
    ).rejects.toThrow();
  });

  test("Delete Issue rejects on 403", async () => {
    nock(GITLAB_URL)
      .delete(`/api/v4/projects/${project}/issues/42`)
      .reply(403, { message: "403 Forbidden" });
    await expect(
      invoke(deleteIssue, { connection, project, issueIid: 42 }),
    ).rejects.toThrow();
  });
});

test("Create Issue sends the additional fields", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/issues`, {
      title: "Retry failed ACH settlements",
      description: "Retries transient failures.",
      due_date: "2026-10-15",
      confidential: true,
    })
    .reply(201, exampleIssue);
  const { result } = await invoke(createIssue, {
    connection,
    project,
    title: "Retry failed ACH settlements",
    labels: undefined,
    assigneeIds: undefined,
    milestoneId: undefined,
    additionalFields: {
      description: "Retries transient failures.",
      dueDate: "2026-10-15",
      confidential: true,
    },
  });
  expect(result?.data).toEqual(exampleIssue);
});

test("Update Issue rejects an update with every field empty", async () => {
  await expect(
    invoke(updateIssue, {
      connection,
      project,
      issueIid: 42,
      labels: undefined,
      assigneeIds: undefined,
      milestoneId: undefined,
      additionalFields: undefined,
    }),
  ).rejects.toThrow(/at least one field to update/);
});
