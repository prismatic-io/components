import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import {
  folderFullResponse,
  itemsResponse,
} from "../../../tests/boxSdkResponses";
import { apiKey } from "../../connections";
import {
  copyObjectExamplePayload,
  moveObjectExamplePayload,
} from "../../examplePayloads";
import { copyObject } from "./copyObject";
import { deleteObject } from "./deleteObject";
import { moveObject } from "./moveObject";
import { pathDetails } from "./pathDetails";

const mockGetFolderItems = vi.fn();
const mockCopyFolder = vi.fn();
const mockUpdateFolderById = vi.fn();
const mockDeleteFileById = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    folders: {
      getFolderItems: (...args: unknown[]) => mockGetFolderItems(...args),
      copyFolder: (...args: unknown[]) => mockCopyFolder(...args),
      updateFolderById: (...args: unknown[]) => mockUpdateFolderById(...args),
    },
    files: {
      deleteFileById: (...args: unknown[]) => mockDeleteFileById(...args),
    },
  }),
}));

const entry = (id: string, type: string, name: string) => ({
  id,
  type,
  name,
  etag: "1",
  sequence_id: "1",
});

const folderContents: Record<string, Record<string, unknown>[]> = {
  "0": [entry("100", "folder", "Reports"), entry("300", "folder", "Archive")],
  "100": [entry("200", "file", "q1.pdf")],
  "300": [],
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

describe("copyObject", () => {
  test("copies a folder into the destination parent under the new name", async () => {
    mockCopyFolder.mockResolvedValue(
      folderFullResponse(copyObjectExamplePayload.data),
    );

    const { result } = await invoke(copyObject, {
      boxConnection,
      fromPath: "/Reports",
      toPath: "/Archive/Documents Backup",
    });

    expect(result).toEqual({ data: copyObjectExamplePayload.data });
    expect(mockCopyFolder).toHaveBeenCalledWith("100", {
      parent: { id: "300" },
      name: "Documents Backup",
    });
  });

  test("surfaces a Box error from the copy call", async () => {
    mockCopyFolder.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(copyObject, {
        boxConnection,
        fromPath: "/Reports",
        toPath: "/Archive/Documents Backup",
      }),
    ).rejects.toThrow("Box responded 404");
  });
});

describe("moveObject", () => {
  test("reparents a folder under the destination folder", async () => {
    mockUpdateFolderById.mockResolvedValue(
      folderFullResponse(moveObjectExamplePayload.data),
    );

    const { result } = await invoke(moveObject, {
      boxConnection,
      fromPath: "/Reports",
      toPath: "/Archive",
    });

    expect(result).toEqual({ data: moveObjectExamplePayload.data });
    expect(mockUpdateFolderById).toHaveBeenCalledWith("100", {
      requestBody: { parent: { id: "300" } },
    });
  });

  test("rejects a destination that is not a folder", async () => {
    await expect(
      invoke(moveObject, {
        boxConnection,
        fromPath: "/Archive",
        toPath: "/Reports/q1.pdf",
      }),
    ).rejects.toThrow("'q1.pdf' is not a folder");
    expect(mockUpdateFolderById).not.toHaveBeenCalled();
  });
});

describe("deleteObject", () => {
  test("deletes a file and returns an empty body", async () => {
    mockDeleteFileById.mockResolvedValue(undefined);

    const { result } = await invoke(deleteObject, {
      boxConnection,
      path: "/Reports/q1.pdf",
    });

    expect(result).toEqual({ data: {} });
    expect(mockDeleteFileById).toHaveBeenCalledWith("200");
  });

  test("surfaces a Box error from the delete call", async () => {
    mockDeleteFileById.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(deleteObject, { boxConnection, path: "/Reports/q1.pdf" }),
    ).rejects.toThrow("Box responded 404");
  });
});

describe("pathDetails", () => {
  test("returns one entry per path segment, root first", async () => {
    const { result } = await invoke(pathDetails, {
      boxConnection,
      path: "/Reports/q1.pdf",
    });

    expect(result).toEqual({
      data: [
        { id: "0", type: "folder", name: "" },
        { id: "100", type: "folder", name: "Reports" },
        { id: "200", type: "file", name: "q1.pdf" },
      ],
    });
  });

  test("rejects a path with a segment that does not exist", async () => {
    await expect(
      invoke(pathDetails, { boxConnection, path: "/Missing" }),
    ).rejects.toThrow("Expected 'Missing' to exist in path '/Missing'");
  });
});
