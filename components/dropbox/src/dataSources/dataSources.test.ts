import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import { oauthConnection } from "../connections";
import { listFolders } from "./listFolders";
import { listSharedFolders } from "./listSharedFolders";
import { listTeamFolders } from "./listTeamFolders";

const sdk = vi.hoisted(() => ({
  filesListFolder: vi.fn(),
  filesListFolderContinue: vi.fn(),
  sharingListFolders: vi.fn(),
  sharingListFoldersContinue: vi.fn(),
  teamTeamFolderList: vi.fn(),
  teamTeamFolderListContinue: vi.fn(),
}));

vi.mock("dropbox", () => ({
  Dropbox: class DropboxMock {
    filesListFolder = sdk.filesListFolder;
    filesListFolderContinue = sdk.filesListFolderContinue;
    sharingListFolders = sdk.sharingListFolders;
    sharingListFoldersContinue = sdk.sharingListFoldersContinue;
    teamTeamFolderList = sdk.teamTeamFolderList;
    teamTeamFolderListContinue = sdk.teamTeamFolderListContinue;
  },
  DropboxResponseError: class DropboxResponseError extends Error {},
}));

const connection = createConnection(
  oauthConnection,
  {},
  { access_token: "exampleAccessToken" },
);

beforeEach(() => {
  vi.clearAllMocks();
  sdk.filesListFolder.mockResolvedValue({ result: { entries: [] } });
  sdk.filesListFolderContinue.mockResolvedValue({ result: { entries: [] } });
  sdk.sharingListFolders.mockResolvedValue({ result: { entries: [] } });
  sdk.sharingListFoldersContinue.mockResolvedValue({ result: { entries: [] } });
  sdk.teamTeamFolderList.mockResolvedValue({ result: { team_folders: [] } });
  sdk.teamTeamFolderListContinue.mockResolvedValue({
    result: { team_folders: [] },
  });
});

describe.each([
  {
    name: "listFolders",
    run: (cursor?: string) =>
      invokeDataSource(listFolders, {
        connection,
        path: "",
        cursor,
        limit: undefined,
        recursive: false,
        userType: undefined,
        teamMemberId: undefined,
        entryFilter: "all",
      }),
    first: sdk.filesListFolder,
    next: sdk.filesListFolderContinue,
  },
  {
    name: "listSharedFolders",
    run: (cursor?: string) =>
      invokeDataSource(listSharedFolders, {
        connection,
        path: "",
        cursor,
        limit: undefined,
        folderActions: undefined,
      }),
    first: sdk.sharingListFolders,
    next: sdk.sharingListFoldersContinue,
  },
  {
    name: "listTeamFolders",
    run: (cursor?: string) =>
      invokeDataSource(listTeamFolders, {
        connection,
        path: "",
        cursor,
        limit: undefined,
      }),
    first: sdk.teamTeamFolderList,
    next: sdk.teamTeamFolderListContinue,
  },
])("$name", ({ run, first, next }) => {
  test("reads the first page when no cursor is given", async () => {
    await run(undefined);
    expect(first).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
  });

  test("continues from a given cursor", async () => {
    await run("exampleCursor");
    expect(next).toHaveBeenCalledWith({ cursor: "exampleCursor" });
    expect(first).not.toHaveBeenCalled();
  });
});
