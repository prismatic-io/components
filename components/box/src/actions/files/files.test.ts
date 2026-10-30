import { Readable } from "node:stream";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { stubAxiosAdapter } from "../../../tests/axiosAdapter";
import { filesResponse, itemsResponse } from "../../../tests/boxSdkResponses";
import { apiKey } from "../../connections";
import {
  getFileDownloadUrlExamplePayload,
  uploadFileExamplePayload,
} from "../../examplePayloads";
import { downloadFile } from "./downloadFile";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { uploadFile } from "./uploadFile";

const mockGetFolderItems = vi.fn();
const mockGetDownloadFileUrl = vi.fn();
const mockUploadFile = vi.fn();

vi.mock("../../client", () => ({
  createAuthorizedClient: vi.fn().mockReturnValue({
    folders: {
      getFolderItems: (...args: unknown[]) => mockGetFolderItems(...args),
    },
    downloads: {
      getDownloadFileUrl: (...args: unknown[]) =>
        mockGetDownloadFileUrl(...args),
    },
    uploads: {
      uploadFile: (...args: unknown[]) => mockUploadFile(...args),
    },
  }),
}));

const reportsFolder = {
  id: "100",
  type: "folder",
  name: "Reports",
  etag: "1",
  sequence_id: "1",
};
const reportFile = {
  id: "200",
  type: "file",
  name: "q1.pdf",
  etag: "1",
  sequence_id: "1",
};

const folderContents: Record<string, Record<string, unknown>[]> = {
  "0": [reportsFolder],
  "100": [reportFile],
};

const DOWNLOAD_URL = getFileDownloadUrlExamplePayload.data;

const boxConnection = createConnection(apiKey, {
  apiKey: "test-token-for-unit-tests",
});

beforeEach(() => {
  vi.clearAllMocks();
  mockGetFolderItems.mockImplementation((id: string) =>
    Promise.resolve(itemsResponse({ entries: folderContents[id] ?? [] })),
  );
  mockGetDownloadFileUrl.mockResolvedValue(DOWNLOAD_URL);
});

describe("downloadFile", () => {
  let http: ReturnType<typeof stubAxiosAdapter>;

  afterEach(() => http?.restore());

  test("downloads the file body from the URL Box returns", async () => {
    const body = Buffer.from("example");
    http = stubAxiosAdapter(() => ({
      status: 200,
      data: body,
      headers: { "content-type": "application/pdf" },
    }));

    const { result } = await invoke(downloadFile, {
      boxConnection,
      path: "/Reports/q1.pdf",
    });

    expect(result).toEqual({ data: body, contentType: "application/pdf" });
    expect(mockGetDownloadFileUrl).toHaveBeenCalledWith("200");
    expect(http.calls).toHaveLength(1);
    expect(http.calls[0]).toMatchObject({
      baseURL: DOWNLOAD_URL,
      method: "get",
      responseType: "arraybuffer",
    });
  });

  test("rejects a path that resolves to a folder", async () => {
    http = stubAxiosAdapter(() => ({ status: 200, data: Buffer.from("") }));

    await expect(
      invoke(downloadFile, { boxConnection, path: "/Reports" }),
    ).rejects.toThrow("'Reports' is not a file");
    expect(mockGetDownloadFileUrl).not.toHaveBeenCalled();
    expect(http.calls).toHaveLength(0);
  });
});

describe("getFileDownloadUrl", () => {
  test("returns the download URL Box resolves for the file", async () => {
    const { result } = await invoke(getFileDownloadUrl, {
      boxConnection,
      path: "/Reports/q1.pdf",
    });

    expect(result).toEqual({ data: DOWNLOAD_URL });
    expect(mockGetDownloadFileUrl).toHaveBeenCalledWith("200");
  });

  test("surfaces a Box error from the download URL call", async () => {
    mockGetDownloadFileUrl.mockRejectedValue(new Error("Box responded 404"));

    await expect(
      invoke(getFileDownloadUrl, { boxConnection, path: "/Reports/q1.pdf" }),
    ).rejects.toThrow("Box responded 404");
  });
});

describe("uploadFile", () => {
  test("uploads to the parent folder under the final path segment's name", async () => {
    mockUploadFile.mockResolvedValue(
      filesResponse(uploadFileExamplePayload.data),
    );

    const { result } = await invoke(uploadFile, {
      boxConnection,
      path: "/Reports/report.pdf",
      fileContents: "My File Contents",
    });

    expect(result).toEqual({ data: uploadFileExamplePayload.data });
    expect(mockUploadFile).toHaveBeenCalledWith({
      attributes: { name: "report.pdf", parent: { id: "100" } },
      file: expect.any(Readable),
    });
  });

  test("surfaces a Box error from the upload call", async () => {
    mockUploadFile.mockRejectedValue(new Error("Box responded 400"));

    await expect(
      invoke(uploadFile, {
        boxConnection,
        path: "/Reports/report.pdf",
        fileContents: "My File Contents",
      }),
    ).rejects.toThrow("Box responded 400");
  });
});
