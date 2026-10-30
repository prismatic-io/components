import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import {
  folderFullResponse,
  itemsResponse,
} from "../../../tests/boxSdkResponses";
import { apiKey } from "../../connections";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolder } from "./createFolder";

const mockGetFolderItems = vi.fn();
const mockCreateFolder = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    folders: {
      getFolderItems: (...args: unknown[]) => mockGetFolderItems(...args),
      createFolder: (...args: unknown[]) => mockCreateFolder(...args),
    },
  }),
}));

const folderContents: Record<string, Record<string, unknown>[]> = {
  "0": [
    {
      id: "100",
      type: "folder",
      name: "Projects",
      etag: "1",
      sequence_id: "1",
    },
  ],
  "100": [],
};

const boxConnection = createConnection(apiKey, {
  apiKey: "test-token-for-unit-tests",
});

beforeEach(() => {
  vi.clearAllMocks();
  mockGetFolderItems.mockImplementation((id: string) =>
    Promise.resolve(itemsResponse({ entries: folderContents[id] ?? [] })),
  );
});

describe("createFolder", () => {
  test("creates the final path segment under its parent and returns the snake_case folder", async () => {
    mockCreateFolder.mockResolvedValue(
      folderFullResponse(createFolderExamplePayload.data),
    );

    const { result } = await invoke(createFolder, {
      boxConnection,
      path: "/Projects/New Project Folder",
    });

    expect(result).toEqual({ data: createFolderExamplePayload.data });
    expect(mockCreateFolder).toHaveBeenCalledWith({
      name: "New Project Folder",
      parent: { id: "100" },
    });
  });

  test("surfaces a Box error from the create call", async () => {
    mockCreateFolder.mockRejectedValue(new Error("Box responded 400"));

    await expect(
      invoke(createFolder, {
        boxConnection,
        path: "/Projects/New Project Folder",
      }),
    ).rejects.toThrow("Box responded 400");
  });
});
