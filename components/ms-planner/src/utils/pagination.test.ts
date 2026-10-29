import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { createClient } from "../client";
import { templatedOauth } from "../connections";
import { MAX_PAGES, PLANNER_ENDPOINTS } from "../constants";
import { listTasksInPlanExamplePayload } from "../examplePayloads";
import {
  fetchAllDirectory,
  fetchAllPlanner,
  fetchTasksCreatedSince,
} from "./pagination";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASKS_PATH = PLANNER_ENDPOINTS.PLAN_TASKS(PLAN_ID);
const TASKS_URL = `/v1.0${TASKS_PATH}`;
const CONTEXT = "https://graph.microsoft.com/v1.0/$metadata#planner/tasks";

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const client = () => createClient(connection, false);

const exampleTask = listTasksInPlanExamplePayload.data.value[0];

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

describe("fetchAllPlanner", () => {
  test("follows @odata.nextLink and keeps the @odata.context of the first page only", async () => {
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, {
        "@odata.context": CONTEXT,
        value: [{ id: "t_1" }],
        "@odata.nextLink": `${BASE}${TASKS_URL}?%24skiptoken=page2`,
      });
    nock(BASE)
      .get(TASKS_URL)
      .query({ $skiptoken: "page2" })
      .reply(200, {
        "@odata.context":
          "https://graph.microsoft.com/v1.0/$metadata#SECOND-PAGE-CONTEXT",
        value: [{ id: "t_2" }],
      });

    const result = await fetchAllPlanner<{ id: string }>(client(), TASKS_PATH);

    expect(result.value).toEqual([{ id: "t_1" }, { id: "t_2" }]);
    expect(result["@odata.context"]).toBe(CONTEXT);
    expect(result.truncated).toBe(false);
  });

  test("passes a nextLink through verbatim rather than rebuilding it with parameters", async () => {
    const requested: string[] = [];
    const nextLink = `${BASE}${TASKS_URL}?%24skiptoken=Skip%3D%2710%27&opaque=a%2Bb`;

    nock(BASE)
      .get(TASKS_URL)
      .reply(200, { value: [{ id: "t_1" }], "@odata.nextLink": nextLink });
    nock(BASE)
      .get(/.*/)
      .reply(function () {
        requested.push(this.req.path);
        return [200, { value: [] }];
      });

    await fetchAllPlanner<{ id: string }>(client(), TASKS_PATH);

    expect(requested).toEqual([
      `${TASKS_URL}?%24skiptoken=Skip%3D%2710%27&opaque=a%2Bb`,
    ]);
  });

  test("returns an empty list when the service omits `value`", async () => {
    nock(BASE).get(TASKS_URL).reply(200, { "@odata.context": CONTEXT });

    const result = await fetchAllPlanner<{ id: string }>(client(), TASKS_PATH);

    expect(result.value).toEqual([]);
    expect(result.truncated).toBe(false);
  });

  test("stops at the MAX_PAGES cap and reports the walk as truncated", async () => {
    let pages = 0;
    nock(BASE)
      .get(/.*/)
      .times(MAX_PAGES + 5)
      .reply(() => {
        pages += 1;
        return [
          200,
          {
            value: [{ id: `t_${pages}` }],
            "@odata.nextLink": `${BASE}${TASKS_URL}?p=${pages + 1}`,
          },
        ];
      });

    const result = await fetchAllPlanner<{ id: string }>(client(), TASKS_PATH);

    expect(pages).toBe(MAX_PAGES);
    expect(result.value).toHaveLength(MAX_PAGES);
    expect(result.truncated).toBe(true);
  });
});

describe("fetchAllDirectory", () => {
  test("sends parameters on the first request only, never on the nextLink", async () => {
    const requested: string[] = [];

    nock(BASE)
      .get("/v1.0/users")
      .query({ $select: "id,displayName", $top: "999" })
      .reply(function () {
        requested.push(this.req.path);
        return [
          200,
          {
            value: [{ id: "u_1" }],
            "@odata.nextLink": `${BASE}/v1.0/users?%24skiptoken=next`,
          },
        ];
      });
    nock(BASE)
      .get("/v1.0/users")
      .query({ $skiptoken: "next" })
      .reply(function () {
        requested.push(this.req.path);
        return [200, { value: [{ id: "u_2" }] }];
      });

    const result = await fetchAllDirectory<{ id: string }>(
      client(),
      PLANNER_ENDPOINTS.USERS,
      {
        $select: "id,displayName",
        $top: 999,
      },
    );

    expect(result.value).toEqual([{ id: "u_1" }, { id: "u_2" }]);
    expect(requested).toEqual([
      "/v1.0/users?$select=id,displayName&$top=999",
      "/v1.0/users?%24skiptoken=next",
    ]);
  });
});

describe("fetchTasksCreatedSince", () => {
  const since = "2024-01-09T10:00:00Z";

  const invoke = (value: unknown[]) => {
    nock(BASE).get(TASKS_URL).reply(200, { "@odata.context": CONTEXT, value });
    return fetchTasksCreatedSince<PlannerTask>(client(), TASKS_PATH, since);
  };

  test("returns the created tasks alongside the fetched count and truncation flag", async () => {
    const { fetched, created, truncated } = await invoke([
      { ...exampleTask, id: "older", createdDateTime: "2024-01-09T09:00:00Z" },
      { ...exampleTask, id: "newer", createdDateTime: "2024-01-09T11:00:00Z" },
    ]);

    expect(fetched).toBe(2);
    expect(created.map((task) => task.id)).toEqual(["newer"]);
    expect(truncated).toBe(false);
  });

  test("reports the newest createdDateTime across every fetched task, not only the created ones", async () => {
    const { created, newestCreatedDateTime } = await invoke([
      { ...exampleTask, id: "older", createdDateTime: "2024-01-09T09:00:00Z" },
      {
        ...exampleTask,
        id: "newer",
        createdDateTime: "2024-01-09T11:00:00.1239999Z",
      },
    ]);

    expect(created.map((task) => task.id)).toEqual(["newer"]);
    expect(newestCreatedDateTime).toBe("2024-01-09T11:00:00.123Z");
  });

  test("treats nothing as new without a watermark and still reports the newest createdDateTime", async () => {
    nock(BASE)
      .get(TASKS_URL)
      .reply(200, {
        "@odata.context": CONTEXT,
        value: [
          {
            ...exampleTask,
            id: "older",
            createdDateTime: "2024-01-09T09:00:00Z",
          },
          {
            ...exampleTask,
            id: "newer",
            createdDateTime: "2024-01-09T11:00:00Z",
          },
        ],
      });

    const { fetched, created, newestCreatedDateTime } =
      await fetchTasksCreatedSince<PlannerTask>(client(), TASKS_PATH);

    expect(fetched).toBe(2);
    expect(created).toEqual([]);
    expect(newestCreatedDateTime).toBe("2024-01-09T11:00:00.000Z");
  });

  test("reports no newest createdDateTime when no fetched task is dated", async () => {
    const { newestCreatedDateTime } = await invoke([
      { ...exampleTask, id: "missing", createdDateTime: undefined },
    ]);
    expect(newestCreatedDateTime).toBeUndefined();
  });

  test("excludes a task whose createdDateTime equals the watermark", async () => {
    const { created } = await invoke([
      { ...exampleTask, id: "boundary", createdDateTime: since },
    ]);
    expect(created).toEqual([]);
  });

  test("drops a task with no createdDateTime", async () => {
    const { fetched, created } = await invoke([
      { ...exampleTask, id: "missing", createdDateTime: undefined },
      { ...exampleTask, id: "nulled", createdDateTime: null },
    ]);

    expect(fetched).toBe(2);
    expect(created).toEqual([]);
  });

  test("normalizes a UTC offset instead of ordering timestamps lexically", async () => {
    const { created } = await invoke([
      {
        ...exampleTask,
        id: "ahead-of-utc",
        createdDateTime: "2024-01-09T11:30:00+02:00",
      },
      {
        ...exampleTask,
        id: "behind-utc",
        createdDateTime: "2024-01-09T09:30:00-02:00",
      },
    ]);

    expect(created.map((task) => task.id)).toEqual(["behind-utc"]);
  });

  test("reports truncation up from the page walk", async () => {
    let pages = 0;
    nock(BASE)
      .get(/.*/)
      .times(MAX_PAGES + 5)
      .reply(() => {
        pages += 1;
        return [
          200,
          {
            value: [
              {
                ...exampleTask,
                id: `t_${pages}`,
                createdDateTime: "2024-01-09T11:00:00Z",
              },
            ],
            "@odata.nextLink": `${BASE}${TASKS_URL}?p=${pages + 1}`,
          },
        ];
      });

    const { fetched, created, truncated } =
      await fetchTasksCreatedSince<PlannerTask>(client(), TASKS_PATH, since);

    expect(fetched).toBe(MAX_PAGES);
    expect(created).toHaveLength(MAX_PAGES);
    expect(truncated).toBe(true);
  });
});
