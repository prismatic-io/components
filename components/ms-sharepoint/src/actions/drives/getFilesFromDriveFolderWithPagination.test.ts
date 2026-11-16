import { type Mock, vi } from "vitest";
import { getFilesFromDriveFolderWithPagination } from "./getFilesFromDriveFolderWithPagination";

const getMock: Mock = vi.fn();

vi.mock("../../client", () => ({
  createClient: vi.fn(async () => ({ get: getMock })),
}));

const connection = { key: "oauth", fields: {}, token: { access_token: "t" } } as never;
const context = { debug: { enabled: false } } as never;

beforeEach(() => {
  getMock.mockReset();
  getMock.mockResolvedValue({ data: { value: [] } });
});

describe("getFilesFromDriveFolderWithPagination", () => {
  test("reads the page size and page token from the pagination group", async () => {
    await getFilesFromDriveFolderWithPagination.perform(context, {
      connection,
      driveId: "drive-1",
      folderId: "folder-1",
      fetchAll: false,
      pagination: { pageLimit: 10, pageToken: "token-1" },
    } as never);

    expect(getMock).toHaveBeenCalledWith("/drives/drive-1/items/folder-1/children", {
      params: { $top: 10, $skipToken: "token-1" },
    });
  });
});
