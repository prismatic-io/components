import { testing } from "@prismatic-io/spectral";
import nock from "nock";
import component from "../..";
import {
  createMailFolderExamplePayload,
  listMailFoldersExamplePayload,
} from "../../examplePayloads";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../../testHelpers";

const FOLDER_ID = "AQMkADYAAAIBDAAAAA==";
const PARENT_FOLDER_ID = "AQMkADYAAAIBCAAAAA==";
const GRAPH_ERROR = { error: { code: "ErrorItemNotFound", message: "Not found." } };

const harness = testing.createHarness(component);

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("listMailFolders", () => {
  test("lists the mailbox's root folders", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/users/${CLIENT_CREDENTIALS_USER_ID}/mailFolders`)
      .reply(200, listMailFoldersExamplePayload.data);

    const result = await harness.action("listMailFolders", {
      connection: clientCredentialsConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(listMailFoldersExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).get("/v1.0/me/mailFolders").reply(500, GRAPH_ERROR);

    await expect(
      harness.action("listMailFolders", { connection: delegatedConnection() }),
    ).rejects.toThrow();
  });
});

describe("createMailFolder", () => {
  test("creates the folder under the parent folder", async () => {
    const scope = nock(GRAPH_HOST)
      .post(`/v1.0/me/mailFolders/${PARENT_FOLDER_ID}/childFolders`, {
        displayName: "Project Files",
      })
      .reply(201, createMailFolderExamplePayload.data);

    const result = await harness.action("createMailFolder", {
      connection: delegatedConnection(),
      parentFolderId: PARENT_FOLDER_ID,
      name: "Project Files",
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual(createMailFolderExamplePayload.data);
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).post("/v1.0/me/mailFolders").reply(409, GRAPH_ERROR);

    await expect(
      harness.action("createMailFolder", {
        connection: delegatedConnection(),
        name: "Project Files",
      }),
    ).rejects.toThrow();
  });
});

describe("deleteMailFolder", () => {
  test("deletes the folder", async () => {
    const scope = nock(GRAPH_HOST).delete(`/v1.0/me/mailFolders/${FOLDER_ID}`).reply(204);

    const result = await harness.action("deleteMailFolder", {
      connection: delegatedConnection(),
      folderId: FOLDER_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result?.data).toEqual({
      success: true,
      id: FOLDER_ID,
      message: "Mail folder deleted successfully",
    });
  });

  test("rejects when Graph returns an error", async () => {
    nock(GRAPH_HOST).delete(`/v1.0/me/mailFolders/${FOLDER_ID}`).reply(404, GRAPH_ERROR);

    await expect(
      harness.action("deleteMailFolder", {
        connection: delegatedConnection(),
        folderId: FOLDER_ID,
      }),
    ).rejects.toThrow();
  });
});
