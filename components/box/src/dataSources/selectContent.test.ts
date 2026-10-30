import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import { itemsResponse } from "../../tests/boxSdkResponses";
import { apiKey } from "../connections";
import { selectContentExamplePayload } from "../examplePayloads";
import { selectContent } from "./selectContent";

const mockGetFolderItems = vi.fn();

vi.mock("../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    folders: {
      getFolderItems: (...args: unknown[]) => mockGetFolderItems(...args),
    },
  }),
}));

const rootEntries = [
  {
    id: "47892301654",
    type: "folder",
    name: "Quarterly Reports",
    etag: "1",
    sequence_id: "1",
  },
  {
    id: "1234567890",
    type: "file",
    name: "invoice.pdf",
    etag: "1",
    sequence_id: "1",
  },
];

const boxConnection = createConnection(apiKey, {
  apiKey: "test-token-for-unit-tests",
});

const params = (contentType: string) =>
  ({
    boxConnection,
    contentType,
    limit: undefined,
    marker: undefined,
    offset: undefined,
  }) as never;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("selectContent", () => {
  test("lists every root entry labeled by name and type", async () => {
    mockGetFolderItems.mockResolvedValue(
      itemsResponse({ entries: rootEntries }),
    );

    const result = await invokeDataSource(selectContent, params("all"));

    expect(result).toEqual(selectContentExamplePayload);
    expect(mockGetFolderItems).toHaveBeenCalledWith("0", expect.anything());
  });

  test("keeps only the entries of the selected content type", async () => {
    mockGetFolderItems.mockResolvedValue(
      itemsResponse({ entries: rootEntries }),
    );

    const result = await invokeDataSource(selectContent, params("file"));

    expect(result).toEqual({
      result: [{ label: "invoice.pdf (file)", key: "1234567890" }],
    });
  });

  test("returns an empty list when the root folder is empty", async () => {
    mockGetFolderItems.mockResolvedValue(itemsResponse({ entries: [] }));

    const result = await invokeDataSource(selectContent, params("all"));

    expect(result).toEqual({ result: [] });
  });
});
