import { fetchAllDropboxPages } from "./util";

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
    const fetchFirst = jest.fn().mockResolvedValueOnce(firstResponse);
    const fetchContinue = jest.fn();

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
    const fetchFirst = jest.fn();
    const fetchContinue = jest.fn().mockResolvedValueOnce(continueResponse);

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
    const fetchFirst = jest.fn().mockResolvedValueOnce(firstResponse);
    const fetchContinue = jest.fn();

    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);

    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).not.toHaveBeenCalled();
    expect(r.entries).toEqual([{ name: "file1.txt" }]);
    expect(r.has_more).toBe(false);
  });

  it("fetchAll=true, multi-page: accumulates entries across 3 cursor pages", async () => {
    const fetchFirst = jest.fn().mockResolvedValueOnce({
      result: {
        entries: [{ name: "a" }],
        has_more: true,
        cursor: "cur1",
      },
    });
    const fetchContinue = jest
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
    const fetchFirst = jest.fn().mockResolvedValueOnce({
      result: { entries: [], has_more: false, cursor: "cur1" },
    });
    const fetchContinue = jest.fn();

    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);

    expect(r.entries).toEqual([]);
  });

  it("fetchAll=true, custom itemsKey 'matches': extracts from matches field", async () => {
    const fetchFirst = jest.fn().mockResolvedValueOnce({
      result: {
        matches: [{ metadata: { name: "found.txt" } }],
        has_more: false,
        cursor: "cur1",
      },
    });
    const fetchContinue = jest.fn();

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
    const fetchFirst = jest.fn().mockResolvedValueOnce({
      result: { entries: [{ name: "a" }], has_more: true },
    });
    const fetchContinue = jest.fn();

    const result = await fetchAllDropboxPages(fetchFirst, fetchContinue, true);
    const r = asRecord(result.result);

    expect(fetchFirst).toHaveBeenCalledTimes(1);
    expect(fetchContinue).not.toHaveBeenCalled();
    expect(r.entries).toEqual([{ name: "a" }]);
  });
});
