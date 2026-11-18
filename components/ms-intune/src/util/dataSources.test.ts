import { compareElementsByLabel } from "./dataSources";

describe("compareElementsByLabel", () => {
  test("orders elements by label, with a missing label first", () => {
    const elements = [
      { key: "2", label: "Bravo" },
      { key: "3" },
      { key: "1", label: "Alpha" },
    ];

    expect(elements.sort(compareElementsByLabel)).toEqual([
      { key: "3" },
      { key: "1", label: "Alpha" },
      { key: "2", label: "Bravo" },
    ]);
  });

  test("returns 0 for equal labels", () => {
    expect(
      compareElementsByLabel(
        { key: "1", label: "Alpha" },
        { key: "2", label: "Alpha" },
      ),
    ).toBe(0);
  });
});
