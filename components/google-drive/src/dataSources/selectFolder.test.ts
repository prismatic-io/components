import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { connection as connectionDefinition } from "../connections";
import { selectFolder } from "./selectFolder";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("selectFolder", () => {
  afterEach(() => nock.cleanAll());
  test("lists folders from the chosen drive, sorted by name, without a drive prefix", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          { id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", name: "Finance" },
          { id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", name: "Campaign Assets" },
        ],
      });
    const { result } = await invokeDataSource(selectFolder, {
      connection,
      driveId: "0AAvGyortvuqEXAMPLE",
    });
    expect(result).toEqual([
      { key: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6", label: "Campaign Assets" },
      { key: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", label: "Finance" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("restricts the query to folders in the chosen drive", async () => {
    let received: Record<string, unknown> = {};
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((actual) => {
        received = actual;
        return true;
      })
      .reply(200, { files: [] });
    await invokeDataSource(selectFolder, {
      connection,
      driveId: "0AAvGyortvuqEXAMPLE",
    });
    expect(received.q).toBe("mimeType='application/vnd.google-apps.folder'");
    expect(received.driveId).toBe("0AAvGyortvuqEXAMPLE");
  });
  test("walks My Drive and every shared drive when no drive is chosen, prefixing each label", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        drives: [{ id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" }],
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f-campaign", name: "Campaign Assets" }] });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f-finance", name: "Finance" }] });
    const { result } = await invokeDataSource(selectFolder, {
      connection,
      driveId: undefined,
    });
    expect(result).toEqual([
      { key: "f-campaign", label: "[Marketing Team Drive] Campaign Assets" },
      { key: "f-finance", label: "[My Drive] Finance" },
    ]);
  });
  test("returns an empty picklist when no drive holds a folder", async () => {
    nock(DRIVE).get("/drive/v3/drives").query(true).reply(200, { drives: [] });
    nock(DRIVE).get("/drive/v3/files").query(true).reply(200, { files: [] });
    const { result } = await invokeDataSource(selectFolder, {
      connection,
      driveId: undefined,
    });
    expect(result).toEqual([]);
  });
  test("appends the folder ID when two folders in the chosen drive share a name", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          { id: "d1", name: "Projects" },
          { id: "d2", name: "Projects" },
          { id: "d3", name: "Finance" },
        ],
      });
    const { result } = await invokeDataSource(selectFolder, {
      connection,
      driveId: "0AAvGyortvuqEXAMPLE",
    });
    expect(result).toEqual([
      { key: "d3", label: "Finance" },
      { key: "d1", label: "Projects (d1)" },
      { key: "d2", label: "Projects (d2)" },
    ]);
  });
  test("leaves a name shared across drives alone, because the prefix already separates it", async () => {
    nock(DRIVE)
      .get("/drive/v3/drives")
      .query(true)
      .reply(200, {
        drives: [{ id: "0AAvGyortvuqEUk9PVA", name: "Marketing Team Drive" }],
      });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f-marketing", name: "Projects" }] });
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, { files: [{ id: "f-mine", name: "Projects" }] });
    const { result } = await invokeDataSource(selectFolder, {
      connection,
      driveId: undefined,
    });
    expect(result).toEqual([
      { key: "f-marketing", label: "[Marketing Team Drive] Projects" },
      { key: "f-mine", label: "[My Drive] Projects" },
    ]);
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(403, { error: { message: "forbidden" } });
    await expect(
      invokeDataSource(selectFolder, {
        connection,
        driveId: "0AAvGyortvuqEXAMPLE",
      }),
    ).rejects.toThrow();
  });
});
