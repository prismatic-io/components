import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import {
  getItemByIdExamplePayload,
  getItemExamplePayload,
  listChangesExamplePayload,
  listChildrenExamplePayload,
  listDriveItemsExamplePayload,
  listSharedExamplePayload,
  listSharedFilesExamplePayload,
  moveFileExamplePayload,
  searchDriveExamplePayload,
  updateFileExamplePayload,
  uploadFileExamplePayload,
} from "../../examplePayloads";
import { deleteFile } from "./deleteFile";
import { downloadFile } from "./downloadFile";
import { getItem } from "./getItem";
import { getItemById } from "./getItemById";
import { listChanges } from "./listChanges";
import { listChildren } from "./listChildren";
import { listDriveItems } from "./listDriveItems";
import { listShared } from "./listShared";
import { listSharedFiles } from "./listSharedFiles";
import { moveFile } from "./moveFile";
import { searchDrive } from "./searchDrive";
import { updateFile } from "./updateFile";
import { uploadFile } from "./uploadFile";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const DRIVE_ID =
  "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd";
const ITEM_ID = "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K";
const FILE_PATH = "/Reports/Q4-2024.xlsx";
const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const pagination = { pageLimit: 2, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "2", $skiptoken: "X%2744537079ghv" };
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

describe("getItem", () => {
  test("returns the item at the given path", async () => {
    nock(BASE_URL)
      .get(`/me/drive/root:${FILE_PATH}`)
      .reply(200, getItemExamplePayload.data);

    const { result } = await invoke(getItem, { connection, dir: FILE_PATH });

    expect(result).toEqual(getItemExamplePayload);
  });

  test("rejects when the item does not exist", async () => {
    nock(BASE_URL).get(`/me/drive/root:${FILE_PATH}`).reply(404, notFound);

    await expect(
      invoke(getItem, { connection, dir: FILE_PATH }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("getItemById", () => {
  test("returns the item", async () => {
    nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}/items/${ITEM_ID}`)
      .reply(200, getItemByIdExamplePayload.data);

    const { result } = await invoke(getItemById, {
      connection,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
    });

    expect(result).toEqual(getItemByIdExamplePayload);
  });

  test("rejects when the item does not exist", async () => {
    nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}/items/${ITEM_ID}`)
      .reply(404, notFound);

    await expect(
      invoke(getItemById, { connection, driveId: DRIVE_ID, itemId: ITEM_ID }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("listChildren", () => {
  test("returns one page of the item's children", async () => {
    nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}/items/${ITEM_ID}/children`)
      .query(pageQuery)
      .reply(200, listChildrenExamplePayload.data);

    const { result } = await invoke(listChildren, {
      connection,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listChildrenExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get(`/drives/${DRIVE_ID}/items/${ITEM_ID}/children`)
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(listChildren, {
        connection,
        driveId: DRIVE_ID,
        itemId: ITEM_ID,
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow();
  });
});

describe("listDriveItems", () => {
  test("returns one page of the directory's items", async () => {
    nock(BASE_URL)
      .get("/me/drive/root:/Reports:/children")
      .query(pageQuery)
      .reply(200, listDriveItemsExamplePayload.data);

    const { result } = await invoke(listDriveItems, {
      connection,
      dir: "/Reports",
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listDriveItemsExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get("/me/drive/root:/Reports:/children")
      .query(pageQuery)
      .reply(404, notFound);

    await expect(
      invoke(listDriveItems, {
        connection,
        dir: "/Reports",
        fetchAll: false,
        pagination,
      }),
    ).rejects.toThrow();
  });
});

describe("listSharedFiles", () => {
  test("returns one page of the files shared with the user", async () => {
    nock(BASE_URL)
      .get("/me/drive/sharedWithMe")
      .query(pageQuery)
      .reply(200, listSharedFilesExamplePayload.data);

    const { result } = await invoke(listSharedFiles, {
      connection,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listSharedFilesExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get("/me/drive/sharedWithMe")
      .query(pageQuery)
      .reply(403, {});

    await expect(
      invoke(listSharedFiles, { connection, fetchAll: false, pagination }),
    ).rejects.toThrow();
  });
});

describe("listShared", () => {
  test("returns the items shared by the user", async () => {
    nock(BASE_URL)
      .get("/me/insights/shared")
      .reply(200, listSharedExamplePayload.data);

    const { result } = await invoke(listShared, { connection });

    expect(result).toEqual(listSharedExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).get("/me/insights/shared").reply(403, {});

    await expect(invoke(listShared, { connection })).rejects.toThrow(
      "Status: 403",
    );
  });
});

describe("listChanges", () => {
  const deltaURL = `/drives/${DRIVE_ID}/root/delta`;
  const queryParameters = {
    $select: "id,name",
    $expand: undefined,
    $top: 5,
  };

  test("returns the delta page with the query options forwarded", async () => {
    nock(BASE_URL)
      .get(deltaURL)
      .query({ $select: "id,name", $top: "5" })
      .reply(200, listChangesExamplePayload.data);

    const { result } = await invoke(listChanges, {
      oneDriveConnection: connection,
      deltaURL,
      queryParameters,
    });

    expect(result).toEqual(listChangesExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get(deltaURL)
      .query({ $select: "id,name", $top: "5" })
      .reply(410, { error: { code: "resyncRequired" } });

    await expect(
      invoke(listChanges, {
        oneDriveConnection: connection,
        deltaURL,
        queryParameters,
      }),
    ).rejects.toThrow();
  });
});

describe("searchDrive", () => {
  test("returns the matching items", async () => {
    nock(BASE_URL)
      .get("/me/drive/root/search(q='quarterly')")
      .reply(200, searchDriveExamplePayload.data);

    const { result } = await invoke(searchDrive, {
      connection,
      search: "quarterly",
    });

    expect(result).toEqual(searchDriveExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .get("/me/drive/root/search(q='quarterly')")
      .reply(400, { error: { code: "invalidRequest", message: "Bad query" } });

    await expect(
      invoke(searchDrive, { connection, search: "quarterly" }),
    ).rejects.toThrow("Status: 400 code: invalidRequest");
  });

  test("interpolates the search term into the OData literal without escaping", async () => {
    const scope = nock(BASE_URL)
      .get("/me/drive/root/search(q='Ada's%20notes')")
      .reply(200, searchDriveExamplePayload.data);

    await invoke(searchDrive, { connection, search: "Ada's notes" });

    expect(scope.isDone()).toBe(true);
  });
});

describe("moveFile", () => {
  test("patches the item with its new parent and name", async () => {
    nock(BASE_URL)
      .patch(`/me/drive/root:${FILE_PATH}`, {
        parentReference: { path: "/drive/root:/Archive" },
        name: "Q4-2024-final.xlsx",
      })
      .reply(200, moveFileExamplePayload.data);

    const { result } = await invoke(moveFile, {
      connection,
      dir: FILE_PATH,
      path: "/Archive",
      fileName: "Q4-2024-final.xlsx",
    });

    expect(result).toEqual(moveFileExamplePayload);
  });

  test("keeps a destination that already names the drive root", async () => {
    nock(BASE_URL)
      .patch(`/me/drive/root:${FILE_PATH}`, {
        parentReference: { path: "/drive/root:/Archive" },
        name: "Q4-2024-final.xlsx",
      })
      .reply(200, moveFileExamplePayload.data);

    const { result } = await invoke(moveFile, {
      connection,
      dir: FILE_PATH,
      path: "/drive/root:/Archive",
      fileName: "Q4-2024-final.xlsx",
    });

    expect(result).toEqual(moveFileExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .patch(`/me/drive/root:${FILE_PATH}`)
      .reply(409, {
        error: { code: "nameAlreadyExists", message: "Name already exists" },
      });

    await expect(
      invoke(moveFile, {
        connection,
        dir: FILE_PATH,
        path: "/Archive",
        fileName: "Q4-2024-final.xlsx",
      }),
    ).rejects.toThrow("Status: 409 code: nameAlreadyExists");
  });
});

describe("updateFile", () => {
  test("patches the item with the optional values, name and the parent path under the drive root", async () => {
    nock(BASE_URL)
      .patch(`/me/drive/root:${FILE_PATH}`, {
        description: "Final figures",
        name: "Q4-2024-final.xlsx",
        parentReference: { path: "/drive/root:/Archive" },
      })
      .reply(200, updateFileExamplePayload.data);

    const { result } = await invoke(updateFile, {
      connection,
      dir: FILE_PATH,
      values: { description: "Final figures" },
      fileName: "Q4-2024-final.xlsx",
      path: "/Archive",
    });

    expect(result).toEqual(updateFileExamplePayload);
  });

  test("keeps a parent path that already names the drive root", async () => {
    nock(BASE_URL)
      .patch(`/me/drive/root:${FILE_PATH}`, {
        parentReference: { path: "/drive/root:/Archive" },
      })
      .reply(200, updateFileExamplePayload.data);

    const { result } = await invoke(updateFile, {
      connection,
      dir: FILE_PATH,
      values: undefined,
      fileName: "",
      path: "/drive/root:/Archive",
    });

    expect(result).toEqual(updateFileExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).patch(`/me/drive/root:${FILE_PATH}`).reply(404, notFound);

    await expect(
      invoke(updateFile, {
        connection,
        dir: FILE_PATH,
        values: undefined,
        fileName: "Q4-2024-final.xlsx",
        path: "",
      }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("uploadFile", () => {
  const fileData = {
    data: Buffer.from("id,name\n1,Ada Lovelace\n"),
    contentType: "text/csv",
  };

  test("puts the file content at the given location", async () => {
    nock(BASE_URL)
      .put(
        "/me/drive/root:/Reports/team.csv:/content",
        "id,name\n1,Ada Lovelace\n",
      )
      .reply(201, uploadFileExamplePayload.data);

    const { result } = await invoke(uploadFile, {
      connection,
      fileName: "/Reports/team.csv",
      fileData,
      timeout: undefined,
    });

    expect(result).toEqual(uploadFileExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL)
      .put("/me/drive/root:/Reports/team.csv:/content")
      .reply(507, { error: { code: "quotaLimitReached" } });

    await expect(
      invoke(uploadFile, {
        connection,
        fileName: "/Reports/team.csv",
        fileData,
        timeout: undefined,
      }),
    ).rejects.toThrow("Status: 507 code: quotaLimitReached");
  });
});

describe("deleteFile", () => {
  test("deletes the item", async () => {
    const scope = nock(BASE_URL)
      .delete(`/drives/${DRIVE_ID}/items/${ITEM_ID}`)
      .reply(204);

    const { result } = await invoke(deleteFile, {
      connection,
      driveId: DRIVE_ID,
      itemId: ITEM_ID,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: "" });
  });

  test("rejects when the item does not exist", async () => {
    nock(BASE_URL)
      .delete(`/drives/${DRIVE_ID}/items/${ITEM_ID}`)
      .reply(404, notFound);

    await expect(
      invoke(deleteFile, { connection, driveId: DRIVE_ID, itemId: ITEM_ID }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("downloadFile", () => {
  test("downloads the item's content and returns the bytes with the item's MIME type", async () => {
    const bytes = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]);
    nock(BASE_URL)
      .get(`/me/drive/root:${FILE_PATH}`)
      .reply(200, getItemExamplePayload.data);
    nock(BASE_URL)
      .get(`/me/drive/root:${FILE_PATH}:/content`)
      .reply(200, bytes, { "Content-Type": "application/octet-stream" });

    const { result } = await invoke(downloadFile, {
      connection,
      fileLocation: FILE_PATH,
      timeout: undefined,
    });

    expect(result).toEqual({ data: bytes, contentType: XLSX_MIME });
  });

  test("rejects when the item does not exist", async () => {
    nock(BASE_URL).get(`/me/drive/root:${FILE_PATH}`).reply(404, notFound);

    await expect(
      invoke(downloadFile, {
        connection,
        fileLocation: FILE_PATH,
        timeout: undefined,
      }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});
