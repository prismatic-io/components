import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getCurrentUserExamplePayload,
  getProjectExamplePayload,
  listGroupsExamplePayload,
  listUsersExamplePayload,
} from "../../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { getGroup } from "../groups/getGroup";
import { listGroups } from "../groups/listGroups";
import { getCurrentUser } from "../users/getCurrentUser";
import { listUsers } from "../users/listUsers";
import { getProject } from "./getProject";
import { listProjects } from "./listProjects";
const exampleGroup = listGroupsExamplePayload.data[0];
const exampleProject = getProjectExamplePayload.data;
const exampleUser = listUsersExamplePayload.data[0];
afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;
test("List Projects filters by membership and search", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects")
    .query({ membership: "true", search: "pay", per_page: "20" })
    .reply(200, [exampleProject]);
  const { result } = await invoke(listProjects, {
    connection,
    fetchAll: false,
    pagination: { perPage: 20, page: undefined },
    membership: true,
    search: "pay",
  });
  expect(result?.data).toEqual([exampleProject]);
});
test("Get Project accepts an encoded path", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/acme%2Fpayments-service")
    .reply(200, exampleProject);
  const { result } = await invoke(getProject, {
    connection,
    project: "acme%2Fpayments-service",
  });
  expect(result?.data).toEqual(exampleProject);
});
test("List Groups and Get Group", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/groups")
    .query(true)
    .reply(200, [exampleGroup])
    .get("/api/v4/groups/acme")
    .query({ with_projects: "false" })
    .reply(200, exampleGroup);
  expect(
    (
      await invoke(listGroups, {
        connection,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        search: undefined,
      })
    ).result?.data,
  ).toEqual([exampleGroup]);
  expect(
    (await invoke(getGroup, { connection, group: "acme" })).result?.data,
  ).toEqual(exampleGroup);
});
test("Get Current User and List Users", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/user")
    .reply(200, getCurrentUserExamplePayload.data)
    .get("/api/v4/users")
    .query({ username: "jdoe" })
    .reply(200, [exampleUser]);
  expect((await invoke(getCurrentUser, { connection })).result?.data).toEqual(
    getCurrentUserExamplePayload.data,
  );
  expect(
    (
      await invoke(listUsers, {
        connection,
        fetchAll: false,
        pagination: { perPage: 0, page: undefined },
        search: undefined,
        username: "jdoe",
      })
    ).result?.data,
  ).toEqual([exampleUser]);
});
describe("error paths", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  const notFound = { message: "404 Not Found" };
  const paging = {
    fetchAll: false,
    pagination: { perPage: 0, page: undefined },
  };
  test("List Projects rejects on 404", async () => {
    nock(GITLAB_URL).get("/api/v4/projects").query(true).reply(404, notFound);
    await expect(
      invoke(listProjects, {
        connection,
        ...paging,
        membership: undefined,
        search: undefined,
      }),
    ).rejects.toThrow();
  });
  test("Get Project rejects on 404", async () => {
    nock(GITLAB_URL).get("/api/v4/projects/999").reply(404, notFound);
    await expect(
      invoke(getProject, { connection, project: "999" }),
    ).rejects.toThrow();
  });
  test("List Groups rejects on 404", async () => {
    nock(GITLAB_URL).get("/api/v4/groups").query(true).reply(404, notFound);
    await expect(
      invoke(listGroups, { connection, ...paging, search: undefined }),
    ).rejects.toThrow();
  });
  test("Get Group rejects on 404", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/groups/missing")
      .query(true)
      .reply(404, notFound);
    await expect(
      invoke(getGroup, { connection, group: "missing" }),
    ).rejects.toThrow();
  });
  test("Get Current User rejects on 404", async () => {
    nock(GITLAB_URL).get("/api/v4/user").reply(404, notFound);
    await expect(invoke(getCurrentUser, { connection })).rejects.toThrow();
  });
  test("List Users rejects on 404", async () => {
    nock(GITLAB_URL).get("/api/v4/users").query(true).reply(404, notFound);
    await expect(
      invoke(listUsers, {
        connection,
        ...paging,
        search: undefined,
        username: undefined,
      }),
    ).rejects.toThrow();
  });
});
