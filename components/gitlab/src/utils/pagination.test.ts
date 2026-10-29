import nock from "nock";
import { createGitlabClient } from "../client";
import { accessTokenConnection, GITLAB_URL } from "../testHelpers";
import { fetchAllKeysetPages, fetchAllPages, listRecords } from "./pagination";

afterEach(() => nock.cleanAll());
const client = () => createGitlabClient(accessTokenConnection, false);

describe("fetchAllPages", () => {
  test("follows x-next-page and ignores missing x-total (collections over 10,000)", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/1/issues")
      .query({ state: "opened", per_page: "100", page: "1" })
      .reply(200, [{ id: 1 }], { "x-next-page": "2" })
      .get("/api/v4/projects/1/issues")
      .query({ state: "opened", per_page: "100", page: "2" })
      .reply(200, [{ id: 2 }], { "x-next-page": "" });
    const records = await fetchAllPages(client(), "/projects/1/issues", {
      state: "opened",
    });
    expect(records).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("stops if x-next-page does not advance", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/groups")
      .query(true)
      .reply(200, [{ id: 1 }], { "x-next-page": "1" });
    expect(await fetchAllPages(client(), "/groups")).toEqual([{ id: 1 }]);
  });
});

describe("listRecords", () => {
  test("single page passes per_page and page, omitting a zero per_page", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/groups")
      .query({ page: "3" })
      .reply(200, [{ id: 9 }]);
    const records = await listRecords(client(), "/groups", {
      fetchAll: false,
      perPage: 0,
      page: 3,
    });
    expect(records).toEqual([{ id: 9 }]);
  });
});

describe("fetchAllPages early stop", () => {
  test("stops once isDone returns true", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/groups")
      .query({ per_page: "100", page: "1" })
      .reply(200, [{ id: 1 }, { id: 2 }], { "x-next-page": "2" });
    const records = await fetchAllPages<{ id: number }>(
      client(),
      "/groups",
      {},
      (fetched) => fetched.length >= 2,
    );
    expect(records).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe("keyset pagination", () => {
  test("fetchAllKeysetPages sends the keyset parameters and follows rel=next on the client host", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/users")
      .query({
        username: "jdoe",
        order_by: "id",
        sort: "asc",
        pagination: "keyset",
        per_page: "100",
      })
      .reply(200, [{ id: 1 }], {
        link: '<https://external.example.com/api/v4/users?id_after=1&order_by=id&pagination=keyset&per_page=100&sort=asc&username=jdoe>; rel="next", <https://external.example.com/api/v4/users?order_by=id&pagination=keyset&per_page=100&sort=asc&username=jdoe>; rel="first"',
      })
      .get("/api/v4/users")
      .query({
        id_after: "1",
        username: "jdoe",
        order_by: "id",
        sort: "asc",
        pagination: "keyset",
        per_page: "100",
      })
      .reply(200, [{ id: 2 }], {
        link: '<https://external.example.com/api/v4/users?order_by=id&pagination=keyset&per_page=100&sort=asc&username=jdoe>; rel="first"',
      });
    const records = await fetchAllKeysetPages(
      client(),
      "/users",
      { order_by: "id", sort: "asc" },
      { username: "jdoe" },
    );
    expect(records).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("listRecords uses keyset only when fetchAll is true and an order is given", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects")
      .query({
        order_by: "id",
        sort: "asc",
        pagination: "keyset",
        per_page: "100",
      })
      .reply(200, [{ id: 3 }]);
    const records = await listRecords(
      client(),
      "/projects",
      { fetchAll: true },
      {},
      { order_by: "id", sort: "asc" },
    );
    expect(records).toEqual([{ id: 3 }]);
  });
});

describe("non-array responses", () => {
  test("fetchAllPages rejects an HTML page answered with 200", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/1/issues")
      .query(true)
      .reply(200, "<html>Sign in</html>", { "Content-Type": "text/html" });
    await expect(fetchAllPages(client(), "/projects/1/issues")).rejects.toThrow(
      /Expected a JSON array from GitLab at \/projects\/1\/issues but received string/,
    );
  });

  test("listRecords rejects a non-array single page", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/groups")
      .query(true)
      .reply(200, { message: "not a list" });
    await expect(
      listRecords(client(), "/groups", { fetchAll: false }),
    ).rejects.toThrow(/received object/);
  });
});
