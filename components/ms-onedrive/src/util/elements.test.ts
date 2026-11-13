import { vi } from "vitest";
import {
  nameOrId,
  parentLabel,
  sortElements,
  toFolderKey,
  toObjectSelection,
  withParentLabel,
} from "./elements";

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
    expect(withParentLabel("Documents", "Intranet")).toBe(
      "Intranet / Documents",
    );
  });

  test("leaves the label alone without a parent", () => {
    expect(withParentLabel("Documents")).toBe("Documents");
  });
});

describe("parentLabel", () => {
  test("uses the upstream label without a lookup", async () => {
    const lookUp = vi.fn();

    expect(await parentLabel({ id: "s1", label: "Intranet" }, lookUp)).toBe(
      "Intranet",
    );
    expect(lookUp).not.toHaveBeenCalled();
  });

  test("looks the name up when there is no upstream label", async () => {
    expect(await parentLabel({ id: "s1" }, async () => "Intranet")).toBe(
      "Intranet",
    );
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

describe("sortElements", () => {
  test("sorts by label without changing the input", () => {
    const elements = [
      { key: "2", label: "Projects" },
      { key: "1", label: "Intranet" },
    ];

    expect(sortElements(elements)).toEqual([
      { key: "1", label: "Intranet" },
      { key: "2", label: "Projects" },
    ]);
    expect(elements[0].key).toBe("2");
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
