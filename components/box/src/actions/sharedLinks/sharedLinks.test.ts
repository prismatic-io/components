import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { axiosError } from "../../../tests/axiosAdapter";
import { apiKey } from "../../connections";
import {
  addSharedLinkToFileExamplePayload,
  addSharedLinkToFolderExamplePayload,
  removeSharedLinkFromFileExamplePayload,
  removeSharedLinkFromFolderExamplePayload,
  updateSharedLinkOnFolderExamplePayload,
  updateSharedLinkToFileExamplePayload,
} from "../../examplePayloads";
import { addSharedLinkToFile } from "./addSharedLinkToFile";
import { addSharedLinkToFolder } from "./addSharedLinkToFolder";
import { findFileForSharedLink } from "./findFileForSharedLink";
import { findFolderForSharedLink } from "./findFolderForSharedLink";
import { getSharedLinkForFile } from "./getSharedLinkForFile";
import { getSharedLinkForFolder } from "./getSharedLinkForFolder";
import { removeSharedLinkFromFile } from "./removeSharedLinkFromFile";
import { removeSharedLinkFromFolder } from "./removeSharedLinkFromFolder";
import { updateSharedLinkOnFolder } from "./updateSharedLinkOnFolder";
import { updateSharedLinkToFile } from "./updateSharedLinkToFile";

const mockGet = vi.fn();
const mockPut = vi.fn();

vi.mock("../../client", () => ({
  createBoxHttpClient: vi.fn().mockReturnValue({
    get: (...args: unknown[]) => mockGet(...args),
    put: (...args: unknown[]) => mockPut(...args),
  }),
}));

const SHARED_LINK = "https://app.box.com/s/abc123";
const SHARED_LINK_URL = "https://app.box.com/s/xyz789";

const boxConnection = createConnection(apiKey, { apiKey: "test-token" });

beforeEach(() => {
  vi.clearAllMocks();
  mockGet.mockResolvedValue({ data: { id: "12345", type: "file" } });
});

describe.each([
  ["findFileForSharedLink", findFileForSharedLink],
  ["findFolderForSharedLink", findFolderForSharedLink],
] as const)("%s", (_name, findAction) => {
  test("sends only the shared link in the boxapi header when no password is set", async () => {
    await invoke(findAction, {
      boxConnection,
      sharedLink: SHARED_LINK,
      sharedLinkPassword: "",
      fields: undefined,
    });

    expect(mockGet).toHaveBeenCalledWith(
      "/shared_items",
      expect.objectContaining({
        headers: { boxapi: `shared_link=${SHARED_LINK}` },
      }),
    );
  });

  test("appends the password segment to the boxapi header when one is set", async () => {
    await invoke(findAction, {
      boxConnection,
      sharedLink: SHARED_LINK,
      sharedLinkPassword: "s3cret",
      fields: undefined,
    });

    expect(mockGet).toHaveBeenCalledWith(
      "/shared_items",
      expect.objectContaining({
        headers: {
          boxapi: `shared_link=${SHARED_LINK}&shared_link_password=s3cret`,
        },
      }),
    );
  });
});

describe("getSharedLinkForFile", () => {
  test("returns the shared link URL", async () => {
    mockGet.mockResolvedValue({
      data: {
        id: "12345",
        type: "file",
        shared_link: { url: SHARED_LINK_URL },
      },
    });

    const { result } = await invoke(getSharedLinkForFile, {
      boxConnection,
      fileId: "12345",
    });

    expect(result).toEqual({ data: { sharedLink: SHARED_LINK_URL } });
  });

  test("rejects with a clear error when the file has no shared link", async () => {
    mockGet.mockResolvedValue({
      data: { id: "12345", type: "file", shared_link: null },
    });

    await expect(
      invoke(getSharedLinkForFile, { boxConnection, fileId: "12345" }),
    ).rejects.toThrow("File 12345 has no shared link.");
  });
});

describe("getSharedLinkForFolder", () => {
  test("returns the shared link URL", async () => {
    mockGet.mockResolvedValue({
      data: {
        id: "67890",
        type: "folder",
        shared_link: { url: SHARED_LINK_URL },
      },
    });

    const { result } = await invoke(getSharedLinkForFolder, {
      boxConnection,
      folderId: "67890",
    });

    expect(result).toEqual({ data: { sharedLink: SHARED_LINK_URL } });
  });

  test("rejects with a clear error when the folder has no shared link", async () => {
    mockGet.mockResolvedValue({
      data: { id: "67890", type: "folder", shared_link: null },
    });

    await expect(
      invoke(getSharedLinkForFolder, { boxConnection, folderId: "67890" }),
    ).rejects.toThrow("Folder 67890 has no shared link.");
  });
});

const BOX_NOT_FOUND = {
  type: "error",
  status: 404,
  code: "not_found",
  message: "Not Found",
};
const REQUEST_FAILED = "Request failed with status code 404";

const additionalFields = {
  sharedLinkPassword: "",
  sharedLinkPermissions: { can_download: true, can_preview: true },
  sharedLinkVanityName: undefined,
};

describe("addSharedLinkToFile", () => {
  test("puts the shared link settings on the file and returns the Box body", async () => {
    mockPut.mockResolvedValue({ data: addSharedLinkToFileExamplePayload.data });

    const { result } = await invoke(addSharedLinkToFile, {
      boxConnection,
      fileId: "53286756412",
      fields: SHARED_LINK,
      sharedLinkAccess: "open",
      additionalFields,
    });

    expect(result).toEqual({ data: addSharedLinkToFileExamplePayload.data });
    expect(mockPut).toHaveBeenCalledWith(
      "/files/53286756412",
      {
        shared_link: {
          access: "open",
          password: null,
          permissions: { can_download: true, can_preview: true },
          vanity_name: null,
        },
      },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(addSharedLinkToFile, {
        boxConnection,
        fileId: "53286756412",
        fields: SHARED_LINK,
        sharedLinkAccess: "open",
        additionalFields,
      }),
    ).rejects.toThrow(REQUEST_FAILED);
  });
});

describe("addSharedLinkToFolder", () => {
  test("puts the shared link settings on the folder with editing disabled", async () => {
    mockPut.mockResolvedValue({
      data: addSharedLinkToFolderExamplePayload.data,
    });

    const { result } = await invoke(addSharedLinkToFolder, {
      boxConnection,
      folderId: "67890",
      sharedLink: SHARED_LINK,
      sharedLinkAccess: "open",
      additionalFields,
    });

    expect(result).toEqual({ data: addSharedLinkToFolderExamplePayload.data });
    expect(mockPut).toHaveBeenCalledWith(
      "/folders/67890",
      {
        shared_link: {
          access: "open",
          password: null,
          permissions: {
            can_download: true,
            can_preview: true,
            can_edit: false,
          },
          vanity_name: null,
        },
      },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(addSharedLinkToFolder, {
        boxConnection,
        folderId: "67890",
        sharedLink: SHARED_LINK,
        sharedLinkAccess: "open",
        additionalFields,
      }),
    ).rejects.toThrow(REQUEST_FAILED);
  });
});

describe("updateSharedLinkToFile", () => {
  test("puts the new shared link settings on the file and returns the Box body", async () => {
    mockPut.mockResolvedValue({
      data: updateSharedLinkToFileExamplePayload.data,
    });

    const { result } = await invoke(updateSharedLinkToFile, {
      boxConnection,
      fileId: "53286756412",
      sharedLink: SHARED_LINK,
      sharedLinkAccess: "company",
      additionalFields: {
        ...additionalFields,
        sharedLinkPassword: "s3cret",
        sharedLinkVanityName: "q4-report",
      },
    });

    expect(result).toEqual({ data: updateSharedLinkToFileExamplePayload.data });
    expect(mockPut).toHaveBeenCalledWith(
      "/files/53286756412",
      {
        shared_link: {
          access: "company",
          password: "s3cret",
          permissions: { can_download: true, can_preview: true },
          vanity_name: "q4-report",
        },
      },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(updateSharedLinkToFile, {
        boxConnection,
        fileId: "53286756412",
        sharedLink: SHARED_LINK,
        sharedLinkAccess: "company",
        additionalFields,
      }),
    ).rejects.toThrow(REQUEST_FAILED);
  });
});

describe("updateSharedLinkOnFolder", () => {
  test("puts the link URL and settings on the folder with editing disabled", async () => {
    mockPut.mockResolvedValue({
      data: updateSharedLinkOnFolderExamplePayload.data,
    });

    const { result } = await invoke(updateSharedLinkOnFolder, {
      boxConnection,
      folderId: "67890",
      sharedLink: SHARED_LINK,
      sharedLinkAccess: "company",
      additionalFields,
    });

    expect(result).toEqual({
      data: updateSharedLinkOnFolderExamplePayload.data,
    });
    expect(mockPut).toHaveBeenCalledWith(
      "/folders/67890",
      {
        shared_link: {
          url: SHARED_LINK,
          access: "company",
          password: null,
          permissions: {
            can_download: true,
            can_preview: true,
            can_edit: false,
          },
          vanity_name: null,
        },
      },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(updateSharedLinkOnFolder, {
        boxConnection,
        folderId: "67890",
        sharedLink: SHARED_LINK,
        sharedLinkAccess: "company",
        additionalFields,
      }),
    ).rejects.toThrow(REQUEST_FAILED);
  });
});

describe("removeSharedLinkFromFile", () => {
  test("clears the file shared link and returns the Box body", async () => {
    mockPut.mockResolvedValue({
      data: removeSharedLinkFromFileExamplePayload.data,
    });

    const { result } = await invoke(removeSharedLinkFromFile, {
      boxConnection,
      fileId: "53286756412",
    });

    expect(result).toEqual({
      data: removeSharedLinkFromFileExamplePayload.data,
    });
    expect(mockPut).toHaveBeenCalledWith(
      "/files/53286756412",
      { shared_link: null },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(removeSharedLinkFromFile, {
        boxConnection,
        fileId: "53286756412",
      }),
    ).rejects.toThrow(REQUEST_FAILED);
  });

  test("leaves the Box error for the component error hook to summarize", async () => {
    const boxError = axiosError(404, BOX_NOT_FOUND);
    mockPut.mockRejectedValue(boxError);

    await expect(
      invoke(removeSharedLinkFromFile, {
        boxConnection,
        fileId: "53286756412",
      }),
    ).rejects.toBe(boxError);
  });
});

describe("removeSharedLinkFromFolder", () => {
  test("clears the folder shared link and returns the Box body", async () => {
    mockPut.mockResolvedValue({
      data: removeSharedLinkFromFolderExamplePayload.data,
    });

    const { result } = await invoke(removeSharedLinkFromFolder, {
      boxConnection,
      folderId: "67890",
    });

    expect(result).toEqual({
      data: removeSharedLinkFromFolderExamplePayload.data,
    });
    expect(mockPut).toHaveBeenCalledWith(
      "/folders/67890",
      { shared_link: null },
      { params: { fields: "shared_link" } },
    );
  });

  test("surfaces a Box error from the update call", async () => {
    mockPut.mockRejectedValue(axiosError(404, BOX_NOT_FOUND));

    await expect(
      invoke(removeSharedLinkFromFolder, { boxConnection, folderId: "67890" }),
    ).rejects.toThrow(REQUEST_FAILED);
  });
});
