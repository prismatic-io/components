import { describe, expect, test } from "vitest";
import { DEFAULT_ORDER_HINT, ODATA_TYPE } from "../constants";
import {
  buildAppliedCategories,
  buildAssignments,
  buildChecklist,
  buildReferences,
  compact,
  encodeReferenceKey,
} from "./openTypes";

describe("compact", () => {
  test("drops only undefined, preserving 0, false and the empty string", () => {
    expect(
      compact({
        percentComplete: 0,
        isChecked: false,
        title: "",
        omitted: undefined,
        kept: "value",
      }),
    ).toEqual({
      percentComplete: 0,
      isChecked: false,
      title: "",
      kept: "value",
    });
  });

  test("preserves null, which Planner uses to remove an open-type entry", () => {
    expect(compact({ assignments: null })).toEqual({ assignments: null });
  });

  test("returns an empty object when every value is undefined", () => {
    expect(compact({ a: undefined, b: undefined })).toEqual({});
  });
});

describe("buildAssignments", () => {
  test("maps an assigned user to an annotated entry and an unassigned user to null", () => {
    expect(buildAssignments(["user-a"], ["user-b"])).toEqual({
      "user-a": {
        "@odata.type": ODATA_TYPE.assignment,
        orderHint: DEFAULT_ORDER_HINT,
      },
      "user-b": null,
    });
  });

  test("resolves a user named in both lists to null, because the unassign loop runs last", () => {
    expect(buildAssignments(["user-a"], ["user-a"])).toEqual({
      "user-a": null,
    });
  });

  test("returns an empty map when neither list has entries", () => {
    expect(buildAssignments()).toEqual({});
    expect(buildAssignments([], [])).toEqual({});
  });
});

describe("buildAppliedCategories", () => {
  test("maps applied categories to true and removed categories to false", () => {
    expect(buildAppliedCategories(["category1"], ["category3"])).toEqual({
      category1: true,
      category3: false,
    });
  });

  test("resolves a category named in both lists to false, because removal runs last", () => {
    expect(buildAppliedCategories(["category1"], ["category1"])).toEqual({
      category1: false,
    });
  });

  test("returns an empty map when neither list has entries", () => {
    expect(buildAppliedCategories()).toEqual({});
  });
});

describe("buildChecklist", () => {
  test("gives every added item a generated key and defaults isChecked to false", () => {
    const checklist = buildChecklist([
      { title: "First" },
      { title: "Second", isChecked: true },
    ]);

    expect(Object.values(checklist)).toEqual([
      {
        "@odata.type": ODATA_TYPE.checklistItem,
        title: "First",
        isChecked: false,
      },
      {
        "@odata.type": ODATA_TYPE.checklistItem,
        title: "Second",
        isChecked: true,
      },
    ]);
    expect(Object.keys(checklist)).toHaveLength(2);
    for (const key of Object.keys(checklist)) {
      expect(key).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    }
  });

  test("reuses an existing key on update and sends only the fields supplied", () => {
    expect(buildChecklist([], [{ id: "item-1", title: "Renamed" }])).toEqual({
      "item-1": { "@odata.type": ODATA_TYPE.checklistItem, title: "Renamed" },
    });
    expect(buildChecklist([], [{ id: "item-1", isChecked: false }])).toEqual({
      "item-1": { "@odata.type": ODATA_TYPE.checklistItem, isChecked: false },
    });
  });

  test("maps a removed item id to null", () => {
    expect(buildChecklist([], [], ["item-1"])).toEqual({ "item-1": null });
  });

  test("returns an empty map when nothing is added, updated or removed", () => {
    expect(buildChecklist()).toEqual({});
  });
});

describe("encodeReferenceKey", () => {
  test('escapes "." and ":" while leaving "/" untouched', () => {
    expect(encodeReferenceKey("https://example.com/spec")).toBe(
      "https%3A//example%2Ecom/spec",
    );
  });

  test("reproduces the key from the plannerExternalReferences documentation", () => {
    expect(
      encodeReferenceKey(
        "https://contoso.sharepoint.com/teams/agile/documents/AnnualReport.pptx",
      ),
    ).toBe(
      "https%3A//contoso%2Esharepoint%2Ecom/teams/agile/documents/AnnualReport%2Epptx",
    );
  });

  test('escapes "%", "@" and "#", the other characters an open type key cannot contain', () => {
    expect(
      encodeReferenceKey("https://user@example.com/Annual%20Report.pptx#page"),
    ).toBe("https%3A//user%40example%2Ecom/Annual%2520Report%2Epptx%23page");
  });

  test('escapes a literal "%" before the others, so a key is never double-encoded', () => {
    expect(encodeReferenceKey("%2E.")).toBe("%252E%2E");
  });

  test("escapes every occurrence, not just the first", () => {
    expect(encodeReferenceKey("a.b.c")).toBe("a%2Eb%2Ec");
  });
});

describe("buildReferences", () => {
  test("keys an added reference by its encoded URL and annotates the entry", () => {
    expect(
      buildReferences([
        { url: "https://example.com/spec", alias: "Spec", type: "Other" },
      ]),
    ).toEqual({
      "https%3A//example%2Ecom/spec": {
        "@odata.type": ODATA_TYPE.externalReference,
        previewPriority: DEFAULT_ORDER_HINT,
        alias: "Spec",
        type: "Other",
      },
    });
  });

  test("omits alias and type when they were not supplied", () => {
    expect(buildReferences([{ url: "https://example.com/spec" }])).toEqual({
      "https%3A//example%2Ecom/spec": {
        "@odata.type": ODATA_TYPE.externalReference,
        previewPriority: DEFAULT_ORDER_HINT,
      },
    });
  });

  test("maps a removed URL to null under the same encoded key", () => {
    expect(buildReferences([], ["https://example.com/spec"])).toEqual({
      "https%3A//example%2Ecom/spec": null,
    });
  });

  test("returns an empty map when nothing is added or removed", () => {
    expect(buildReferences()).toEqual({});
  });
});
