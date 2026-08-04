import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DriveItem } from "./interfaces";
import { getFilesFromDriveFN, paginateResults } from "./utils";
const createMockClient = (getMock: jest.Mock) =>
  ({ get: getMock }) as unknown as HttpClient;
const driveItem = (id: string, isFolder = false): DriveItem =>
  ({
    id,
    name: `${id}.txt`,
    ...(isFolder ? { folder: { childCount: 1 } } : {}),
  }) as DriveItem;
describe("paginateResults", () => {
  let getMock: jest.Mock;
  beforeEach(() => {
    getMock = jest.fn();
  });
  describe("default options", () => {
    it("returns a bare array so internal callers keep working", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
          value: [{ id: "1" }, { id: "2" }],
        },
      });
      const result = await paginateResults(
        createMockClient(getMock),
        "/sites/abc/drives",
      );
      expect(result).toEqual([{ id: "1" }, { id: "2" }]);
    });
    it("accumulates items across pages into the bare array", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink":
              "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({ data: { value: [{ id: "2" }] } });
      const result = await paginateResults(
        createMockClient(getMock),
        "/sites/abc/lists",
      );
      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[1][0]).toBe(
        "https://graph.microsoft.com/v1.0/next?token=abc",
      );
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
      const result = await paginateResults(
        createMockClient(getMock),
        "/sites/abc/lists",
        {
          returnFullData: true,
        },
      );
      expect(result).toEqual({
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#lists",
        value: [{ id: "1" }, { id: "2" }],
      });
    });
    it("merges every page into value and does not leak a stale nextLink", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            "@odata.context":
              "https://graph.microsoft.com/v1.0/$metadata#sites",
            value: [{ id: "1" }],
            "@odata.nextLink":
              "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({
          data: {
            "@odata.context":
              "https://graph.microsoft.com/v1.0/$metadata#sites",
            value: [{ id: "2" }, { id: "3" }],
          },
        });
      const result = (await paginateResults(
        createMockClient(getMock),
        "/sites",
        {
          returnFullData: true,
        },
      )) as Record<string, unknown>;
      expect(result.value).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
      expect(result["@odata.nextLink"]).toBeUndefined();
    });
    it("preserves @odata.deltaLink from the final delta page", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink":
              "https://graph.microsoft.com/v1.0/delta?token=abc",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "2" }],
            "@odata.deltaLink":
              "https://graph.microsoft.com/v1.0/delta?token=final",
          },
        });
      const result = (await paginateResults(
        createMockClient(getMock),
        "/drives/abc/root/delta",
        {
          returnFullData: true,
          useTop: false,
          excludeParents: true,
        },
      )) as Record<string, unknown>;
      expect(result["@odata.deltaLink"]).toBe(
        "https://graph.microsoft.com/v1.0/delta?token=final",
      );
      expect(result.value).toEqual([{ id: "1" }, { id: "2" }]);
    });
  });
  describe("useTop", () => {
    it("requests $top on the first page only", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink":
              "https://graph.microsoft.com/v1.0/next?token=abc",
          },
        })
        .mockResolvedValueOnce({ data: { value: [{ id: "2" }] } });
      await paginateResults(createMockClient(getMock), "/sites/abc/drives");
      expect(getMock.mock.calls[0][1].params).toEqual({ $top: 100 });
      expect(getMock.mock.calls[1][1].params).toBeUndefined();
    });
    it("omits $top entirely when disabled, since delta token endpoints reject it", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });
      await paginateResults(
        createMockClient(getMock),
        "/drives/abc/root/delta",
        {
          useTop: false,
        },
      );
      expect(getMock.mock.calls[0][1].params).toBeUndefined();
    });
  });
  describe("excludeParents", () => {
    it("sends the Prefer header when enabled", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });
      await paginateResults(
        createMockClient(getMock),
        "/drives/abc/root/delta",
        {
          excludeParents: true,
        },
      );
      expect(getMock.mock.calls[0][1].headers).toEqual({
        Prefer: "deltaExcludeParent",
      });
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
describe("getFilesFromDriveFN", () => {
  let getMock: jest.Mock;
  beforeEach(() => {
    getMock = jest.fn();
  });
  it("returns the enveloped shape with the drive root's context", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        "@odata.context":
          "https://graph.microsoft.com/v1.0/$metadata#root/children",
        value: [driveItem("file-1")],
      },
    });
    const result = await getFilesFromDriveFN(
      createMockClient(getMock),
      "drive-abc",
    );
    expect(result).toEqual({
      "@odata.context":
        "https://graph.microsoft.com/v1.0/$metadata#root/children",
      value: [driveItem("file-1")],
    });
  });
  it("keeps the root context rather than a subfolder's when recursing", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          "@odata.context":
            "https://graph.microsoft.com/v1.0/$metadata#root/children",
          value: [driveItem("file-1"), driveItem("folder-1", true)],
        },
      })
      .mockResolvedValueOnce({
        data: {
          "@odata.context":
            "https://graph.microsoft.com/v1.0/$metadata#items/folder-1/children",
          value: [driveItem("file-2")],
        },
      });
    const result = await getFilesFromDriveFN(
      createMockClient(getMock),
      "drive-abc",
    );
    expect(getMock.mock.calls[0][0]).toBe("/drives/drive-abc/root/children");
    expect(getMock.mock.calls[1][0]).toBe(
      "/drives/drive-abc/items/folder-1/children",
    );
    expect(result["@odata.context"]).toBe(
      "https://graph.microsoft.com/v1.0/$metadata#root/children",
    );
    expect(result.value).toEqual([driveItem("file-1"), driveItem("file-2")]);
  });
  it("omits the context when no root request is made", async () => {
    const result = await getFilesFromDriveFN(
      createMockClient(getMock),
      "drive-abc",
      [driveItem("file-1")],
    );
    expect(getMock).not.toHaveBeenCalled();
    expect(result).toEqual({ value: [driveItem("file-1")] });
    expect("@odata.context" in result).toBe(false);
  });
});
