import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createIssueNoteExamplePayload } from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { createIssueNote } from "./createIssueNote";
import { createMergeRequestNote } from "./createMergeRequestNote";
import { listIssueNotes } from "./listIssueNotes";
import { listMergeRequestNotes } from "./listMergeRequestNotes";
const exampleNote = createIssueNoteExamplePayload.data;
afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
const project = "278964";
test("List Issue Notes", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/issues/42/notes`)
    .query(true)
    .reply(200, [exampleNote]);
  const { result } = await invoke(listIssueNotes, {
    connection,
    project,
    issueIid: 42,
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  });
  expect(result?.data).toEqual([exampleNote]);
});
test("Create Issue Note sends body and internal flag", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/issues/42/notes`, {
      body: "Hello",
      internal: true,
    })
    .reply(201, exampleNote);
  const { result } = await invoke(createIssueNote, {
    connection,
    project,
    issueIid: 42,
    body: "Hello",
    internal: true,
  });
  expect(result?.data).toEqual(exampleNote);
});
test("List and Create Merge Request Notes", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/merge_requests/17/notes`)
    .query(true)
    .reply(200, [exampleNote])
    .post(`/api/v4/projects/${project}/merge_requests/17/notes`, {
      body: "LGTM",
    })
    .reply(201, exampleNote);
  expect(
    (
      await invoke(listMergeRequestNotes, {
        connection,
        project,
        mergeRequestIid: 17,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
      })
    ).result?.data,
  ).toEqual([exampleNote]);
  expect(
    (
      await invoke(createMergeRequestNote, {
        connection,
        project,
        mergeRequestIid: 17,
        body: "LGTM",
        internal: undefined,
      })
    ).result?.data,
  ).toEqual(exampleNote);
});
test("Create Merge Request Note sends the internal flag", async () => {
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/merge_requests/17/notes`, {
      body: "Internal review note",
      internal: true,
    })
    .reply(201, exampleNote);
  const { result } = await invoke(createMergeRequestNote, {
    connection,
    project,
    mergeRequestIid: 17,
    body: "Internal review note",
    internal: true,
  });
  expect(result?.data).toEqual(exampleNote);
});
describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  const paging = {
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  };
  test("List Issue Notes rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/issues/999/notes`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listIssueNotes, { connection, project, issueIid: 999, ...paging }),
    ).rejects.toThrow();
  });
  test("Create Issue Note rejects on 400", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/issues/42/notes`)
      .reply(400, { message: "400 Bad request - Note can't be blank" });
    await expect(
      invoke(createIssueNote, {
        connection,
        project,
        issueIid: 42,
        body: "Hello",
        internal: undefined,
      }),
    ).rejects.toThrow();
  });
  test("List Merge Request Notes rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/merge_requests/999/notes`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listMergeRequestNotes, {
        connection,
        project,
        mergeRequestIid: 999,
        ...paging,
      }),
    ).rejects.toThrow();
  });
  test("Create Merge Request Note rejects on 400", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/merge_requests/17/notes`)
      .reply(400, { message: "400 Bad request - Note can't be blank" });
    await expect(
      invoke(createMergeRequestNote, {
        connection,
        project,
        mergeRequestIid: 17,
        body: "LGTM",
      }),
    ).rejects.toThrow();
  });
});
