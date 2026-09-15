import nock from "nock";
import { createClient } from "../client";
import { api, connection, prefix } from "../testHelpers";
import { fetchAllRecords } from "./pagination";
const PREFIX = prefix("jpm");
const client = () => createClient(connection, "jpm");
const job = (id: number) => ({ id, jobNumber: `${id}` });
describe("fetchAllRecords", () => {
  afterEach(() => nock.cleanAll());
  test("returns the records of a single page", async () => {
    api()
      .get(`${PREFIX}/jobs`)
      .query({ includeTotal: "true", page: "1", pageSize: "500" })
      .reply(200, { data: [job(1), job(2)], hasMore: false });
    const result = await fetchAllRecords(client(), "/jobs", {
      includeTotal: true,
    });
    expect(result.data).toEqual([job(1), job(2)]);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(500);
  });
  test("accumulates records across every page the API reports", async () => {
    api()
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "1")
      .reply(200, { data: [job(1), job(2)], hasMore: true })
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "2")
      .reply(200, { data: [job(3)], hasMore: false });
    const result = await fetchAllRecords(client(), "/jobs", {});
    expect(result.data).toEqual([job(1), job(2), job(3)]);
    expect(result.page).toBe(2);
  });
  test("an uncapped drain reports hasMore false, even when a page reported more", async () => {
    api()
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "1")
      .reply(200, { data: [job(1)], hasMore: true })
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "2")
      .reply(200, { data: [job(2)], hasMore: false });
    const result = await fetchAllRecords(client(), "/jobs", {});
    expect(result.hasMore).toBe(false);
  });
  test("reports its own accumulated count rather than the API's totalCount", async () => {
    api()
      .get(`${PREFIX}/jobs`)
      .query(true)
      .reply(200, {
        data: [job(1), job(2), job(3)],
        hasMore: false,
        totalCount: 500,
      });
    const result = await fetchAllRecords(client(), "/jobs", {});
    expect(result.totalCount).toBe(3);
  });
  test("truncates to maxRecords when a short non-final page overshoots the cap", async () => {
    const page = (from: number, count: number) =>
      Array.from({ length: count }, (_, i) => job(from + i));
    api()
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "1")
      .reply(200, { data: page(0, 300), hasMore: true })
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "2")
      .reply(200, { data: page(300, 500), hasMore: true })
      .get(`${PREFIX}/jobs`)
      .query((q) => q.page === "3")
      .reply(200, { data: page(800, 500), hasMore: true });
    const result = await fetchAllRecords(client(), "/jobs", {}, 1000);
    expect(result.data).toHaveLength(1000);
    expect(result.data[999]).toEqual(job(999));
    expect(result.totalCount).toBe(1000);
    expect(result.hasMore).toBe(true);
  });
});
