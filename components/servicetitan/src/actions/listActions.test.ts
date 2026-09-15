import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listCustomersContactExamplePayload } from "../examplePayloads";
import { api, connection, prefix } from "../testHelpers";
import { listCustomersContact } from "./customerContact/listCustomersContact";
import { listJobs } from "./jobs/listJobs";
const job = (id: number) => ({ id, jobNumber: `${id}` });
afterEach(() => nock.cleanAll());
describe("listJobs (pagination and fetchAll)", () => {
  test("takes page and pageSize from the Pagination object and forwards the other filters", async () => {
    let sentQuery: Record<string, string | string[] | undefined> = {};
    api()
      .get(`${prefix("jpm")}/jobs`)
      .query((q) => {
        sentQuery = q;
        return true;
      })
      .reply(200, { page: 2, pageSize: 25, hasMore: false, data: [job(1)] });
    const { result } = await invoke(listJobs, {
      connection,
      fetchAll: false,
      pagination: { page: 2, pageSize: 25 },
      includeTotal: true,
      sort: "+Id",
      customQueryParams: { status: "Completed" },
    });
    expect(sentQuery).toEqual({
      page: "2",
      pageSize: "25",
      includeTotal: "true",
      sort: "+Id",
      status: "Completed",
    });
    expect(result.data).toEqual({
      page: 2,
      pageSize: 25,
      hasMore: false,
      data: [job(1)],
    });
  });
  test("routes through the drain-every-page helper when Fetch All is on, ignoring Pagination", async () => {
    let sentQuery: Record<string, string | string[] | undefined> = {};
    api()
      .get(`${prefix("jpm")}/jobs`)
      .query((q) => {
        sentQuery = q;
        return true;
      })
      .reply(200, { data: [job(1), job(2)], hasMore: false });
    const { result } = await invoke(listJobs, {
      connection,
      fetchAll: true,
      pagination: { page: 2, pageSize: 25 },
      includeTotal: true,
      sort: "+Id",
      customQueryParams: { status: "Completed" },
    });
    expect(sentQuery).toEqual({
      page: "1",
      pageSize: "500",
      includeTotal: "true",
      sort: "+Id",
      status: "Completed",
    });
    expect(result.data).toEqual({
      page: 1,
      pageSize: 500,
      hasMore: false,
      totalCount: 2,
      data: [job(1), job(2)],
    });
  });
  test("surfaces a failing list request", async () => {
    api()
      .get(`${prefix("jpm")}/jobs`)
      .query(true)
      .reply(500, { title: "Server Error" });
    await expect(
      invoke(listJobs, {
        connection,
        fetchAll: false,
        pagination: { page: 1, pageSize: 50 },
        includeTotal: false,
        sort: undefined,
        customQueryParams: undefined,
      }),
    ).rejects.toThrow();
  });
});
describe("listCustomersContact (endpoint switches on the date filters)", () => {
  const body = listCustomersContactExamplePayload.data;
  test("hits the per-customer contacts endpoint when no date filter is supplied", async () => {
    let sentPath = "";
    api()
      .get(/\/customers\/12345\/contacts/)
      .query(true)
      .reply(200, function () {
        sentPath = this.req.path;
        return body;
      });
    const { result } = await invoke(listCustomersContact, {
      connection,
      customerId: 12345,
      fetchAll: false,
      pagination: { page: 1, pageSize: 50 },
      includeTotal: true,
      modifiedBefore: undefined,
      modifiedOnOrAfter: undefined,
    });
    expect(sentPath).toContain(`${prefix("crm")}/customers/12345/contacts?`);
    expect(sentPath).not.toContain("customerIds=");
    expect(result.data).toEqual(body);
  });
  test("switches to the collection endpoint with a customerIds filter when a date filter is supplied", async () => {
    let sentPath = "";
    api()
      .get(/\/customers\/contacts/)
      .query(true)
      .reply(200, function () {
        sentPath = this.req.path;
        return body;
      });
    const { result } = await invoke(listCustomersContact, {
      connection,
      customerId: 12345,
      fetchAll: false,
      pagination: { page: 1, pageSize: 50 },
      includeTotal: true,
      modifiedBefore: undefined,
      modifiedOnOrAfter: "2026-08-01T00:00:00Z",
    });
    expect(sentPath).toContain(`${prefix("crm")}/customers/contacts?`);
    expect(sentPath).toContain("customerIds=12345");
    expect(sentPath).toContain("modifiedOnOrAfter=");
    expect(result.data).toEqual(body);
  });
  test("surfaces a failing list request", async () => {
    api()
      .get(/\/customers\/12345\/contacts/)
      .query(true)
      .reply(404, { title: "Not Found" });
    await expect(
      invoke(listCustomersContact, {
        connection,
        customerId: 12345,
        fetchAll: false,
        pagination: { page: 1, pageSize: 50 },
        includeTotal: false,
        modifiedBefore: undefined,
        modifiedOnOrAfter: undefined,
      }),
    ).rejects.toThrow();
  });
});
