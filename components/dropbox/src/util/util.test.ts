import type { files } from "dropbox";
import type { DropboxEntry } from "../types";
import {
  cleanPathArray,
  fetchAllDropboxPages,
  filterEntriesByLookBackDate,
  getEntries,
  lookBackDateClean,
} from "./index";
const asRecord = (result: object) => result as Record<string, unknown>;
describe("fetchAllDropboxPages", () => {
  it("fetchAll=false, no cursor: calls fetchFirst and returns single page", async () => {
    const firstResponse = {
      result: {
        entries: [{ name: "file1.txt" }],
        has_more: true,
        cursor: "cur1",
      },
    };
    const fetchFirst = vi.fn().mockResolvedValueOnce(firstResponse);
    const fetchContinue = vi.fn();
    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, false);
    const r = asRecord(result.result);
    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).not.toHaveBeenCalled();
    expect(r.entries).toEqual([{ name: "file1.txt" }]);
    expect(r.has_more).toBe(true);
  });
  it("fetchAll=false, with cursor: calls fetchContinue and returns single page", async () => {
    const continueResponse = {
      result: {
        entries: [{ name: "file2.txt" }],
        has_more: false,
        cursor: "cur2",
      },
    };
    const fetchFirst = vi.fn();
    const fetchContinue = vi.fn().mockResolvedValueOnce(continueResponse);
    const result = await fetchAllDropboxPages(
      fetchFirst,
      fetchContinue,
      false,
      "cur1",
    );
    const r = asRecord(result.result);
    expect(fetchFirst).not.toHaveBeenCalled();
    expect(fetchContinue).toHaveBeenCalledWith("cur1");
    expect(r.entries).toEqual([{ name: "file2.txt" }]);
  });
  it("fetchAll=true, single page: returns items when has_more is false", async () => {
    const firstResponse = {
      result: {
        entries: [{ name: "file1.txt" }],
        has_more: false,
        cursor: "cur1",
      },
    };
    const fetchFirst = vi.fn().mockResolvedValueOnce(firstResponse);
    const fetchContinue = vi.fn();
    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);
    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).not.toHaveBeenCalled();
    expect(r.entries).toEqual([{ name: "file1.txt" }]);
    expect(r.has_more).toBe(false);
  });
  it("fetchAll=true, multi-page: accumulates entries across 3 cursor pages", async () => {
    const fetchFirst = vi.fn().mockResolvedValueOnce({
      result: {
        entries: [{ name: "a" }],
        has_more: true,
        cursor: "cur1",
      },
    });
    const fetchContinue = vi
      .fn()
      .mockResolvedValueOnce({
        result: {
          entries: [{ name: "b" }],
          has_more: true,
          cursor: "cur2",
        },
      })
      .mockResolvedValueOnce({
        result: {
          entries: [{ name: "c" }],
          has_more: false,
          cursor: "cur3",
        },
      });
    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);
    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).toHaveBeenCalledTimes(2);
    expect(fetchContinue).toHaveBeenNthCalledWith(1, "cur1");
    expect(fetchContinue).toHaveBeenNthCalledWith(2, "cur2");
    expect(r.entries).toEqual([{ name: "a" }, { name: "b" }, { name: "c" }]);
    expect(r.has_more).toBe(false);
  });
  it("fetchAll=true, empty entries: returns empty array", async () => {
    const fetchFirst = vi.fn().mockResolvedValueOnce({
      result: { entries: [], has_more: false, cursor: "cur1" },
    });
    const fetchContinue = vi.fn();
    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);
    expect(r.entries).toEqual([]);
  });
  it("fetchAll=true, custom itemsKey 'matches': extracts from matches field", async () => {
    const fetchFirst = vi.fn().mockResolvedValueOnce({
      result: {
        matches: [{ metadata: { name: "found.txt" } }],
        has_more: false,
        cursor: "cur1",
      },
    });
    const fetchContinue = vi.fn();
    const result = await fetchAllDropboxPages(
      fetchFirst,
      fetchContinue,
      true,
      undefined,
      "matches",
    );
    const r = asRecord(result.result);
    expect(r.matches).toEqual([{ metadata: { name: "found.txt" } }]);
  });
  it("fetchAll=true, no cursor returned: exits safely even if has_more is true", async () => {
    const fetchFirst = vi.fn().mockResolvedValueOnce({
      result: { entries: [{ name: "a" }], has_more: true },
    });
    const fetchContinue = vi.fn();
    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);
    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).not.toHaveBeenCalled();
    expect(r.entries).toEqual([{ name: "a" }]);
  });
});
describe("cleanPathArray", () => {
  it("maps a populated array through util.types.toString", () => {
    expect(cleanPathArray(["/a.txt", "/folder/b.txt"])).toEqual([
      "/a.txt",
      "/folder/b.txt",
    ]);
  });
  it("stringifies non-string members rather than dropping them", () => {
    expect(cleanPathArray([42, true])).toEqual(["42", "true"]);
  });
  it("returns undefined for an empty array", () => {
    expect(cleanPathArray([])).toBeUndefined();
  });
  it.each([
    ["a string", "/a.txt"],
    ["undefined", undefined],
    ["null", null],
    ["an object", { path: "/a.txt" }],
  ])("returns undefined for %s", (_label, value) => {
    expect(cleanPathArray(value)).toBeUndefined();
  });
});
describe("getEntries", () => {
  it("tolerates an absent filePaths when dynamicPaths is populated", () => {
    expect(getEntries(undefined, ["/dynamic.txt"])).toEqual([
      { path: "/dynamic.txt" },
    ]);
  });
  it("concatenates filePaths before dynamicPaths", () => {
    expect(getEntries(["/static.txt"], ["/dynamic.txt"])).toEqual([
      { path: "/static.txt" },
      { path: "/dynamic.txt" },
    ]);
  });
  it("returns an empty array when both arguments are absent", () => {
    expect(getEntries(undefined, undefined)).toEqual([]);
  });
  it("validates dynamicPaths as well as filePaths", () => {
    expect(() => getEntries(undefined, ["no-leading-slash.txt"])).toThrow(
      /Dropbox requires all file paths to start with a leading "\/"/,
    );
    expect(() => getEntries(["no-leading-slash.txt"], undefined)).toThrow(
      /Dropbox requires all file paths to start with a leading "\/"/,
    );
  });
});
describe("lookBackDateClean", () => {
  it.each([
    undefined,
    null,
    "",
    "   ",
  ])("returns the empty string for %p", (value) => {
    expect(lookBackDateClean(value)).toBe("");
  });
  it("accepts and trims a valid past date", () => {
    expect(lookBackDateClean("  2025-01-05  ")).toBe("2025-01-05");
  });
  it.each([
    "01-05-2025",
    "2025-1-5",
    "2025/01/05",
    "yesterday",
  ])("rejects the malformed value %p", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(/YYYY-MM-DD format/);
  });
  it("rejects a value that matches the format but is not a calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      /not a real calendar date/,
    );
  });
  it("rejects a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      /cannot be a future date/,
    );
  });
  it("addresses the input by its display label, not its key", () => {
    expect(() => lookBackDateClean("nope")).toThrow(/^Look-back Date /);
  });
});
describe("filterEntriesByLookBackDate", () => {
  const file = (id: string, serverModified: string): DropboxEntry =>
    ({
      ".tag": "file",
      name: `${id}.png`,
      path_lower: `/${id}.png`,
      path_display: `/${id}.png`,
      id: `id:${id}`,
      client_modified: "2020-01-01T00:00:00Z",
      server_modified: serverModified,
      rev: "rev",
      size: 1,
    }) as files.FileMetadataReference;
  const deleted: DropboxEntry = {
    ".tag": "deleted",
    name: "gone.png",
    path_lower: "/gone.png",
    path_display: "/gone.png",
  } as files.DeletedMetadataReference;
  it("returns every entry untouched when no date is set", () => {
    const entries = [file("a", "2020-01-01T00:00:00Z"), deleted];
    expect(filterEntriesByLookBackDate(entries, "")).toBe(entries);
  });
  it("keeps a file modified on the boundary date itself", () => {
    const boundary = file("b", "2026-01-01T00:00:00Z");
    expect(filterEntriesByLookBackDate([boundary], "2026-01-01")).toEqual([
      boundary,
    ]);
  });
  it("drops a file modified before the date", () => {
    expect(
      filterEntriesByLookBackDate(
        [file("c", "2025-12-31T23:59:59Z")],
        "2026-01-01",
      ),
    ).toEqual([]);
  });
  it("compares server_modified, not client_modified", () => {
    const backdated = file("d", "2026-06-01T00:00:00Z");
    expect(filterEntriesByLookBackDate([backdated], "2026-01-01")).toEqual([
      backdated,
    ]);
  });
  it("keeps an entry that carries no timestamp at all", () => {
    expect(filterEntriesByLookBackDate([deleted], "2026-01-01")).toEqual([
      deleted,
    ]);
  });
});
