import * as fs from "node:fs";
import * as path from "node:path";
import component from "../index";
const SRC = path.join(__dirname, "..");
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "tests" ? [] : walk(full);
    }
    return entry.name.endsWith(".ts") ? [full] : [];
  });
const sourceFiles = walk(SRC);
describe("the component targets a single vendor", () => {
  it("reads the whole source tree", () => {
    expect(sourceFiles.length).toBeGreaterThan(300);
  });
  it("declares no file named after another vendor", () => {
    const offenders = sourceFiles
      .filter((f) => /jira/i.test(path.basename(f)))
      .map((f) => path.relative(SRC, f));
    expect(offenders).toEqual([]);
  });
  it("registers no data source belonging to another vendor", () => {
    const offenders = Object.keys(component.dataSources ?? {}).filter((key) =>
      /jira/i.test(key),
    );
    expect(offenders).toEqual([]);
  });
  it("registers no action belonging to another vendor", () => {
    const offenders = Object.keys(component.actions ?? {}).filter((key) =>
      /jira/i.test(key),
    );
    expect(offenders).toEqual([]);
  });
  it("mentions no other vendor anywhere in the source", () => {
    const offenders = sourceFiles
      .filter((f) => /jira/i.test(fs.readFileSync(f, "utf8")))
      .map((f) => path.relative(SRC, f));
    expect(offenders).toEqual([]);
  });
});
