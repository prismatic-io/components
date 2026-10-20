import axios from "axios";
import nock from "nock";
import { API_ENDPOINT } from "../constants";
import { getWorkerDemographicsExamplePayload } from "../examplePayloads";
import { fetchAllRecords, fetchAllRecordsNoCount } from "./records";
const PATH = "/hr/v2/worker-demographics";
const client = axios.create({ baseURL: API_ENDPOINT });
const workers = (count: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => ({
    ...getWorkerDemographicsExamplePayload.data.workers[0],
    associateOID: `OID-${offset + i}`,
  }));
const page = (count: number, offset: number, marker: string) => ({
  workers: workers(count, offset),
  meta: { marker },
  confirmMessage: { marker },
});
const mockPage = (skip: number, body: nock.Body) =>
  nock(API_ENDPOINT)
    .get(PATH)
    .query((q) => q.$skip === String(skip) && q.$top === "100")
    .reply(200, body);
const fetchAll = () =>
  fetchAllRecordsNoCount(client, PATH, "workers", true, {
    $skip: 7,
    $top: 3,
  });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("fetchAllRecordsNoCount with fetchAll", () => {
  test("pages until an empty page and keeps meta from the last non-empty page", async () => {
    mockPage(0, page(100, 0, "p1"));
    mockPage(100, page(100, 100, "p2"));
    mockPage(200, page(50, 200, "p3"));
    mockPage(250, page(0, 250, "empty"));
    const result = await fetchAll();
    expect(result.data).toHaveLength(250);
    expect(result.data.at(-1)).toMatchObject({ associateOID: "OID-249" });
    expect(result.meta).toEqual({ marker: "p3" });
    expect(result.confirmMessage).toEqual({ marker: "p3" });
    expect(nock.isDone()).toBe(true);
  });
  test("returns exactly 100 records when the second page is empty", async () => {
    mockPage(0, page(100, 0, "p1"));
    mockPage(100, page(0, 100, "empty"));
    const result = await fetchAll();
    expect(result.data).toHaveLength(100);
    expect(result.meta).toEqual({ marker: "p1" });
    expect(nock.isDone()).toBe(true);
  });
  test("advances $skip by the records returned when a page is short", async () => {
    mockPage(0, page(30, 0, "p1"));
    mockPage(30, page(0, 30, "empty"));
    const result = await fetchAll();
    expect(result.data).toHaveLength(30);
    expect(result.meta).toEqual({ marker: "p1" });
    expect(nock.isDone()).toBe(true);
  });
  test("returns an empty list when the first page is empty", async () => {
    mockPage(0, page(0, 0, "empty"));
    const result = await fetchAll();
    expect(result.data).toEqual([]);
    expect(result.meta).toEqual({ marker: "empty" });
    expect(nock.isDone()).toBe(true);
  });
  test("treats a response without a workers array as an empty page", async () => {
    mockPage(0, page(100, 0, "p1"));
    mockPage(100, { meta: { marker: "no-workers" } });
    const result = await fetchAll();
    expect(result.data).toHaveLength(100);
    expect(result.meta).toEqual({ marker: "p1" });
    expect(nock.isDone()).toBe(true);
  });
});
describe("fetchAllRecordsNoCount without fetchAll", () => {
  test("makes one request with the caller's $skip and $top", async () => {
    nock(API_ENDPOINT)
      .get(PATH)
      .query({ $skip: "7", $top: "3" })
      .reply(200, page(3, 7, "single"));
    const result = await fetchAllRecordsNoCount(
      client,
      PATH,
      "workers",
      false,
      { $skip: 7, $top: 3 },
    );
    expect(result.data).toHaveLength(3);
    expect(result.meta).toEqual({ marker: "single" });
    expect(nock.isDone()).toBe(true);
  });
});
describe("fetchAllRecords with fetchAll", () => {
  test("pages past the real rows that lack the data array add no undefined entries", async () => {
    nock(API_ENDPOINT)
      .get(PATH)
      .query({ count: "true" })
      .reply(200, { meta: { totalNumber: 300 } });
    mockPage(0, page(100, 0, "p1"));
    mockPage(100, page(50, 100, "p2"));
    mockPage(200, { meta: { marker: "past-end" } });
    const result = await fetchAllRecords(client, PATH, "workers", true, {
      $filter: "workers/workerStatus/statusCode/codeValue eq 'Active'",
    });
    expect(result.data).toHaveLength(150);
    expect(result.data.every((worker) => worker !== undefined)).toBe(true);
    expect(result.meta).toEqual({ marker: "past-end" });
    expect(result.confirmMessage).toBeUndefined();
    expect(nock.isDone()).toBe(true);
  });
});
