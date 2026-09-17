import { createConnection } from "@prismatic-io/spectral/dist/testing";
import type { GaxiosResponse } from "gaxios";
import nock from "nock";
import { createClient } from "../client";
import { connection as connectionDefinition } from "../connections";
import { fetchAllPages, fetchDrives, fetchFiles } from "./pagination";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
const page = <T>(data: T) => Promise.resolve({ data } as GaxiosResponse<T>);
describe("fetchAllPages", () => {
  test("returns a single page when no nextPageToken comes back", async () => {
    const items = await fetchAllPages<
      {
        nextPageToken?: string | null;
        files?: string[];
      },
      string
    >(
      () => page({ files: ["a", "b"] }),
      (data) => data.files,
    );
    expect(items).toEqual(["a", "b"]);
  });
  test("follows nextPageToken and concatenates every page in order", async () => {
    const requested: (string | undefined)[] = [];
    const items = await fetchAllPages<
      {
        nextPageToken?: string | null;
        files?: string[];
      },
      string
    >(
      (pageToken) => {
        requested.push(pageToken);
        return pageToken === "p2"
          ? page({ files: ["c"] })
          : page({ files: ["a", "b"], nextPageToken: "p2" });
      },
      (data) => data.files,
    );
    expect(items).toEqual(["a", "b", "c"]);
    expect(requested).toEqual([undefined, "p2"]);
  });
  test("contributes nothing for a page that omits the item array", async () => {
    const items = await fetchAllPages<
      {
        nextPageToken?: string | null;
        files?: string[];
      },
      string
    >(
      (pageToken) =>
        pageToken === "p2"
          ? page({ files: ["c"] })
          : page({ nextPageToken: "p2" }),
      (data) => data.files,
    );
    expect(items).toEqual(["c"]);
  });
  test("stops on an empty-string nextPageToken rather than looping", async () => {
    const items = await fetchAllPages<
      {
        nextPageToken?: string | null;
        files?: string[];
      },
      string
    >(
      () => page({ files: ["a"], nextPageToken: "" }),
      (data) => data.files,
    );
    expect(items).toEqual(["a"]);
  });
});
describe("fetchFiles", () => {
  afterEach(() => nock.cleanAll());
  test("returns the raw page body, envelope included, when fetchAll is false", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#fileList",
        nextPageToken: "p2",
        files: [{ id: "1", name: "Q3 Revenue Report.xlsx" }],
      });
    const data = await fetchFiles({
      drive: createClient(connection),
      initialParams: { pageSize: 1 },
      fetchAll: false,
    });
    expect(data.kind).toBe("drive#fileList");
    expect(data.nextPageToken).toBe("p2");
    expect(data.files).toHaveLength(1);
  });
  test("walks every page and returns only the collected files when fetchAll is true", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        kind: "drive#fileList",
        files: [{ id: "1" }],
        nextPageToken: "p2",
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { kind: "drive#fileList", files: [{ id: "2" }] });
    const data = await fetchFiles({
      drive: createClient(connection),
      initialParams: { pageSize: 1 },
      fetchAll: true,
    });
    expect(data.files).toEqual([{ id: "1" }, { id: "2" }]);
    expect(data.kind).toBeUndefined();
    expect(data.nextPageToken).toBeUndefined();
  });
  test("discards the caller's pageSize on every request once fetchAll is on", async () => {
    const requestedPageSizes: (string | undefined)[] = [];
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((actual) => {
        requestedPageSizes.push(actual.pageSize as string | undefined);
        return true;
      })
      .reply(200, { files: [], nextPageToken: "p2" });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((actual) => {
        requestedPageSizes.push(actual.pageSize as string | undefined);
        return true;
      })
      .reply(200, { files: [] });
    await fetchFiles({
      drive: createClient(connection),
      initialParams: { pageSize: 25 },
      fetchAll: true,
    });
    expect(requestedPageSizes).toEqual([undefined, undefined]);
  });
  test("honors the caller's pageSize when fetchAll is off", async () => {
    let requested: string | undefined;
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((actual) => {
        requested = actual.pageSize as string | undefined;
        return true;
      })
      .reply(200, { files: [] });
    await fetchFiles({
      drive: createClient(connection),
      initialParams: { pageSize: 25 },
      fetchAll: false,
    });
    expect(requested).toBe("25");
  });
});
describe("fetchDrives", () => {
  afterEach(() => nock.cleanAll());
  test("returns the raw page body when fetchAll is false", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        kind: "drive#driveList",
        nextPageToken: "p2",
        drives: [{ id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" }],
      });
    const data = await fetchDrives({
      drive: createClient(connection),
      initialParams: {},
      fetchAll: false,
    });
    expect(data.nextPageToken).toBe("p2");
    expect(data.drives).toHaveLength(1);
  });
  test("walks every page and returns only the collected drives when fetchAll is true", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, { drives: [{ id: "d1", name: "One" }], nextPageToken: "p2" });
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, { drives: [{ id: "d2", name: "Two" }] });
    const data = await fetchDrives({
      drive: createClient(connection),
      initialParams: {},
      fetchAll: true,
    });
    expect(data.drives).toEqual([
      { id: "d1", name: "One" },
      { id: "d2", name: "Two" },
    ]);
  });
});
