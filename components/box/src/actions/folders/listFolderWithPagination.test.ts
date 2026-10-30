import { invoke } from "@prismatic-io/spectral/dist/testing";
import { itemsResponse } from "../../../tests/boxSdkResponses";
import { listFolderWithPagination } from "./listFolderWithPagination";

const mockGetFolderItems = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    folders: {
      getFolderItems: (...args: unknown[]) => mockGetFolderItems(...args),
    },
  }),
}));

const file = {
  id: "12345",
  type: "file",
  name: "Quarterly Report.pdf",
  etag: "1",
  sequence_id: "3",
};
const folder = {
  id: "47892301654",
  type: "folder",
  name: "Contracts",
  etag: "1",
  sequence_id: "3",
};

const boxConnection = { key: "apiKey", fields: { apiKey: "test-token" } };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("listFolderWithPagination", () => {
  test("returns the snake_case entries of a single page with its paging members", async () => {
    mockGetFolderItems.mockResolvedValue(
      itemsResponse({
        entries: [file, folder],
        limit: 2,
        next_marker: "next-page-marker",
      }),
    );

    const { result } = await invoke(listFolderWithPagination, {
      boxConnection,
      path: "/",
      fetchAll: false,
      fields: undefined,
      pagination: { limit: 2, marker: "", offset: 0 },
    } as never);

    expect(result).toEqual({
      data: {
        entries: [file, folder],
        pagination: { next_marker: "next-page-marker", limit: 2 },
      },
    });
    expect(mockGetFolderItems).toHaveBeenCalledWith(
      "0",
      expect.objectContaining({
        queryParams: expect.objectContaining({ usemarker: true, limit: 2 }),
      }),
    );
  });

  test("surfaces a Box error from the list call", async () => {
    mockGetFolderItems.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(listFolderWithPagination, {
        boxConnection,
        path: "/",
        fetchAll: false,
        fields: undefined,
        pagination: {},
      } as never),
    ).rejects.toThrow("Box responded 404");
  });
});
