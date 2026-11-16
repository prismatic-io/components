import { vi } from "vitest";
import {
  nameOrId,
  parentLabel,
  sortArray,
  toFolderKey,
  toObjectSelection,
  withParentLabel,
} from "./elements";

describe("sortArray", () => {
  test("sorts picklist elements by label", () => {
    const sorted = sortArray([
      { key: "3", label: "Shared Documents" },
      { key: "1", label: "Archive" },
      { key: "2", label: "Reports" },
    ]);

    expect(sorted.map((element) => element.label)).toEqual([
      "Archive",
      "Reports",
      "Shared Documents",
    ]);
  });

  test("puts an element with no label first", () => {
    const sorted = sortArray([{ key: "2", label: "Reports" }, { key: "1" }]);

    expect(sorted.map((element) => element.key)).toEqual(["1", "2"]);
  });
});

describe("nameOrId", () => {
  test("returns the name when there is one", () => {
    expect(nameOrId("Documents", "d1")).toBe("Documents");
  });

  test.each([undefined, null, ""])("falls back to the ID for %s", (name) => {
    expect(nameOrId(name, "d1")).toBe("d1");
  });
});

describe("withParentLabel", () => {
  test("prefixes the label with its parent", () => {
    expect(withParentLabel("Documents", "Intranet")).toBe("Intranet / Documents");
  });

  test("leaves the label alone without a parent", () => {
    expect(withParentLabel("Documents")).toBe("Documents");
  });
});

describe("parentLabel", () => {
  test("uses the upstream label without a lookup", async () => {
    const lookUp = vi.fn();

    expect(await parentLabel({ id: "s1", label: "Intranet" }, lookUp)).toBe("Intranet");
    expect(lookUp).not.toHaveBeenCalled();
  });

  test("looks the name up when there is no upstream label", async () => {
    expect(await parentLabel({ id: "s1" }, async () => "Intranet")).toBe("Intranet");
  });

  test("falls back to the ID when the lookup finds no name", async () => {
    expect(await parentLabel({ id: "s1" }, async () => undefined)).toBe("s1");
  });

  test("falls back to the ID when the lookup fails", async () => {
    const failingLookup = async (): Promise<unknown> => {
      throw new Error("Request failed with status code 429");
    };

    expect(await parentLabel({ id: "s1" }, failingLookup)).toBe("s1");
  });
});

describe("toObjectSelection", () => {
  test("wraps each element as an object", () => {
    expect(toObjectSelection([{ key: "1", label: "Intranet" }])).toEqual([
      { object: { key: "1", label: "Intranet" } },
    ]);
  });
});

describe("toFolderKey", () => {
  test("joins the drive ID and the item ID with a colon", () => {
    expect(toFolderKey("b!abc", "01XYZ")).toBe("b!abc:01XYZ");
  });
});
