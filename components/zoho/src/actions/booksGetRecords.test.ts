import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { zohoTemplatedConnection } from "../connections";
import { booksGetRecordsExamplePayload } from "../examplePayloads/books";
import type { BooksGetRecordsPerformInput } from "../types";
import booksGetRecords from "./booksGetRecords";
const conn = {
  ...createConnection(
    zohoTemplatedConnection,
    {},
    { access_token: "test-token" },
  ),
  context: { "accounts-server": "https://accounts.zoho.com" },
};
const BOOKS_BASE = "https://www.zohoapis.com";
const BOOKS_REPLY = booksGetRecordsExamplePayload.data;
const baseInputs: BooksGetRecordsPerformInput = {
  connection: conn as unknown as BooksGetRecordsPerformInput["connection"],
  recordType: "contacts",
  parentRecordType: "",
  parentRecordId: "",
  fetchAll: false,
};
// biome-ignore lint/suspicious/noExplicitAny: test-only param bridge
const params = (input: BooksGetRecordsPerformInput): any => input;
describe("booksGetRecords", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns the Books record collection", async () => {
    nock(BOOKS_BASE)
      .get("/books/v3/contacts")
      .query(true)
      .reply(200, BOOKS_REPLY);
    const { result } = await invoke(booksGetRecords, params(baseInputs));
    expect(result.data.contacts).toEqual(BOOKS_REPLY.contacts);
  });
  test("error path (4xx/5xx) propagates to handleErrors", async () => {
    nock(BOOKS_BASE)
      .get("/books/v3/contacts")
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(booksGetRecords, params(baseInputs))).rejects.toThrow();
  });
  test("SC-38418: forwards last_modified_time as a query param (not a header) when ifModifiedSince is set", async () => {
    const ifModifiedSince = "2024-01-15T00:00:00+00:00";
    const scope = nock(BOOKS_BASE)
      .get("/books/v3/contacts")
      .query((q) => q.last_modified_time === ifModifiedSince)
      .reply(200, BOOKS_REPLY);
    const { result } = await invoke(
      booksGetRecords,
      params({ ...baseInputs, ifModifiedSince }),
    );
    expect(scope.isDone()).toBe(true);
    expect(result.data.contacts).toEqual(BOOKS_REPLY.contacts);
  });
});
