import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  createFileExamplePayload,
  getFileExamplePayload,
  getPipelineExamplePayload,
  listLabelsExamplePayload,
  listMilestonesExamplePayload,
  listPipelinesExamplePayload,
  listProjectMembersExamplePayload,
} from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { getPipeline } from "../pipelines/getPipeline";
import { listPipelines } from "../pipelines/listPipelines";
import { listLabels } from "../projectMetadata/listLabels";
import { listMilestones } from "../projectMetadata/listMilestones";
import { listProjectMembers } from "../projectMetadata/listProjectMembers";
import { createFile } from "./createFile";
import { getFile } from "./getFile";
import { updateFile } from "./updateFile";
const exampleFile = getFileExamplePayload.data;
const exampleFileCommit = createFileExamplePayload.data;
const exampleLabel = listLabelsExamplePayload.data[0];
const exampleMember = listProjectMembersExamplePayload.data[0];
const exampleMilestone = listMilestonesExamplePayload.data[0];
const examplePipeline = listPipelinesExamplePayload.data[0];
const examplePipelineDetail = getPipelineExamplePayload.data;
afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
const project = "278964";
const encodedPath = "config%2Fsettings%2Ejson";
test("Get File encodes the path including the dot", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/repository/files/${encodedPath}`)
    .query({ ref: "main" })
    .reply(200, exampleFile);
  const { result } = await invoke(getFile, {
    connection,
    project,
    filePath: encodedPath,
    ref: "main",
  });
  expect(result?.data).toEqual(exampleFile);
});
test("Create File posts and Update File puts", async () => {
  const body = {
    branch: "main",
    content: "{}",
    commit_message: "Update",
    encoding: "text",
  };
  nock(GITLAB_URL)
    .post(`/api/v4/projects/${project}/repository/files/${encodedPath}`, body)
    .reply(201, exampleFileCommit)
    .put(`/api/v4/projects/${project}/repository/files/${encodedPath}`, body)
    .reply(200, exampleFileCommit);
  const params = {
    connection,
    project,
    filePath: encodedPath,
    branch: "main",
    content: "{}",
    commitMessage: "Update",
    encoding: "text",
  };
  expect((await invoke(createFile, params)).result?.data).toEqual(
    exampleFileCommit,
  );
  expect((await invoke(updateFile, params)).result?.data).toEqual(
    exampleFileCommit,
  );
});
test("Pipelines", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/pipelines`)
    .query({ ref: "main", status: "failed" })
    .reply(200, [examplePipeline])
    .get(`/api/v4/projects/${project}/pipelines/61205`)
    .reply(200, examplePipelineDetail);
  expect(
    (
      await invoke(listPipelines, {
        connection,
        project,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        refName: "main",
        pipelineStatus: "failed",
        updatedAfter: undefined,
      })
    ).result?.data,
  ).toEqual([examplePipeline]);
  expect(
    (await invoke(getPipeline, { connection, project, pipelineId: 61205 }))
      .result?.data,
  ).toEqual(examplePipelineDetail);
});
test("Labels, Milestones, Members", async () => {
  nock(GITLAB_URL)
    .get(`/api/v4/projects/${project}/labels`)
    .query(true)
    .reply(200, [exampleLabel])
    .get(`/api/v4/projects/${project}/milestones`)
    .query({ state: "active" })
    .reply(200, [exampleMilestone])
    .get(`/api/v4/projects/${project}/members/all`)
    .query({ query: "jdoe" })
    .reply(200, [exampleMember]);
  const paging = {
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  };
  expect(
    (
      await invoke(listLabels, {
        connection,
        project,
        ...paging,
        search: undefined,
      })
    ).result?.data,
  ).toEqual([exampleLabel]);
  expect(
    (
      await invoke(listMilestones, {
        connection,
        project,
        ...paging,
        milestoneState: "active",
      })
    ).result?.data,
  ).toEqual([exampleMilestone]);
  expect(
    (
      await invoke(listProjectMembers, {
        connection,
        project,
        ...paging,
        query: "jdoe",
      })
    ).result?.data,
  ).toEqual([exampleMember]);
});
describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  const paging = {
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  };
  const writeParams = {
    connection,
    project,
    filePath: encodedPath,
    branch: "main",
    content: "{}",
    commitMessage: "Update",
    encoding: "text",
  };
  test("Get File rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/repository/files/${encodedPath}`)
      .query(true)
      .reply(404, { message: "404 File Not Found" });
    await expect(
      invoke(getFile, {
        connection,
        project,
        filePath: encodedPath,
        ref: "main",
      }),
    ).rejects.toThrow();
  });
  test("Create File rejects on 400", async () => {
    nock(GITLAB_URL)
      .post(`/api/v4/projects/${project}/repository/files/${encodedPath}`)
      .reply(400, { message: "A file with this name already exists" });
    await expect(invoke(createFile, writeParams)).rejects.toThrow();
  });
  test("Update File rejects on 400", async () => {
    nock(GITLAB_URL)
      .put(`/api/v4/projects/${project}/repository/files/${encodedPath}`)
      .reply(400, { message: "A file with this name doesn't exist" });
    await expect(invoke(updateFile, writeParams)).rejects.toThrow();
  });
  test("List Pipelines rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/pipelines`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listPipelines, {
        connection,
        project,
        ...paging,
        refName: undefined,
        pipelineStatus: undefined,
        updatedAfter: undefined,
      }),
    ).rejects.toThrow();
  });
  test("Get Pipeline rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/pipelines/1`)
      .reply(404, notFound);
    await expect(
      invoke(getPipeline, { connection, project, pipelineId: 1 }),
    ).rejects.toThrow();
  });
  test("List Labels rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/labels`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listLabels, { connection, project, ...paging, search: undefined }),
    ).rejects.toThrow();
  });
  test("List Milestones rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/milestones`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listMilestones, {
        connection,
        project,
        ...paging,
        milestoneState: undefined,
      }),
    ).rejects.toThrow();
  });
  test("List Project Members rejects on 404", async () => {
    nock(GITLAB_URL)
      .get(`/api/v4/projects/${project}/members/all`)
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(listProjectMembers, {
        connection,
        project,
        ...paging,
        query: undefined,
      }),
    ).rejects.toThrow();
  });
});
