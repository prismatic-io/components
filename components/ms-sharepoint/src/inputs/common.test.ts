import {
  changeType,
  driveId,
  expirationDateTime,
  itemId,
  listId,
  parentItemId,
  resource,
  siteId,
} from "./common";
import { listChangesInputs } from "./drives";
import { createFolderInputs } from "./folders";
import { checkItemExistsInputs, searchItemsInputs } from "./items";

describe("required string inputs", () => {
  test.each([
    ["siteId", siteId, "contoso.sharepoint.com,2C712604-1370-44E7-A1F5-426573FDA80A"],
    ["driveId", driveId, "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd"],
    ["listId", listId, "3a3c0f6a-86da-4567-94d4-3b939da63200"],
    ["itemId", itemId, "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK"],
    ["parentItemId", parentItemId, "01NKDM7HN6Y2GOVW7725BZO354PWSELRRZ"],
    ["changeType", changeType, "updated"],
    ["resource", resource, "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj/root"],
    ["listChanges deltaURL", listChangesInputs.deltaURL, "/drives/b!-RIj2DuyvEyV/root/delta"],
    ["searchItems query", searchItemsInputs.query, "quarterly report"],
    ["checkItemExists itemPath", checkItemExistsInputs.itemPath, "Reports/2026/summary.docx"],
    ["createFolder folderName", createFolderInputs.folderName, "Quarterly Reports"],
  ])("%s keeps a value unchanged and turns a missing one into an empty string", (_name, def, value) => {
    expect(def.clean?.(value)).toBe(value);
    expect(def.clean?.(undefined)).toBe("");
  });
});

describe("expirationDateTime", () => {
  test("normalizes a date string to ISO", () => {
    expect(expirationDateTime.clean?.("2026-12-01T10:00:00Z")).toBe("2026-12-01T10:00:00.000Z");
  });

  test("rejects a value that is not a date", () => {
    expect(() => expirationDateTime.clean?.("not-a-date")).toThrow("cannot be coerced to date");
  });
});
