import { type Mock, vi } from "vitest";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { fetchAllPages, getSkipToken, paginateResults } from "./pagination";

const createMockClient = (getMock: Mock) => ({ get: getMock }) as unknown as HttpClient;

describe("paginateResults", () => {
  let getMock: Mock;

  beforeEach(() => {
    getMock = vi.fn();
  });

  describe("default options", () => {
    it("returns a bare array so internal callers keep working", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
          value: [{ id: "1" }, { id: "2" }],
        },
      });

      const result = await paginateResults(createMockClient(getMock), "/sites/abc/drives");

      expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    });

    it("accumulates items across pages into the bare array", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink": "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({ data: { value: [{ id: "2" }] } });

      const result = await paginateResults(createMockClient(getMock), "/sites/abc/lists");

      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[1][0]).toBe("https://graph.microsoft.com/v1.0/next?token=abc");
      expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    });
  });

  describe("returnFullData", () => {
    it("returns the same { value } envelope a single page call returns", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#lists",
          value: [{ id: "1" }, { id: "2" }],
        },
      });

      const result = await paginateResults(createMockClient(getMock), "/sites/abc/lists", {
        returnFullData: true,
      });

      expect(result).toEqual({
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#lists",
        value: [{ id: "1" }, { id: "2" }],
      });
    });

    it("merges every page into value and does not leak a stale nextLink", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
            value: [{ id: "1" }],
            "@odata.nextLink": "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({
          data: {
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
            value: [{ id: "2" }, { id: "3" }],
          },
        });

      const result = (await paginateResults(createMockClient(getMock), "/sites", {
        returnFullData: true,
      })) as Record<string, unknown>;

      expect(result.value).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
      expect(result["@odata.nextLink"]).toBeUndefined();
    });

    it("preserves @odata.deltaLink from the final delta page", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink": "https://graph.microsoft.com/v1.0/delta?token=abc",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "2" }],
            "@odata.deltaLink": "https://graph.microsoft.com/v1.0/delta?token=final",
          },
        });

      const result = (await paginateResults(createMockClient(getMock), "/drives/abc/root/delta", {
        returnFullData: true,
        useTop: false,
        excludeParents: true,
      })) as Record<string, unknown>;

      expect(result["@odata.deltaLink"]).toBe("https://graph.microsoft.com/v1.0/delta?token=final");
      expect(result.value).toEqual([{ id: "1" }, { id: "2" }]);
    });
  });

  describe("useTop", () => {
    it("requests $top on the first page only", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink": "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({ data: { value: [{ id: "2" }] } });

      await paginateResults(createMockClient(getMock), "/sites/abc/drives");

      expect(getMock.mock.calls[0][1].params).toEqual({ $top: 100 });
      expect(getMock.mock.calls[1][1].params).toBeUndefined();
    });

    it("omits $top entirely when disabled, since delta token endpoints reject it", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });

      await paginateResults(createMockClient(getMock), "/drives/abc/root/delta", {
        useTop: false,
      });

      expect(getMock.mock.calls[0][1].params).toBeUndefined();
    });
  });

  describe("excludeParents", () => {
    it("sends the Prefer header when enabled", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });

      await paginateResults(createMockClient(getMock), "/drives/abc/root/delta", {
        excludeParents: true,
      });

      expect(getMock.mock.calls[0][1].headers).toEqual({ Prefer: "deltaExcludeParent" });
    });

    it("leaves the Prefer header unset by default", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });

      await paginateResults(createMockClient(getMock), "/sites");

      expect(getMock.mock.calls[0][1].headers.Prefer).toBeUndefined();
    });
  });

  it("drops items already accumulated from an earlier page", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          value: [{ id: "1" }, { id: "2" }],
          "@odata.nextLink": "https://graph.microsoft.com/v1.0/next?token=abc",
        },
      })
      .mockResolvedValueOnce({ data: { value: [{ id: "2" }, { id: "3" }] } });

    const result = await paginateResults(createMockClient(getMock), "/sites");

    expect(result).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
  });
});

describe("getSkipToken", () => {
  test("reads the skip token Graph writes in lower case into @odata.nextLink", () => {
    expect(
      getSkipToken("https://graph.microsoft.com/v1.0/sites/s/drives?$skiptoken=X%2744537079ghv"),
    ).toBe("X'44537079ghv");
  });

  test("accepts the camel-cased spelling as well", () => {
    expect(getSkipToken("https://graph.microsoft.com/v1.0/sites/s/drives?$skipToken=abc")).toBe(
      "abc",
    );
  });

  test("returns null when the link carries no skip token", () => {
    expect(getSkipToken("https://graph.microsoft.com/v1.0/sites/s/drives?$top=5")).toBeNull();
  });
});

describe("fetchAllPages", () => {
  test("sends the params on the first request only and follows @odata.nextLink", async () => {
    const nextLink = "https://graph.microsoft.com/v1.0/sites?$skiptoken=abc";
    const getMock = vi
      .fn()
      .mockResolvedValueOnce({ data: { value: [{ id: "s1" }], "@odata.nextLink": nextLink } })
      .mockResolvedValueOnce({ data: { value: [{ id: "s2" }] } });

    const items = await fetchAllPages(createMockClient(getMock), "/sites", { search: "" });

    expect(getMock).toHaveBeenNthCalledWith(1, "/sites", { params: { search: "" } });
    expect(getMock).toHaveBeenNthCalledWith(2, nextLink, { params: undefined });
    expect(items).toEqual([{ id: "s1" }, { id: "s2" }]);
  });

  test("returns an empty list when the reply has no value", async () => {
    const getMock = vi.fn().mockResolvedValue({ data: {} });

    expect(await fetchAllPages(createMockClient(getMock), "/sites")).toEqual([]);
  });
});
