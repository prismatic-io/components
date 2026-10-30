import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type {
  BoxChangesObject,
  BoxCommentChangesObject,
  BoxFolderChangesObject,
} from "../types";
import {
  resolveCommentChanges,
  resolveFolderChanges,
  resolvePollingRecordChanges,
} from "../util";
import { newFileComments } from "./newFileComments";
import { newFolder } from "./newFolder";
import { newOrUpdatedFile } from "./newOrUpdatedFile";

const newFile = {
  id: "54321",
  type: "file",
  name: "report.pdf",
  created_at: "2026-01-14T18:07:45.000Z",
  modified_at: "2026-01-14T18:07:45.000Z",
};
const updatedFile = {
  id: "67890",
  type: "file",
  name: "contract.pdf",
  created_at: "2025-11-03T15:22:10.000Z",
  modified_at: "2026-01-14T17:45:02.000Z",
};
const folder = {
  id: "12345",
  type: "folder",
  name: "Contracts",
  created_at: "2026-01-14T18:07:45.000Z",
};
const comment = {
  id: "8826473150",
  type: "comment",
  message: "Please review the figures in section 2.",
  created_at: "2026-01-14T18:07:45.000Z",
};

const payloadWith = (data: unknown) => ({
  ...defaultTriggerPayload(),
  body: { data },
});

test.each([
  ["New and Updated Files", newOrUpdatedFile],
  ["New Folders", newFolder],
  ["New File Comments", newFileComments],
])("%s is opt-in batchable with a default batch size", (_label, trigger) => {
  expect(trigger.triggerResolverSupport).toBe("valid");
  expect(trigger.batchConfig).toEqual({ batchSize: 50 });
  expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
});

describe("resolvePollingRecordChanges", () => {
  test("tags every file with how it changed", () => {
    const data: BoxChangesObject = {
      newFiles: { data: [newFile], polledNoChanges: false },
      updatedFiles: { data: [updatedFile], polledNoChanges: false },
    };
    expect(resolvePollingRecordChanges(data)).toEqual([
      { changeType: "new", record: newFile },
      { changeType: "updated", record: updatedFile },
    ]);
  });

  test("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  test("tolerates an absent array", () => {
    expect(
      resolvePollingRecordChanges({
        newFiles: { data: [newFile], polledNoChanges: false },
      }),
    ).toEqual([{ changeType: "new", record: newFile }]);
    expect(
      resolvePollingRecordChanges({
        updatedFiles: { data: [updatedFile], polledNoChanges: false },
      }),
    ).toEqual([{ changeType: "updated", record: updatedFile }]);
  });
});

describe("resolveFolderChanges", () => {
  test("tags every folder as new", () => {
    const data: BoxFolderChangesObject = {
      newFolders: { data: [folder], polledNoChanges: false },
    };
    expect(resolveFolderChanges(data)).toEqual([
      { changeType: "new", record: folder },
    ]);
  });

  test("returns [] for empty or undefined changes", () => {
    expect(resolveFolderChanges({})).toEqual([]);
    expect(resolveFolderChanges(undefined)).toEqual([]);
  });

  test("tolerates an absent array", () => {
    expect(
      resolveFolderChanges({ newFolders: undefined } as BoxFolderChangesObject),
    ).toEqual([]);
  });
});

describe("resolveCommentChanges", () => {
  test("tags every comment as new", () => {
    const data: BoxCommentChangesObject = {
      newComments: { data: [comment] },
    };
    expect(resolveCommentChanges(data)).toEqual([
      { changeType: "new", record: comment },
    ]);
  });

  test("returns [] for empty or undefined changes", () => {
    expect(resolveCommentChanges({})).toEqual([]);
    expect(resolveCommentChanges(undefined)).toEqual([]);
  });

  test("tolerates an absent array", () => {
    expect(
      resolveCommentChanges({
        newComments: undefined,
      } as BoxCommentChangesObject),
    ).toEqual([]);
  });
});

describe("resolveItems flattens the payload shape perform actually returns", () => {
  test("New and Updated Files", () => {
    const payload = payloadWith({
      newFiles: { data: [newFile], polledNoChanges: false },
      updatedFiles: { data: [updatedFile], polledNoChanges: false },
    });
    expect(
      newOrUpdatedFile.triggerResolver?.resolveItems?.(
        {} as never,
        { payload } as never,
      ),
    ).toEqual([
      { changeType: "new", record: newFile },
      { changeType: "updated", record: updatedFile },
    ]);
  });

  test("New Folders", () => {
    const payload = payloadWith({
      newFolders: { data: [folder], polledNoChanges: false },
    });
    expect(
      newFolder.triggerResolver?.resolveItems?.(
        {} as never,
        { payload } as never,
      ),
    ).toEqual([{ changeType: "new", record: folder }]);
  });

  test("New File Comments", () => {
    const payload = payloadWith({ newComments: { data: [comment] } });
    expect(
      newFileComments.triggerResolver?.resolveItems?.(
        {} as never,
        { payload } as never,
      ),
    ).toEqual([{ changeType: "new", record: comment }]);
  });
});
