import { type Mock, vi } from "vitest";
import type { HttpClient } from "@prismatic-io/spectral/http";
import type { DriveItem } from "../types";
import { getFilesFromDriveFN } from "./drive";

const createMockClient = (getMock: Mock) => ({ get: getMock }) as unknown as HttpClient;

const driveItem = (id: string, isFolder = false): DriveItem =>
  ({
    id,
    name: `${id}.txt`,
    ...(isFolder ? { folder: { childCount: 1 } } : {}),
  }) as DriveItem;

describe("getFilesFromDriveFN", () => {
  let getMock: Mock;

  beforeEach(() => {
    getMock = vi.fn();
  });

  it("returns the enveloped shape with the drive root's context", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#root/children",
        value: [driveItem("file-1")],
      },
    });

    const result = await getFilesFromDriveFN(createMockClient(getMock), "drive-abc");

    expect(result).toEqual({
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#root/children",
      value: [driveItem("file-1")],
    });
  });

  it("keeps the root context rather than a subfolder's when recursing", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#root/children",
          value: [driveItem("file-1"), driveItem("folder-1", true)],
        },
      })
      .mockResolvedValueOnce({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#items/folder-1/children",
          value: [driveItem("file-2")],
        },
      });

    const result = await getFilesFromDriveFN(createMockClient(getMock), "drive-abc");

    expect(getMock.mock.calls[0][0]).toBe("/drives/drive-abc/root/children");
    expect(getMock.mock.calls[1][0]).toBe("/drives/drive-abc/items/folder-1/children");
    expect(result["@odata.context"]).toBe(
      "https://graph.microsoft.com/v1.0/$metadata#root/children",
    );
    expect(result.value).toEqual([driveItem("file-1"), driveItem("file-2")]);
  });

  it("omits the context when no root request is made", async () => {
    const result = await getFilesFromDriveFN(createMockClient(getMock), "drive-abc", [
      driveItem("file-1"),
    ]);

    expect(getMock).not.toHaveBeenCalled();
    expect(result).toEqual({ value: [driveItem("file-1")] });
    expect("@odata.context" in result).toBe(false);
  });
});
