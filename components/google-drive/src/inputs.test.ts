import { MY_DRIVE } from "./constants";
import {
  ancestorName,
  consolidationStrategy,
  createFileWebhookInputs,
  deleteWebhookInputs,
  driveId,
  exportType,
  fetchAll,
  fields,
  fileId,
  fileName,
  filesContainingSearchQuery,
  filter,
  folderId,
  folderName,
  itemName,
  lookBackDate,
  metadataFields,
  pageSize,
  pageToken,
  query,
  searchQuery,
  triggerEvents,
  webhookEndpointInput,
  webhookExpirationInput,
} from "./inputs";
describe("inputs delegating straight to util.types (spectral behavior, covered thinly)", () => {
  test("string inputs stringify their value and turn nullish into an empty string", () => {
    expect(fileId.clean("1a2b3c")).toBe("1a2b3c");
    expect(fileId.clean(undefined)).toBe("");
    expect(folderName.clean("Pictures")).toBe("Pictures");
    expect(webhookEndpointInput.clean("https://hooks.example.io/webhook")).toBe(
      "https://hooks.example.io/webhook",
    );
    expect(metadataFields.clean("id,name,mimeType")).toBe("id,name,mimeType");
  });
  test("boolean inputs coerce the string form and default to false", () => {
    expect(filesContainingSearchQuery.clean("true")).toBe(true);
    expect(filesContainingSearchQuery.clean("false")).toBe(false);
    expect(fetchAll.clean("true")).toBe(true);
    expect(fetchAll.clean(undefined)).toBe(false);
  });
  test("the webhook ID inputs stringify their value", () => {
    expect(
      createFileWebhookInputs.resourceId.clean("ret08u3rv24htgh289g"),
    ).toBe("ret08u3rv24htgh289g");
    expect(
      deleteWebhookInputs.webhookId.clean(
        "00000000-0000-0000-0000-000000000000",
      ),
    ).toBe("00000000-0000-0000-0000-000000000000");
    expect(deleteWebhookInputs.resourceId.clean("ret08u3rv24htgh289g")).toBe(
      "ret08u3rv24htgh289g",
    );
  });
});
describe("inputs delegating to cleanStringInput", () => {
  test("keep a non-empty value and drop an empty one", () => {
    expect(fileName.clean("My Document.pdf")).toBe("My Document.pdf");
    expect(fileName.clean("")).toBeUndefined();
    expect(folderId.clean("1xYz2AbC")).toBe("1xYz2AbC");
    expect(folderId.clean(undefined)).toBeUndefined();
    expect(query.clean("name contains 'report'")).toBe(
      "name contains 'report'",
    );
    expect(exportType.clean("application/pdf")).toBe("application/pdf");
    expect(filter.clean("time > 1452409200000")).toBe("time > 1452409200000");
    expect(filter.clean("")).toBeUndefined();
    expect(fields.clean("files(id,name)")).toBe("files(id,name)");
    expect(fields.clean("")).toBeUndefined();
    expect(searchQuery.clean("quarterly report")).toBe("quarterly report");
    expect(searchQuery.clean("")).toBeUndefined();
    expect(pageToken.clean("lslTXFcbLQKkb0vP")).toBe("lslTXFcbLQKkb0vP");
    expect(pageToken.clean(undefined)).toBeUndefined();
  });
});
describe("inputs delegating to cleanItemInput", () => {
  test("prefix a bare ID with items/ and drop the My Drive sentinel", () => {
    expect(itemName.clean("1a2b3c")).toBe("items/1a2b3c");
    expect(itemName.clean("items/1a2b3c")).toBe("items/1a2b3c");
    expect(ancestorName.clean("0ALiN8fRST0gxUk9PVA")).toBe(
      "items/0ALiN8fRST0gxUk9PVA",
    );
    expect(ancestorName.clean(MY_DRIVE)).toBeUndefined();
  });
});
describe("triggerEvents", () => {
  test("keeps the selected event values and drops the empty ones", () => {
    expect(triggerEvents.clean(["CREATE", "", "EDIT"])).toEqual([
      "CREATE",
      "EDIT",
    ]);
  });
  test("returns an empty array when nothing is selected", () => {
    expect(triggerEvents.clean(undefined)).toEqual([]);
  });
});
describe("pageSize", () => {
  test("parses a numeric string", () => {
    expect(pageSize.clean("50")).toBe(50);
  });
  test("passes a value outside the documented 1-1000 range straight through", () => {
    expect(pageSize.clean("5000")).toBe(5000);
  });
  test("preserves an explicit zero rather than treating it as absent", () => {
    expect(pageSize.clean("0")).toBe(0);
  });
  test("yields undefined for an empty value", () => {
    expect(pageSize.clean("")).toBeUndefined();
    expect(pageSize.clean(undefined)).toBeUndefined();
  });
  test("truncates a fractional page size", () => {
    expect(pageSize.clean("20.7")).toBe(20);
  });
  test("rejects a value that is not a number", () => {
    expect(() => pageSize.clean("not a number")).toThrow(
      "cannot be coerced to int",
    );
  });
});
describe("driveId", () => {
  test("keeps a drive ID and collapses an empty value to undefined", () => {
    expect(driveId.clean("0AAvGyortvuqEXAMPLE")).toBe("0AAvGyortvuqEXAMPLE");
    expect(driveId.clean("")).toBeUndefined();
    expect(driveId.clean(undefined)).toBeUndefined();
  });
  test("passes the My Drive sentinel through untouched", () => {
    expect(driveId.clean(MY_DRIVE)).toBe(MY_DRIVE);
  });
});
describe("webhookExpirationInput", () => {
  test("stringifies a timestamp and collapses an empty value to undefined", () => {
    expect(webhookExpirationInput.clean(1426325213000)).toBe("1426325213000");
    expect(webhookExpirationInput.clean("")).toBeUndefined();
    expect(webhookExpirationInput.clean(undefined)).toBeUndefined();
  });
});
describe("consolidationStrategy", () => {
  test("keeps the selected strategy name", () => {
    expect(consolidationStrategy.clean("legacy")).toBe("legacy");
    expect(consolidationStrategy.clean("none")).toBe("none");
  });
  test("returns undefined when no strategy is selected", () => {
    expect(consolidationStrategy.clean(undefined)).toBeUndefined();
    expect(consolidationStrategy.clean("")).toBeUndefined();
  });
});
describe("lookBackDate", () => {
  test("is optional, so a trigger without a backfill needs no value", () => {
    expect(lookBackDate.required).toBe(false);
    expect(lookBackDate.clean("")).toBe("");
  });
  test("is labelled and hinted per the standard", () => {
    expect(lookBackDate.label).toBe("Look-back Date");
    expect(lookBackDate.placeholder).toBe("Enter look-back date (YYYY-MM-DD)");
    expect(lookBackDate.example).toBe("2026-01-01");
    expect(lookBackDate.placeholder).not.toBe(lookBackDate.example);
  });
  test("normalizes a date and rejects one that is not on the calendar", () => {
    expect(lookBackDate.clean("2026-01-15")).toBe("2026-01-15T00:00:00.000Z");
    expect(() => lookBackDate.clean("2026-02-31")).toThrow("Look-back Date");
  });
});
