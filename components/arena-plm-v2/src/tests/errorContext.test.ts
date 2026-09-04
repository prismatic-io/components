import * as fs from "node:fs";
import * as path from "node:path";
const SRC = path.join(__dirname, "..");
const ACTIONS_DIR = path.join(SRC, "actions");
const DATASOURCES_DIR = path.join(SRC, "dataSources");
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".ts") && entry.name !== "index.ts"
      ? [full]
      : [];
  });
const extractContext = (src: string): string | null => {
  const call =
    /handleArenaError\(\s*error(?:\s*:\s*unknown)?\s*,\s*context\.logger\s*,\s*(?:"([^"]+)"|`([^`$]*)|([A-Za-z_$][\w$]*))/.exec(
      src,
    );
  if (!call) return null;
  const [, quoted, templated, binding] = call;
  if (quoted !== undefined) return quoted;
  if (templated !== undefined) return templated.trim();
  if (binding === undefined) return null;
  const declared = new RegExp(
    `const\\s+${binding}\\s*=\\s*(?:"([^"]+)"|\`([^\`$]*))`,
  ).exec(src);
  if (!declared) return null;
  const [, declaredQuoted, declaredTemplated] = declared;
  return declaredQuoted ?? declaredTemplated?.trim() ?? null;
};
interface EntityFile {
  file: string;
  label: string;
  context: string | null;
}
const collect = (dir: string): EntityFile[] =>
  walk(dir).flatMap((file) => {
    const src = fs.readFileSync(file, "utf8");
    const label = /label:\s*"([^"]+)"/.exec(src)?.[1];
    if (!label) return [];
    return [
      { file: path.relative(SRC, file), label, context: extractContext(src) },
    ];
  });
const actionFiles = collect(ACTIONS_DIR);
const dataSourceFiles = collect(DATASOURCES_DIR);
describe("action error context", () => {
  it("reads every action file", () => {
    expect(actionFiles.length).toBeGreaterThan(300);
  });
  it("passes the action's own label to handleArenaError", () => {
    const offenders = actionFiles
      .filter((a) => {
        if (a.context === null) return false;
        return !a.context.startsWith(a.label);
      })
      .map((a) => `${a.file}: "${a.context}" should start with "${a.label}"`);
    expect(offenders).toEqual([]);
  });
  it("checks every action, including the templated call shape", () => {
    const unchecked = actionFiles.filter((a) => a.context === null);
    expect(unchecked.map((a) => a.file)).toEqual([]);
  });
});
describe("datasource error context", () => {
  it("reads every datasource file", () => {
    expect(dataSourceFiles.length).toBeGreaterThan(5);
  });
  it("names the fetch that failed, not the picker", () => {
    const offenders = dataSourceFiles
      .filter((d) => d.context !== null && !/^(get|list)\b/i.test(d.context))
      .map(
        (d) => `${d.file}: "${d.context}" should start with "Get" or "List"`,
      );
    expect(offenders).toEqual([]);
  });
  it("checks every datasource, including the bound-constant call shape", () => {
    const unchecked = dataSourceFiles.filter((d) => d.context === null);
    expect(unchecked.map((d) => d.file)).toEqual([]);
  });
});
describe("every error context", () => {
  it("never passes a sentence where a name belongs", () => {
    const offenders = [...actionFiles, ...dataSourceFiles]
      .filter(
        (e) =>
          e.context !== null && /^(failed|unable|could not)\b/i.test(e.context),
      )
      .map((e) => `${e.file}: "${e.context}"`);
    expect(offenders).toEqual([]);
  });
});
