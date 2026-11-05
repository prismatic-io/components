import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import {
  createFoldersExamplePayload,
  getFolderJobStatusExamplePayload,
} from "../../examplePayloads";
import { cleanFolderPaths } from "../../utils";
import { createFolders } from "./createFolders";
import { deleteFolders } from "./deleteFolders";
import { getFolderJobStatus } from "./getFolderJobStatus";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);
const folderJobExamplePayload = getFolderJobStatusExamplePayload;
const job = folderJobExamplePayload.data;
const conflict = {
  type: "https://api.adobeaemcloud.com/adobe/meta/errors/conflict",
  title: "Conflict",
  detail: "An entity already exists at /content/dam/a",
  path: "/content/dam/a",
};

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("createFolders", () => {
  test("posts one entry per path and returns the command result", async () => {
    nock(BASE)
      .post("/adobe/folders/", [{ path: "/content/dam/a" }, { path: "/content/dam/b" }])
      .reply(200, createFoldersExamplePayload.data);
    const { result } = await invoke(createFolders, {
      connection,
      folderPaths: ["/content/dam/a", "/content/dam/b"],
    });
    expect(result).toEqual(createFoldersExamplePayload);
  });

  test("returns a job when Adobe accepts the request as one", async () => {
    nock(BASE).post("/adobe/folders/").reply(202, job);
    const { result } = await invoke(createFolders, { connection, folderPaths: ["/content/dam/a"] });
    expect(result).toEqual(folderJobExamplePayload);
  });

  test("fails when a 200 result created no folder", async () => {
    nock(BASE)
      .post("/adobe/folders/")
      .reply(200, {
        operation: "adobe.folders.createFolders",
        status: 200,
        description: "No folders were created.",
        data: { values: { successes: [], failedFolders: [conflict] } },
      });
    await expect(
      invoke(createFolders, { connection, folderPaths: ["/content/dam/a"] }),
    ).rejects.toThrow("No folders were created. An entity already exists at /content/dam/a");
  });

  test("returns a partial success with its failures listed", async () => {
    const partial = {
      operation: "adobe.folders.createFolders",
      status: 200,
      description: "Some folders were created; others failed.",
      data: {
        values: {
          successes: [
            { type: "FOLDER", folderId: "urn:aaid:aem:b", name: "b", path: "/content/dam/b" },
          ],
          failedFolders: [conflict],
        },
      },
    };
    nock(BASE).post("/adobe/folders/").reply(200, partial);
    const { result } = await invoke(createFolders, {
      connection,
      folderPaths: ["/content/dam/a", "/content/dam/b"],
    });
    expect(result).toEqual({ data: partial });
  });

  test("Folder Paths clean trims entries and drops blanks", () => {
    expect(cleanFolderPaths([" /content/dam/a ", "", "/content/dam/b"])).toEqual([
      "/content/dam/a",
      "/content/dam/b",
    ]);
  });

  test("surfaces a request-level 403", async () => {
    nock(BASE).post("/adobe/folders/").reply(403, {});
    await expect(
      invoke(createFolders, { connection, folderPaths: ["/content/dam/a"] }),
    ).rejects.toThrow("403");
  });

  test("Folder Paths clean rejects an empty list", () => {
    expect(() => cleanFolderPaths(["  ", ""])).toThrow("at least one folder path");
  });
});

describe("deleteFolders", () => {
  test("posts the paths with recursive and force and returns the job", async () => {
    nock(BASE)
      .post("/adobe/folders/delete", { paths: ["/content/dam/a"], recursive: true, force: false })
      .reply(202, job);
    const { result } = await invoke(deleteFolders, {
      connection,
      folderPaths: ["/content/dam/a"],
      recursive: true,
      force: false,
    });
    expect(result).toEqual(folderJobExamplePayload);
  });

  test("fails when a 200 result deleted nothing and reported errors", async () => {
    nock(BASE)
      .post("/adobe/folders/delete")
      .reply(200, {
        operation: "adobe.folders.deleteFolders",
        status: 200,
        description: "Errors encountered while deleting folders.",
        data: { deletedFolders: [], failedFolders: [] },
        errors: [{ title: "Not Found", detail: "Folder not found: /content/dam/missing" }],
      });
    await expect(
      invoke(deleteFolders, {
        connection,
        folderPaths: ["/content/dam/missing"],
        recursive: false,
        force: false,
      }),
    ).rejects.toThrow(
      "Errors encountered while deleting folders. Folder not found: /content/dam/missing",
    );
  });

  test("surfaces a request-level 403", async () => {
    nock(BASE).post("/adobe/folders/delete").reply(403, {});
    await expect(
      invoke(deleteFolders, {
        connection,
        folderPaths: ["/content/dam/a"],
        recursive: false,
        force: false,
      }),
    ).rejects.toThrow("403");
  });
});

describe("getFolderJobStatus", () => {
  test("returns the job state", async () => {
    nock(BASE).get(`/adobe/folders/jobs/${job.jobId}/status`).reply(200, job);
    const { result } = await invoke(getFolderJobStatus, { connection, jobId: job.jobId });
    expect(result).toEqual(folderJobExamplePayload);
  });

  test("surfaces a 404", async () => {
    nock(BASE).get("/adobe/folders/jobs/missing/status").reply(404, {});
    await expect(invoke(getFolderJobStatus, { connection, jobId: "missing" })).rejects.toThrow(
      "404",
    );
  });
});
