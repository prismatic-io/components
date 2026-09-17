import { disambiguateElements } from "./elements";
describe("disambiguateElements", () => {
  test("leaves labels that already differ untouched", () => {
    const elements = [
      { key: "f1", label: "Q3 Revenue Report.xlsx" },
      { key: "f2", label: "Team Onboarding.pdf" },
    ];
    expect(disambiguateElements(elements)).toEqual(elements);
  });
  test("appends the key to every element sharing a label", () => {
    const elements = [
      { key: "f1", label: "report.pdf" },
      { key: "f2", label: "report.pdf" },
    ];
    expect(disambiguateElements(elements)).toEqual([
      { key: "f1", label: "report.pdf (f1)" },
      { key: "f2", label: "report.pdf (f2)" },
    ]);
  });
  test("disambiguates only the labels that repeat", () => {
    const elements = [
      { key: "f1", label: "report.pdf" },
      { key: "f2", label: "budget.xlsx" },
      { key: "f3", label: "report.pdf" },
    ];
    expect(disambiguateElements(elements)).toEqual([
      { key: "f1", label: "report.pdf (f1)" },
      { key: "f2", label: "budget.xlsx" },
      { key: "f3", label: "report.pdf (f3)" },
    ]);
  });
});
