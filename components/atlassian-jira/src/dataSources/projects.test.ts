import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listProjectsExamplePayload } from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import projects from "./projects";

const { selectProject, selectProjects } = projects;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const [exampleProject, anotherProject] = listProjectsExamplePayload.data;

const mockTwoPages = () =>
  jiraApi()
    .get("/rest/api/3/project/search")
    .query({ startAt: "0" })
    .reply(200, {
      startAt: 0,
      maxResults: 1,
      isLast: false,
      values: [exampleProject],
    })
    .get("/rest/api/3/project/search")
    .query({ startAt: "1" })
    .reply(200, {
      startAt: 1,
      maxResults: 1,
      isLast: true,
      values: [anotherProject],
    });

const mockEmpty = () =>
  jiraApi()
    .get("/rest/api/3/project/search")
    .query({ startAt: "0" })
    .reply(200, { startAt: 0, maxResults: 50, isLast: true, values: [] });

describe("selectProject", () => {
  test("reads every page and returns label-sorted key/label elements", async () => {
    const scope = mockTwoPages();

    const { result } = await invokeDataSource(selectProject, {
      connection: basicConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "ABC - Another Project", key: "10001" },
      { label: "EX - Example Project", key: "10000" },
    ]);
  });

  test("returns an empty list when there are no projects", async () => {
    mockEmpty();

    const { result } = await invokeDataSource(selectProject, {
      connection: basicConnection(),
    });

    expect(result).toEqual([]);
  });
});

describe("selectProjects", () => {
  test("wraps each project element as an object selection", async () => {
    const scope = mockTwoPages();

    const { result } = await invokeDataSource(selectProjects, {
      connection: basicConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { object: { label: "ABC - Another Project", key: "10001" } },
      { object: { label: "EX - Example Project", key: "10000" } },
    ]);
  });

  test("returns an empty list when there are no projects", async () => {
    mockEmpty();

    const { result } = await invokeDataSource(selectProjects, {
      connection: basicConnection(),
    });

    expect(result).toEqual([]);
  });
});
