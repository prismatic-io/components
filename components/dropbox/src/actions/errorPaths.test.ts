import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import { oauthConnection } from "../connections";
import { getMetadata } from "./files/getMetadata";
import { createSharedLink } from "./links/createSharedLink";
import { getSharedMetadataForFile } from "./sharing/getSharedMetadataForFile";
import { getSharedMetadataForFolder } from "./sharing/getSharedMetadataForFolder";
import { unshareFile } from "./sharing/unshareFile";

const sdk = vi.hoisted(() => {
  class DropboxResponseError extends Error {
    status = 409;
  }
  const reject = () =>
    vi.fn().mockRejectedValue(new DropboxResponseError("conflict"));
  return {
    DropboxResponseError,
    filesGetMetadata: reject(),
    sharingCreateSharedLinkWithSettings: reject(),
    sharingGetFileMetadata: reject(),
    sharingGetFolderMetadata: reject(),
    sharingUnshareFile: reject(),
  };
});

vi.mock("dropbox", () => ({
  Dropbox: class DropboxMock {
    filesGetMetadata = sdk.filesGetMetadata;
    sharingCreateSharedLinkWithSettings =
      sdk.sharingCreateSharedLinkWithSettings;
    sharingGetFileMetadata = sdk.sharingGetFileMetadata;
    sharingGetFolderMetadata = sdk.sharingGetFolderMetadata;
    sharingUnshareFile = sdk.sharingUnshareFile;
  },
  DropboxResponseError: sdk.DropboxResponseError,
}));

const dropboxConnection = createConnection(
  oauthConnection,
  {},
  { access_token: "exampleAccessToken" },
);
const account = {
  dropboxConnection,
  userType: undefined,
  teamMemberId: undefined,
};

describe.each([
  {
    name: "getMetadata",
    given: "/missing/file.txt",
    run: () =>
      invoke(getMetadata, {
        ...account,
        path: "/missing/file.txt",
        resultOptions: {},
      } as never),
  },
  {
    name: "createSharedLink",
    given: "/missing/file.txt",
    run: () =>
      invoke(createSharedLink, {
        ...account,
        path: "/missing/file.txt",
        audience: undefined,
        linkSettings: {},
      } as never),
  },
  {
    name: "getSharedMetadataForFile",
    given: "id:missingFile",
    run: () =>
      invoke(getSharedMetadataForFile, {
        ...account,
        fileId: "id:missingFile",
      } as never),
  },
  {
    name: "getSharedMetadataForFolder",
    given: "missingFolder",
    run: () =>
      invoke(getSharedMetadataForFolder, {
        ...account,
        fileId: "missingFolder",
      } as never),
  },
  {
    name: "unshareFile",
    given: "id:missingFile",
    run: () =>
      invoke(unshareFile, { ...account, fileId: "id:missingFile" } as never),
  },
])("$name", ({ given, run }) => {
  test("names the given path or ID in a path error", async () => {
    await expect(run()).rejects.toThrow(`File paths: "${given}"`);
  });
});
