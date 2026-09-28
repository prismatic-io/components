import type { Element } from "@prismatic-io/spectral";
import { toSortedElements } from "./elements";
interface Row {
  id: number;
  name: string;
}
const toElement = (row: Row): Element => ({
  key: String(row.id),
  label: row.name,
});
describe("toSortedElements", () => {
  test("orders the projected elements by label", () => {
    const rows: Row[] = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alpha" },
      { id: 2, name: "Bravo" },
    ];
    expect(toSortedElements(rows, toElement)).toEqual([
      { key: "1", label: "Alpha" },
      { key: "2", label: "Bravo" },
      { key: "3", label: "Charlie" },
    ]);
  });
  test("leaves ties in the order the API returned them", () => {
    const rows: Row[] = [
      { id: 9, name: "Duplicate" },
      { id: 4, name: "Duplicate" },
      { id: 7, name: "Duplicate" },
    ];
    expect(
      toSortedElements(rows, toElement).map((element) => element.key),
    ).toEqual(["9", "4", "7"]);
  });
  test("sorts a row whose label is absent ahead of the rest", () => {
    const rows = [{ id: 2, name: "Bravo" }, { id: 1 }] as Row[];
    const lenient = (row: Row): Element => ({
      key: String(row.id),
      label: row.name,
    });
    expect(
      toSortedElements(rows, lenient).map((element) => element.key),
    ).toEqual(["1", "2"]);
  });
  test.each<[string, Row[] | undefined]>([
    ["absent rows", undefined],
    ["an empty list", []],
  ])("%s resolves to an empty picklist", (_label, rows) => {
    expect(toSortedElements(rows, toElement)).toEqual([]);
  });
});
