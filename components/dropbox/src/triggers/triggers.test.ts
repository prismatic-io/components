import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { files } from "dropbox";
import type { ListChangesResult } from "../types";
import { resolvePollingRecordChanges } from "../util";
import triggers from "./index";
const fileEntry: files.FileMetadataReference = {
  ".tag": "file",
  name: "example_added_file.png",
  path_lower: "/testsubfolder/example_added_file.png",
  path_display: "/TestSubfolder/example_added_file.png",
  id: "id:someExampleId",
  client_modified: "2024-11-20T18:29:39Z",
  server_modified: "2024-11-21T18:07:17Z",
  rev: "01627702307738900000002a67d8f21",
  size: 331590,
};
const folderEntry: files.FolderMetadataReference = {
  ".tag": "folder",
  name: "TestSubfolder",
  path_lower: "/testsubfolder",
  path_display: "/TestSubfolder",
  id: "id:someExampleFolderId",
};
const deletedEntry: files.DeletedMetadataReference = {
  ".tag": "deleted",
  name: "example_deleted_file.png",
  path_lower: "/testsubfolder/example_deleted_file.png",
  path_display: "/TestSubfolder/example_deleted_file.png",
};
describe("pollChangesTrigger batching", () => {
  test("New and Updated Files is opt-in batchable with a default batch size", () => {
    expect(triggers.pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(triggers.pollChangesTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(
      triggers.pollChangesTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });
  test("resolvePollingRecordChanges tags every entry with its change type", () => {
    expect(
      resolvePollingRecordChanges({
        entries: [fileEntry, folderEntry, deletedEntry],
        cursor: "examplePaginationCursorValue",
        has_more: false,
      }),
    ).toEqual([
      { changeType: "file", record: fileEntry },
      { changeType: "folder", record: folderEntry },
      { changeType: "deleted", record: deletedEntry },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(
      resolvePollingRecordChanges({
        entries: [],
        cursor: "examplePaginationCursorValue",
        has_more: false,
      }),
    ).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: {
        data: {
          entries: [fileEntry, deletedEntry],
          cursor: "examplePaginationCursorValue",
          has_more: false,
        },
      },
    };
    expect(
      triggers.pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      { changeType: "file", record: fileEntry },
      { changeType: "deleted", record: deletedEntry },
    ]);
  });
});
describe("resolvePollingRecordChanges guard", () => {
  test("throws on an unknown entry tag", () => {
    expect(() =>
      resolvePollingRecordChanges({
        entries: [{ ".tag": "unknown_future_type", name: "x" }],
        cursor: "examplePaginationCursorValue",
        has_more: false,
      } as unknown as ListChangesResult),
    ).toThrow(/Unexpected Dropbox entry tag "unknown_future_type"/);
  });
});
