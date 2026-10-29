import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getBranchExamplePayload,
  getGroupExamplePayload,
  getProjectExamplePayload,
  listLabelsExamplePayload,
  listMilestonesExamplePayload,
  listProjectMembersExamplePayload,
} from "../examplePayloads";
import { accessTokenConnection, GITLAB_URL } from "../testHelpers";
import { selectBranch } from "./selectBranch";
import { selectGroup } from "./selectGroup";
import { selectLabel } from "./selectLabel";
import { selectMilestone } from "./selectMilestone";
import { selectProject } from "./selectProject";
import { selectUser } from "./selectUser";

const exampleBranch = getBranchExamplePayload.data;
const exampleGroup = getGroupExamplePayload.data;
const exampleLabel = listLabelsExamplePayload.data[0];
const exampleMember = listProjectMembersExamplePayload.data[0];
const exampleMilestone = listMilestonesExamplePayload.data[0];
const exampleProject = getProjectExamplePayload.data;

afterEach(() => nock.cleanAll());
const connection = accessTokenConnection;

test("Select Project walks keyset pages and sorts by path", async () => {
  const second = {
    ...exampleProject,
    id: 1,
    path_with_namespace: "acme/admin-portal",
  };
  nock(GITLAB_URL)
    .get("/api/v4/projects")
    .query({
      membership: "true",
      simple: "true",
      order_by: "id",
      sort: "asc",
      pagination: "keyset",
      per_page: "100",
    })
    .reply(200, [exampleProject], {
      link: `<${GITLAB_URL}/api/v4/projects?id_after=278964&membership=true&order_by=id&pagination=keyset&per_page=100&simple=true&sort=asc>; rel="next"`,
    })
    .get("/api/v4/projects")
    .query({
      id_after: "278964",
      membership: "true",
      simple: "true",
      order_by: "id",
      sort: "asc",
      pagination: "keyset",
      per_page: "100",
    })
    .reply(200, [second]);
  const { result } = await invokeDataSource(selectProject, { connection });
  expect(result).toEqual([
    { label: "acme/admin-portal", key: "1" },
    { label: "acme/payments-service", key: "278964" },
  ]);
});

test("Select Group lists groups by full path", async () => {
  nock(GITLAB_URL).get("/api/v4/groups").query(true).reply(200, [exampleGroup]);
  const { result } = await invokeDataSource(selectGroup, { connection });
  expect(result).toEqual([{ label: "acme", key: "7412" }]);
});

test("Select Label keys by name", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/labels")
    .query(true)
    .reply(200, [exampleLabel]);
  const { result } = await invokeDataSource(selectLabel, {
    connection,
    project: "278964",
  });
  expect(result).toEqual([{ label: "bug", key: "bug" }]);
});

test("Select Milestone lists active milestones keyed by global ID", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/milestones")
    .query({ state: "active", per_page: "100", page: "1" })
    .reply(200, [exampleMilestone]);
  const { result } = await invokeDataSource(selectMilestone, {
    connection,
    project: "278964",
  });
  expect(result).toEqual([{ label: "Q4 Release", key: "55120" }]);
});

test("Select User lists project members including inherited", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/members/all")
    .query(true)
    .reply(200, [exampleMember]);
  const { result } = await invokeDataSource(selectUser, {
    connection,
    project: "278964",
  });
  expect(result).toEqual([{ label: "Jane Doe (@jdoe)", key: "1001" }]);
});

test("Select Branch keys by branch name", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/278964/repository/branches")
    .query(true)
    .reply(200, [exampleBranch]);
  const { result } = await invokeDataSource(selectBranch, {
    connection,
    project: "278964",
  });
  expect(result).toEqual([
    { label: "feature/ach-retry", key: "feature/ach-retry" },
  ]);
});

describe("empty results", () => {
  afterEach(() => expect(nock.isDone()).toBe(true));
  test.each([
    ["Select Project", selectProject, "/api/v4/projects", {}],
    ["Select Group", selectGroup, "/api/v4/groups", {}],
    [
      "Select Label",
      selectLabel,
      "/api/v4/projects/278964/labels",
      { project: "278964" },
    ],
    [
      "Select Milestone",
      selectMilestone,
      "/api/v4/projects/278964/milestones",
      { project: "278964" },
    ],
    [
      "Select User",
      selectUser,
      "/api/v4/projects/278964/members/all",
      { project: "278964" },
    ],
    [
      "Select Branch",
      selectBranch,
      "/api/v4/projects/278964/repository/branches",
      { project: "278964" },
    ],
  ] as const)("%s returns an empty array for an empty list", async (_name, dataSource, path, extra) => {
    nock(GITLAB_URL).get(path).query(true).reply(200, []);
    const { result } = await invokeDataSource(
      dataSource as never,
      {
        connection,
        ...extra,
      } as never,
    );
    expect(result).toEqual([]);
  });
});
