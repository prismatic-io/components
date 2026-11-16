import { type Mock, vi } from "vitest";
import { getFilesFromDriveWithPagination } from "./getFilesFromDriveWithPagination";

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

describe("getFilesFromDriveWithPagination", () => {
  test("reads the page size and page token from the pagination group", async () => {
    await getFilesFromDriveWithPagination.perform(context, {
      connection,
      driveId: "drive-1",
      fetchAll: false,
      recursive: false,
      pagination: { pageLimit: 10, pageToken: "token-1" },
    } as never);

    expect(getMock).toHaveBeenCalledWith("/drives/drive-1/root/children", {
      params: { $top: 10, $skipToken: "token-1" },
    });
  });
});
