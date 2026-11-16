import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import { createFolderExamplePayload, renameFolderExamplePayload } from "../../examplePayloads";
import { createFolder } from "./createFolder";
import { renameFolder } from "./renameFolder";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const DRIVE_ID = "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD";
const PARENT_ID = "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI";
const FOLDER_ID = "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT";
const FOLDER_NAME = "Project Files";
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("createFolder", () => {
  test("posts a folder that renames on conflict and returns it", async () => {
    const scope = nock(GRAPH)
      .post(`/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${PARENT_ID}/children`, {
        name: FOLDER_NAME,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      })
      .reply(201, createFolderExamplePayload.data);

    const { result } = await invoke(createFolder, {
      connection,
      siteId: SITE_ID,
      driveId: DRIVE_ID,
      parentItemId: PARENT_ID,
      folderName: FOLDER_NAME,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(createFolderExamplePayload);
  });

  test("rejects when the parent does not exist", async () => {
    nock(GRAPH)
      .post(`/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${PARENT_ID}/children`)
      .reply(404, notFound);

    await expect(
      invoke(createFolder, {
        connection,
        siteId: SITE_ID,
        driveId: DRIVE_ID,
        parentItemId: PARENT_ID,
        folderName: FOLDER_NAME,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("renameFolder", () => {
  test("patches the folder name and returns the folder", async () => {
    const scope = nock(GRAPH)
      .patch(`/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${FOLDER_ID}`, {
        name: FOLDER_NAME,
      })
      .reply(200, renameFolderExamplePayload.data);

    const { result } = await invoke(renameFolder, {
      connection,
      siteId: SITE_ID,
      driveId: DRIVE_ID,
      folderId: FOLDER_ID,
      folderName: FOLDER_NAME,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(renameFolderExamplePayload);
  });

  test("rejects when a sibling already has the name", async () => {
    nock(GRAPH)
      .patch(`/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/items/${FOLDER_ID}`)
      .reply(409, { error: { code: "nameAlreadyExists", message: "Name already exists." } });

    await expect(
      invoke(renameFolder, {
        connection,
        siteId: SITE_ID,
        driveId: DRIVE_ID,
        folderId: FOLDER_ID,
        folderName: FOLDER_NAME,
      }),
    ).rejects.toThrow("Request failed with status code 409");
  });
});
