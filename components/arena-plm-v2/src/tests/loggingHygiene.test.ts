import * as fs from "node:fs";
import * as path from "node:path";
const SRC = path.join(__dirname, "..");
const RAW_VALUE_KEYS = [
  "originalValue",
  "parsedValue",
  "requestBody",
  "responseData",
];
const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "tests" ? [] : walk(full);
    }
    return entry.name.endsWith(".ts") ? [full] : [];
  });
const sourceFiles = walk(SRC);
const loggedObjects = (
  src: string,
): {
  call: string;
  body: string;
}[] => {
  const results: {
    call: string;
    body: string;
  }[] = [];
  const opener = /logger\.(debug|info|warn|error|log|trace|metric)\(/g;
  let match: RegExpExecArray | null = opener.exec(src);
  while (match !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    while (i < src.length && depth > 0) {
      if (src[i] === "(") depth += 1;
      else if (src[i] === ")") depth -= 1;
      i += 1;
    }
    results.push({ call: match[1], body: src.slice(start, i - 1) });
    match = opener.exec(src);
  }
  return results;
};
describe("logging hygiene", () => {
  it("reads the whole source tree", () => {
    expect(sourceFiles.length).toBeGreaterThan(300);
  });
  it("no logger call passes a raw attribute or response value", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      const src = fs.readFileSync(file, "utf8");
      for (const { body } of loggedObjects(src)) {
        for (const key of RAW_VALUE_KEYS) {
          if (new RegExp(`^\\s*${key}\\s*[,:]`, "m").test(body)) {
            offenders.push(`${path.relative(SRC, file)} logs ${key}`);
          }
        }
      }
    }
    expect([...new Set(offenders)]).toEqual([]);
  });
  it("no logger call passes contact data or a whole parameter object", () => {
    const VALUE_BEARING = [
      "number",
      "label",
      "accountNumber",
      "fieldData",
      "reservationData",
      "queryParams",
    ];
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      const src = fs.readFileSync(file, "utf8");
      for (const { body } of loggedObjects(src)) {
        for (const name of VALUE_BEARING) {
          if (new RegExp(`^\\s*${name},\\s*$`, "m").test(body)) {
            offenders.push(`${path.relative(SRC, file)} logs ${name}`);
          }
        }
      }
    }
    expect([...new Set(offenders)]).toEqual([]);
  });
  it("no logger call passes a whole request payload", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      const src = fs.readFileSync(file, "utf8");
      for (const { body } of loggedObjects(src)) {
        if (/(^|[\s{,])payload\s*[,:]/.test(body)) {
          offenders.push(path.relative(SRC, file));
        }
      }
    }
    expect([...new Set(offenders)]).toEqual([]);
  });
});
